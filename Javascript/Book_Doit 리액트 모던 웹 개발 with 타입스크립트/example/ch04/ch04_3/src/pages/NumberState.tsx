import {useState, useCallback} from 'react'
import {Title} from '../components'
import {Icon} from '../theme/daisyui'

export default function NumberState() {
  const [count, setCount] = useState<number>(0)

  const increment = useCallback(() => {
    setCount(count => count + 1)
  }, [])
  const decrement = useCallback(() => {
    setCount(count => count - 1)
  }, [])

  return (
    <section className="mt-4 mb-8">
      <Title>NumberState</Title>
      <div className="flex justify-center">
        <div className="flex items-center justify-between w-1/4 mt-4 ">
          <Icon name="add" className="btn-primary btn-lg" onClick={increment} />
          <p className="text-3xl text-bold text-primary">{count}</p>
          <Icon name="remove" className="btn-accent btn-lg" onClick={decrement} />
        </div>
      </div>
    </section>
  )
}
