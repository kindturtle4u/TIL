import * as D from './data';

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

export default function App() {
  return (
      <div>
        <p>
          {D.randomName()}, {D.randomJobTitle()}, {D.randomDayMonthYear()}
        </p>
        <img src={D.randomAvatar()} height="50" />
        <img src={D.randomImage()} height="300" />

      </div>
  )
}
