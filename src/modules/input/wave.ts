import { getCurrentInstance } from 'vue'
export default class SiriWave {
  opt: any
  K: number
  F: number
  speed: number
  noise: number
  phase: number
  width: number
  height: number
  MAX: number
  canvas: any // 这个canvas， 暂时没有找到类型
  ctx: CanvasRenderingContext2D
  devicePixelRatio: number
  run: boolean
  constructor(opt: any) {
    this.opt = opt || {}

    this.K = 2
    this.F = 6
    this.speed = this.opt.speed || 0.1
    this.noise = this.opt.noise || 0.2
    this.phase = this.opt.phase || 0
    // this.devicePixelRatio = this.opt.devicePixelRatio || 1;

    let devicePixelRatio = uni.getSystemInfoSync().pixelRatio

    if (!devicePixelRatio) devicePixelRatio = 1
    this.devicePixelRatio = devicePixelRatio
    this.width = devicePixelRatio * (this.opt.width || 320)
    this.height = devicePixelRatio * (this.opt.height || 68)
    this.MAX = this.height / 2 - 4
    this.run = false
  }

  init() {
    return new Promise(resolve => {
      uni
        .createSelectorQuery()
        .in(getCurrentInstance())
        .select('#waveCanvas')
        .fields({ node: true } as any, undefined)
        .exec(res => {
          // let devicePixelRatio = this.devicePixelRatio
          this.canvas = res[0].node
          this.canvas.width = this.width
          this.canvas.height = this.height
          this.ctx = this.canvas.getContext('2d')
          resolve(void 0)
        })
    })
  }

  private _globalAttenuationFn(x: number) {
    return Math.pow((this.K * 4) / (this.K * 4 + Math.pow(x, 4)), this.K * 2)
  }
  private _drawLine(attenuation: number, color: string, width: number) {
    this.ctx.moveTo(0, 0)
    this.ctx.beginPath()
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width || 1
    let x: number, y: number
    for (let i = -this.K; i <= this.K; i += 0.01) {
      x = this.width * ((i + this.K) / (this.K * 2))
      y = this.height / 2 + this.noise * this._globalAttenuationFn(i) * (1 / attenuation) * Math.sin(this.F * i - this.phase)
      // console.log(y, this.height, this.noise);
      this.ctx.lineTo(x, y)
    }
    this.ctx.stroke()
  }

  private _clear() {
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = 'source-over'
  }

  private _draw() {
    if (!this.run) return

    this.phase = (this.phase + this.speed) % (Math.PI * 64)
    this._clear()
    this._drawLine(-1, 'rgba(115,151,230,0.1)', 2)
    this._drawLine(1, 'rgba(115,151,230,1)', 2)
    this.canvas.requestAnimationFrame(this._draw.bind(this))
  }

  start() {
    this.phase = 0
    this.run = true
    this._draw()
  }

  stop() {
    this.run = false
    this._clear()
  }

  setNoise(v: number) {
    this.noise = Math.min(v, 1) * this.MAX
  }

  setSpeed(v: number) {
    this.speed = v
  }

  set({ noise, speed }: { noise?: number; speed?: number }) {
    this.setNoise(noise)
    this.setSpeed(speed)
  }
}
