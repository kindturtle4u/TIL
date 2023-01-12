import GetTest from './GetTest'
import PostTest from './PostTest'
import PutTest from './PutTest'
import DeleteTest from './DeleteTest'

export default function RestTest() {
  return (
    <div>
      <p className="text-3xl text-center text-bold">RestTest</p>
      <DeleteTest />
      <PutTest />
      <PostTest />
      <GetTest />
    </div>
  )
}
