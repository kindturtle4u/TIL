import Basic from './Basic'
import Color from './Color'
import Border from './Border'
import Size from './Size'

export default function inputTest() {
  return (
    <section className="mt-4">
      <h2 className="text-5xl font-bold text-center">inputTest</h2>
      <div className="mt-4">
        <Size />
        <Border />
        <Color />
        <Basic />
      </div>
    </section>
  )
}
