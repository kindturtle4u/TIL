import {Button} from '../../theme/daisyui'

export default function Basic() {
  return (
    <section className="mt-4">
      <h2 className="font-bold text-3xl text-center">Basic</h2>
      <div className="mt-4 flex justify-evenly">
        <button className="btn btn-primary">daysiui button</button>
        <Button className="btn btn-primary">Button</Button>
      </div>
    </section>
  )
}
