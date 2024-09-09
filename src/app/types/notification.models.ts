type SeverityType = 'error' | 'success'

export interface Notify {
  severity: SeverityType
  message: string
}
