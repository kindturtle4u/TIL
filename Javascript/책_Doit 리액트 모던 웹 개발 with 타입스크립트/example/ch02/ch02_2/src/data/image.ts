import * as U from './util'
// prettier-ignore
export const unsplashUrl = (
  width: number, height: number, query?: string): string =>
//  query
  //  ? `https://source.unsplash.com/random/${width}x${height}/?${query}`
   //: `https://source.unsplash.com/random/${width}x${height}`
`https://picsum.photos/${width}/${height}`
export const randomImage = (
  w: number = 1000,
  h: number = 800,
  delta: number = 200
): string => unsplashUrl(U.random(w, w + delta), U.random(h, h + delta))

export const randomAvatar = () => {
  const size = U.random(200, 400)
  return unsplashUrl(size, size)
}
