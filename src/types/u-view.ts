declare module toast {
  export interface Option {
    title: string //	显示的文本	String	-	-
    type?: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info' //	主题类型，不填默认为default	String	default	primary / success / error / warning / info
    duration?: number //	toast的持续时间，单位ms	Nubmer	2000	-
    url?: string //	toast结束跳转的url，不填不跳转，优先级高于back参数	String	-	-
    icon?: boolean //	是否显示显示type对应的图标，为false不显示图标	Boolean	true	false
    position?: 'center' | 'top' | 'bottom' //	toast出现的位置	String	center	top / bottom
    callback?: CallableFunction // 1.3.6	toast结束后执行的回调方法	Function	-	-
    isTab?: string //	toast结束后，跳转tab页面时需要配置为true	Boolean	false	true
    back?: string //toast结束后，是否返回上一页，优先级低于url参数
  }
  export interface Ref {
    show(op: Option): void
  }
}

declare module 'uview-plus' {
  const a: any
  export default a
}
