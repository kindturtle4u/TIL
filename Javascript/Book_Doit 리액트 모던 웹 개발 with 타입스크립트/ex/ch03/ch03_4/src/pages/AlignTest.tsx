import {Title, Subtitle} from '../components'
import * as D from '../data'

export default function AlignTest() {
  const boxes = D.range(0, 5).map(index => {
    return <div key={index} className="w-4 h-4 m-1 bg-black" />
  })
  const boxesForStretch = D.range(0, 10).map(index => {
    return <div key={index} className="w-4 m-4 bg-black" />
  })
  // prettier-ignore
  const justifies = ['justify-start', 'justify-center', 'justify-end',
    'justify-between', 'justify-around', 'justify-evenly'].map(justify => (
    <div key={justify} className="mt-4">
      <Subtitle>flex flex-row {justify}</Subtitle>
      <div  className={`flex flex-row ${justify} p-2 bg-gray-300`}>{boxes}</div>
    </div>
  ))
  const items = ['items-start', 'items-center', 'items-end'].map(item => (
    <div key={item} className="p-2 ml-4">
      <Subtitle>flex flex-row {item}</Subtitle>
      <div className={`flex flex-row ${item} h-20 bg-gray-300`}>{boxes}</div>
    </div>
  ))

  return (
    <section className="p-4 mt-4">
      <Title>AlignTest</Title>
      {justifies}
      {items}
      <div className="p-2 ml-4">
        <Subtitle>flex flex-row items-stretch</Subtitle>
        <div className="flex flex-row items-stretch h-20 bg-gray-300">
          {boxesForStretch}
        </div>
      </div>
    </section>
  )
}
