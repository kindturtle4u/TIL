import DivTest from './pages/DivTest'
import ViewportTest from './pages/ViewportTest'
import HeightTest from './pages/HeightTest'
import PaddingTest from './pages/PaddingTest'
import MarginTest from './pages/MarginTest'
import ImageTest from './pages/ImageTest'
import BackgroundImageTest from './pages/BackgroundImageTest'
import DisplayTest from './pages/DisplayTest'
import DisplayNoneTest from './pages/DisplayNoneTest'
import AvatarTest from './pages/AvatarTest'
import PositionTest from './pages/PositionTest'
import OverlayTest from './pages/OverlayTest'

export default function App() {
  return (
    <main>
      <OverlayTest />
      <PositionTest />
      <DisplayNoneTest />
      <DisplayTest />
      <AvatarTest />
      <BackgroundImageTest />
      <ImageTest />
      <MarginTest />
      <PaddingTest />
      <HeightTest />
      <ViewportTest />
      <DivTest />
    </main>
  )
}
