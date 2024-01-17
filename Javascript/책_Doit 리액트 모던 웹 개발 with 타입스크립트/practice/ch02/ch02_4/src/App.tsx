// export default function App() {
//   const texts = [<p key="1">hello</p>, <p key="2">world</p>]
//   return <div>{texts}</div>
// }

import P from "./P";

export default function App() {
    const texts = ['hello', 'world']
        .map((text, index) => <P key={index} children={text}/>)
    return <div>{texts}</div>
}
