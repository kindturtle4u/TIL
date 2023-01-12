import {Input} from '../../theme/daisyui'

export default function Color() {
  return (
    <section className="mt-4">
      <h2 className="text-3xl font-bold text-center">Color</h2>
      <div className="flex flex-col p-4 mt-4">
        <div>
          <label className="label">input-primary</label>
          <Input className="input-primary" />
        </div>
        <div>
          <label className="label">input-secondary</label>
          <Input className="input-secondary" />
        </div>
        <div>
          <label className="label">input-accent</label>
          <Input className="input-accent" />
        </div>
        <div>
          <label className="label">input-info</label>
          <Input className="input-info" />
        </div>
        <div>
          <label className="label">input-success</label>
          <Input className="input-success" />
        </div>
        <div>
          <label className="label">input-warning</label>
          <Input className="input-warning" />
        </div>
        <div>
          <label className="label">input-error</label>
          <Input className="input-error" />
        </div>
      </div>
    </section>
  )
}
