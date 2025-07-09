// Error
export class Error<E, S> {
  readonly value: E;

  constructor(value: E) {
    this.value = value;
  }

  isSuccess(): this is Success<S, E> {
    return false;
  }

  isError(): this is Error<E, S> {
    return true;
  }
}

// Success
export class Success<S, E> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isSuccess(): this is Success<S, E> {
    return true;
  }

  isError(): this is Error<E, S> {
    return false;
  }
}

export type ResponseType<E, S> = Error<E, S> | Success<S, E>;

export const error = <E, S>(value: E): ResponseType<E, S> => {
  return new Error(value);
};

export const success = <E, S>(value: S): ResponseType<E, S> => {
  return new Success(value);
};