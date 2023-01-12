/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
*/

/*
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
*/

/*
import React from 'react'
let pPhysicalDOM = document.createElement('p')
pPhysicalDOM.innerText = 'Hello physical DOM world!'
document.body.appendChild(pPhysicalDOM)
*/

import React from 'react'
import ReactDOM from 'react-dom/client'

const pVirtualDOM = React.createElement('p', null, 'Hello virtual DOM world!')
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(pVirtualDOM)
