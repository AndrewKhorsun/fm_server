interface ApiErrorProps {
  message: string
  status: number
  errors?: Record<string, string>
}

export class ApiError extends Error {
  status: number
  errors: Record<string, string>

  constructor({ message, status, errors = {} }: ApiErrorProps) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static badRequest(message: string, errors?: Record<string, string>) {
    return new ApiError({
      message,
      errors,
      status: 400,
    })
  }

  static unauthorized(errors?: Record<string, string>) {
    return new ApiError({
      message: 'User is not authorized',
      errors,
      status: 401,
    })
  }

  static notFound(errors?: Record<string, string>) {
    return new ApiError({
      message: 'not found',
      errors,
      status: 404,
    })
  }
}
