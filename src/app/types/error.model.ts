interface ErrorMessage {
  message: string
  field: string
}

export interface ApiError {
  errorsMessages: ErrorMessage[]
}
