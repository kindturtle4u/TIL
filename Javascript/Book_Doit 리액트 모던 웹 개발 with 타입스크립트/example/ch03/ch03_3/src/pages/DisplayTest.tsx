import {Title, Subtitle} from '../components'
import * as D from '../data'

export default function DisplayTest() {
  const inlineChildren = D.range(1, 5 + 1).map(number => (
    <div key={number} className="inline w-8 h-8 m-4 text-center text-gray-700 bg-sky-300">
      {number}
    </div>
  ))
  const blockChildren = D.range(1, 5 + 1).map(number => (
    <div key={number} className="block w-8 h-8 m-4 text-center text-gray-700 bg-sky-300">
      {number}
    </div>
  ))
  const inlineBlockChildren = D.range(1, 5 + 1).map(number => (
    <div
      key={number}
      className="inline-block w-8 h-8 m-4 text-center text-gray-700 bg-sky-300">
      {number}
    </div>
  ))
  return (
    <section className="mt-4">
      <Title>DisplayTest</Title>
      <div>
        <Subtitle>display: inline</Subtitle>
        {inlineChildren}
      </div>
      <div>
        <Subtitle>display: block</Subtitle>
        {blockChildren}
      </div>
      <div>
        <Subtitle>display: inline-block</Subtitle>
        {inlineBlockChildren}
      </div>
    </section>
  )
}
