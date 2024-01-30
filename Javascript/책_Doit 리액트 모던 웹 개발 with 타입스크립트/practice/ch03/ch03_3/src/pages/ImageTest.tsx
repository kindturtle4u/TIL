import {Title} from '../components'
import * as D from '../data'

const src = D.randomImage(3000, 1600)
export default function ImageTest() {
    return (
        <section className="mt-4">
            <Title>CopyMe</Title>
            <div className="mt-4"></div>
        </section>
    )
}
