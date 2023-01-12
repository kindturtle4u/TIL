import {getServerUrl} from './getServerUrl'

export const get = (path: string) => fetch(getServerUrl(path))
export const del = (path: string) => fetch(getServerUrl(path), {method: 'DELETE'})
