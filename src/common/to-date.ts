import dayjs from 'dayjs'
export function toDate(date: any) {
  return dayjs(date).format('YYYY-MM-DD')
}
