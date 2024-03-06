import { EventEmitter } from 'eventemitter3'
import { addTokenToUrl } from './add-token-to-url'
import { onMounted, onUnmounted } from 'vue'
class VoicePlayer extends EventEmitter {
  innerAudioContext = uni.createInnerAudioContext()
  constructor() {
    super()
    this.innerAudioContext.onEnded(() => {
      this.emit('end')
    })
  }
  start(voiceUrl: string) {
    this.stop()
    this.innerAudioContext.src = addTokenToUrl(voiceUrl)
    this.innerAudioContext.play()
  }

  stop() {
    this.emit('end')
    this.innerAudioContext.stop()
  }
  unload() {
    this.innerAudioContext.stop()
  }
}

export function onUnload() {
  onUnmounted(() => {
    voicePlayer.unload()
  })
}

export const voicePlayer = new VoicePlayer()

export function useVoicePlayerOnEnd(endHandle: () => void) {
  onMounted(() => {
    voicePlayer.on('end', endHandle)
  })
  onUnmounted(() => {
    voicePlayer.off('end', endHandle)
  })
}
