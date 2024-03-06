const encode = encodeURIComponent
/**
 * 将对象数据转换为query， 会将key和value都做encodeURIComponent处理
 * @param param
 * @returns
 */
export function toQuery(param: Record<string, any>) {
  return Object.entries(param)
    .reduce((last, [key, val]) => {
      // 如果值为undefined， 过滤掉
      if (val !== undefined && val !== '') {
        last.push(`${encode(key)}=${encode(val)}`)
      }
      return last
    }, [] as string[])
    .join('&')
}

const decode = decodeURIComponent
/**
 * 将uniapp的onload参数query处理一下，对key和value做decodeURIComponent处理
 *  -- uniapp没处理
 * @param query
 * @returns
 */
export function queryToRecord(query: AnyObject) {
  return Object.entries(query).reduce((last, [key, val]) => {
    last[decode(key)] = decode(val)
    return last
  }, {} as Record<string, any>)
}
