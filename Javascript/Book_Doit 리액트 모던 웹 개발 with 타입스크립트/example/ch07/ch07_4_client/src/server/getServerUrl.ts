export const getServerUrl = (path: string) => {
  const host = 'http://localhost:4000'
  return [host, path].join('')
}
