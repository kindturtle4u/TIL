import {Input} from '../../theme/daisyui'

export default function Border() {
  return (
    <section className="mt-4">
      <h2 className="text-3xl font-bold text-center">Border</h2>
      <div className="flex p-4 mt-4 justify-evenly">
        <div>
          <label className="label">input-bordered</label>
          <Input className="input-bordered" />
        </div>
        <div>
          <label className="label">input-ghost</label>
          <Input className="input-ghost" />
        </div>
      </div>
    </section>
  )
}
