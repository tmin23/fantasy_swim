//import ListGroup from "./components/ListGroup";

//import Button from "./components/Button";

// function App() {
//   let items = ["New York", "New Hampshire", "Japan", "China", "Panda"];

//   const handleSelectItem = (item: string) => {
//     console.log(item);
//   };
//   return (
//     <div>
//       <ListGroup
//         items={items}
//         heading="Cities"
//         onSelectItem={handleSelectItem}
//       ></ListGroup>
//     </div>
//   );
// }

// export default App;

// import Alert from "./components/Alert";
// function App() {
//   return (
//     <div className="alert alert-primary">
//       <Alert>
//         Hello <span> World </span>
//       </Alert>
//     </div>
//   );
// }

// export default App;

import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";
function App() {
  const [alertVisible, setAlertVisability] = useState(false);
  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisability(false)}>My alert</Alert>
      )}
      <Button onClick={() => setAlertVisability(true)}>My Button</Button>
    </div>
  );
}

export default App;
