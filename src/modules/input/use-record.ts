export type RecorderRes = { file: string; duration: number }

// console.log(Recorder)
export function useRecord() {
  const recorder = uni.getRecorderManager()
  let onFinished: (sr: RecorderRes) => void = null
  /**
   * 这个时间暂时没啥用， 后续如果需要对接 onInterruptionBegin 的时候，可以捡起来用
   */
  // let startTime: number = -1
  // let endTime: number = -1
  /**
   * 超时句柄， 如果超时了， 句柄会被清空： 置为 null
   *  如果没有超时， 则句柄有值
   */
  let timeoutHandle: any = null
  /**
   * 用户是否授权过
   */
  let userAuthed = false
  init()
  return { startRecord: start, stopRecord: stop }
  function init() {
    recorder.onStop((res: { tempFilePath: string; duration: number; fileSize: number }) => {
      if (onFinished) {
        onFinished({
          duration: res.duration / 1000, // 小程序给的单位是毫秒
          file: res.tempFilePath,
        })
      }
      timeoutHandle = null
    })
    return new Promise((resolve, reject) => {
      uni.getSetting({
        success(res) {
          if (!res.authSetting['scope.record']) {
            uni.authorize({
              scope: 'scope.record',
              success() {
                userAuthed = true
                resolve(void 0)
                // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              },
              fail(error) {
                reject(error)
              },
            })
          } else {
            userAuthed = true
            resolve(void 0)
          }
        },
      })
    })
  }
  /**
   *
   * @param timeoutCallback 超时的回调
   * @returns
   */
  function start(timeoutCallback: (sr: RecorderRes) => void): Promise<void> {
    onFinished = timeoutCallback
    clearTimeout(timeoutHandle)
    // startTime = Date.now()
    if (userAuthed) {
      recorder.start({
        sampleRate: 16000,
        numberOfChannels: 1,
        format: 'mp3',
      })
      // 加一个震动， 表示可以说话了
      uni.vibrateShort({})
      timeoutHandle = setTimeout(() => {
        timeoutHandle = null
        recorder.stop()
      }, 50000) // 50s 就会超时
    } else {
      uni.showToast({
        title: '需要录音授权',
        icon: 'none',
      })
    }
    return
  }
  function stop(): Promise<RecorderRes> {
    clearTimeout(timeoutHandle)
    return new Promise((resolve, reject) => {
      // endTime = Date.now()
      onFinished = resolve
      recorder.stop()
    })
  }
}
