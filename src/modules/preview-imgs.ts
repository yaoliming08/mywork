import { addTokenToUrl } from './messages/add-token-to-url'

export function previewImgs(urls: string[], current: string) {
  return uni.previewImage({
    urls: urls.map(item => addTokenToUrl(item)),
    current: addTokenToUrl(current),
  })
}
