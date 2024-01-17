// import React from 'react'
// import ReactDOM from 'react-dom/client'
//
// export default function App()  {
//     const CE = React.createElement
//     const rootVirtualDOM = CE('ul', null, [
//         CE('li', null, [
//             CE('a', {href: 'http://www.google.com', target: '_blank'}, [
//                 CE('p', null, 'go to Google')
//             ])
//         ])
//     ])
//
//     return rootVirtualDOM;
// }


import ReactDOM from 'react-dom/client'

// export default function App()  {
//     const children = [
//         <li>
//             <a href="http://www.google.com" target="_blank">
//                 <p>go to Google</p>
//             </a>
//         </li>,
//         <li>
//             <a href="http://www.facebook.com" target="_blank">
//                 <p>go to facebook</p>
//             </a>
//         </li>,
//         <li>
//             <a href="http://www.twitter.com" target="_blank">
//                 <p>go to twitter</p>
//             </a>
//         </li>,
//     ];
//
//     const rootVirtualDOM = <ul>{children}</ul>
//
//     return rootVirtualDOM;
// }


// export default function App() {
//     const childen = [0, 1, 2].map((n: number) => <h3>Hello world! {n}</h3>)
//     const rootVirtualDOM = <div>{childen}</div>
//     return rootVirtualDOM
// }

import * as D from './data'
export default function App() {
    const childen = D.makeArray(10).map((notUsed, index) => (
        <div key={index}>
            <p>{D.randomId()}</p>
            <p>{D.randomName()}</p>
            <p>{D.randomJobTitle()}</p>
            <p>{D.randomSentence()}</p>
            <img src={D.randomAvatar()} width={100} height={100} />
        </div>
    ))

    return <div>{childen}</div>


}
