import dayjs from 'dayjs'
export function toDatetime(date: any) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:SS')
}
