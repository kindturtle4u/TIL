import {Component} from 'react'
import {Title} from '../components'

export default class ClassLifecycle extends Component {
  state = {
    today: new Date(),
    intervalId: null as unknown as NodeJS.Timer // 타입스크립트가 요구하는 구현 방식입니다
  }
  componentDidMount() {
    const duration = 1000
    const intervalId = setInterval(() => this.setState({today: new Date()}), duration)
    this.setState({intervalId})
  }
  componentWillUnmount() {
    clearInterval(this.state?.intervalId)
  }
  render() {
    const {today} = this.state
    return (
      <section className="mt-4">
        <Title>ClassLifecycle</Title>
        <div className="flex flex-col items-center mt-4">
          <p className="font-mono text-3xl">{today.toLocaleTimeString()}</p>
          <p className="font-mono text-3xl">{today.toLocaleDateString()}</p>
        </div>
      </section>
    )
  }
}
