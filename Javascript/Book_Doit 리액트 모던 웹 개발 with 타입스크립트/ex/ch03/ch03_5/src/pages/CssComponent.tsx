import {Title, Subtitle} from '../components'

export default function CssComponent() {
  return (
    <section className="mt-4">
      <Title>CssComponent</Title>
      <div className="mt-4 flex justify-evenly">
        <div className="flex flex-col justify-center">
          <Subtitle>normal</Subtitle>
          <button>button</button>
        </div>
        <div className="flex flex-col justify-center">
          <Subtitle>tailwindcss</Subtitle>
          <button className="bg-blue-500 text-white">button</button>
        </div>
        <div className="flex flex-col justify-center">
          <Subtitle>daisyui</Subtitle>
          <button className="btn btn-primary">button</button>
        </div>
      </div>
    </section>
  )
}
