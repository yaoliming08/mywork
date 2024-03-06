import { SImageMessage } from '@/model/message'
import { addTokenToUrl } from './add-token-to-url'

const previewData: Set<SImageMessage> = new Set()

export function addImg(img: SImageMessage) {
  previewData.add(img)
}

export function removeImg(img: SImageMessage) {
  previewData.delete(img)
}

export function getPreviewData(img: SImageMessage) {
  return {
    current: addTokenToUrl(img.content),
    urls: Array.from(previewData).map(item => addTokenToUrl(item.content)),
  } as UniApp.PreviewImageOptions
}
