const SocketServer = require('socket.io');
const Team = require('../models/Team');
const User = require('../models/User');

function start(http) {
    const io = SocketServer(http, {
        cors: {
            origin: ["http://localhost:3000"], 
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('user connected', socket.id);

        socket.on('start draft', async (order) => {
            let userIds = [];
            let users = [];
            order.forEach((team) => {
                userIds.push(team.owner);
            });

            try {
                users = await User.find({ '_id': { $in: userIds } });
                io.emit('draft started', users);
                let numPicks = 5; //number of picks per team

                const processPicks = async () => {
                    for (let i = 0; i < numPicks; i++) {
                        for (let j = 0; j < users.length; j++) {
                            console.log('lit');
                            let curr_pick = users[j];
                            io.emit('user turn', curr_pick);

                            const pick = await new Promise((resolve) => {
                                socket.on('user pick', (pick) => {
                                    console.log('User picked:', pick);
                                    io.emit('announce pick', pick);
                                    resolve(pick); // Resolve the promise once the pick is received
                                });
                            });

                            console.log('Pick:', pick);
                        }
                    }
                    console.log('Draft completed');
                };

                // Start processing picks
                await processPicks();
            } catch (error) {
                console.error('Error processing picks:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

module.exports = { start };
