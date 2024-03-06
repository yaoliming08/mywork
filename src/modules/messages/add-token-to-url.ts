import { useStore } from '@stores/local'
export function addTokenToUrl(url: string) {
  const store = useStore()
  if (url.includes('?')) {
    url = url + '&'
  } else {
    url = url + '?'
  }
  url = url + 'token=' + store.token
  return url
}
