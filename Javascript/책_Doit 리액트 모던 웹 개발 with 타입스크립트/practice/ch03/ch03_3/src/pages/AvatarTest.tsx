import {Avatar, Div, Title} from '../components'
import * as D from '../data'

export default function AvatarTest() {
    const avatars = D.range(0, 10).map(index => (
        <Avatar
        className="inline-block border-4 border-white -ml-6"
        key={index}
        src={D.randomAvatar()}
        />
    ))

    return (
        <section className="mt-4">
            <Title>AvatarTest</Title>
            <Div className="px-12 py-4 m-8 bg-blue-300">{avatars}</Div>
        </section>
    )
}
