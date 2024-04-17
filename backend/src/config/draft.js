const SocketServer = require('socket.io');
const User = require('../models/User');

function start(http) {
    const io = SocketServer(http, {
        cors: {
            origin: ["http://localhost:3000"], 
            credentials: true
        }
    });

    let userSockets = {};

    io.on('connection', (socket) => {
        console.log('User connected', socket.id);

        
        socket.on('register', userId => {
            console.log("Registering user ID:", userId, "with socket ID:", socket.id);
            socket.join(userId);  // Users join a room named after their userId
            userSockets[userId] = socket.id;
            console.log("current userSockets(in register)= ", userSockets);
        });

        socket.on('start draft', async (order) => {
            let userIds = order.map(team => team.owner);
            let pickNum = 0; // Number of picks that have happened so far

            try {
                let users = await User.find({ '_id': { $in: userIds } });
                let numPicks = 2; // Number of picks per team
                let numTeams = users.length;
                
                // Emit to all users that draft has started
                io.emit('draft started', users);

                function emitTurn() {
                    let currPick = users[pickNum % numTeams];
                    const eventName = `user pick ${currPick._id}-${pickNum}`;
                    io.to(currPick.username).emit('user turn', { user: currPick, pickNumber: pickNum, eventName });
                    
                    console.log("current userSockets=", userSockets);
                    const userSocketId = userSockets[currPick.username];
                    if (userSocketId) {
                        const userSocket = io.of('/').sockets.get(userSocketId);
                        if (userSocket) {
                            userSocket.once(eventName, (pick) => {
                                console.log('User picked:', pick);

                                io.emit('announce pick', {
                                    picker: currPick.username,
                                    pick: pick[1],
                                    pickNumber: pickNum+1
                                })
                                pickNum += 1; // Increment pick number
                
                                if (pickNum >= numTeams * numPicks) { // Check if draft is done
                                    console.log("Draft Done");
                                    io.emit('end draft', true);
                                } else { // Otherwise, continue to the next pick
                                    emitTurn(); // Recursive call to handle the next turn
                                }
                            });
                        } else {
                            console.log("Socket not found for user ID:", currPick._id.toString());
                        }
                    } else {
                        console.log("No socket ID stored for user ID:", currPick.username);
                    }
                }

                emitTurn(); // Start the draft
            } catch (error) {
                console.error('Error during draft:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');

            const entries = Object.entries(userSockets);
            for (const [key, value] of entries) {
                if (value === socket.id) {
                    delete userSockets[key];
                    console.log(`Removed user ${key} from active sockets.`);
                    break;
        }
    }
        });
    });
}

module.exports = { start };
