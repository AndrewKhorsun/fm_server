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

  static unauthorized(message?: string, errors?: Record<string, string>) {
    return new ApiError({
      message: message ?? 'User is not authorized',
      errors,
      status: 401,
    })
  }

  static notFound(message?: string, errors?: Record<string, string>) {
    return new ApiError({
      message: message ?? 'Not found',
      errors,
      status: 404,
    })
  }

  static forbidden(message?: string, errors?: Record<string, string>) {
    return new ApiError({
      message: message ?? 'Access forbidden',
      errors,
      status: 403,
    })
  }

  static internalServer(message?: string, errors?: Record<string, string>) {
    return new ApiError({
      message: message ?? 'Internal Server Error',
      errors,
      status: 500,
    })
  }
}
