import { compareVersion } from './compare-version'

type Size = { width: number; height: number }
const MAX_SIZE = 300
function compressImgSize({ width, height }: Size, maxSize = MAX_SIZE) {
  let compressedWidth = width
  let compressedHeight = height

  if (width > maxSize) {
    compressedWidth = maxSize
    compressedHeight = (maxSize / width) * height
  }
  if (compressedHeight > maxSize) {
    compressedHeight = maxSize
    compressedWidth = (maxSize / compressedHeight) * compressedWidth
  }

  return {
    width: compressedWidth,
    height: compressedHeight,
  }
}

function compressImg(img: string, { width, height }: Size): Promise<string> {
  return new Promise((resolve, reject) => {
    // 注意这里是uniapp的bug， uniapp给的参数是 width,height，并且是string类型
    //  而小程序给的是 compressedWidth/compressHeight，是number类型
    // 本以为uniapp会处理， 但是并没有， 用width/height不好使
    uni.compressImage({
      compressedWidth: width,
      compressHeight: height,
      src: img,
      success(result: any) {
        resolve(result.tempFilePath)
      },
      fail(result: any) {
        reject(result)
      },
    } as any)
  })
}

function toBase64(img: string): Promise<string> {
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath: img,
      encoding: 'base64',
      success(result) {
        resolve(result.data as string)
      },
      fail(result) {
        reject(result)
      },
    })
  })
}

function getImgSize(img: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: img,
      success(result) {
        let { height, width } = result
        resolve({ height, width })
      },
      fail(result) {
        reject(result)
      },
    })
  })
}

export async function getImgBase64(img: string): Promise<string> {
  let size = await getImgSize(img)
  if (size.height > MAX_SIZE || size.width > MAX_SIZE) {
    const version = uni.getAppBaseInfo().SDKVersion
    /**
     * 这个版本号是微信压缩图片的宽高参数最小支持版本号，低于这个版本，则无法按照宽高压缩，会导致发送不出去
     */
    if (compareVersion(version, '2.26.0') < 0) {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      uni.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
      })
      throw new Error('-1')
    }
    size = compressImgSize(size)
    img = await compressImg(img, size)
  }
  return toBase64(img)
}
