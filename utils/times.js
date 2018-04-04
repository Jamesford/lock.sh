export const DefaultTime = '86400'

// Values in seconds
export const ValidTimes = [
  { key: '48h', val: '172800' },
  { key: '24h', val: '86400' },
  { key: '12h', val: '43200' },
  { key: '6h', val: '21600' },
  { key: '1h', val: '3600' },
  { key: '30m', val: '1800' },
  { key: '10m', val: '600' }
]

export const ValidValues = ValidTimes.map(t => t.val)

export default {
  DefaultTime,
  ValidTimes,
  ValidValues
}
