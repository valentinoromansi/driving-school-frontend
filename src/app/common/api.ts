
export const HeaderKey = {
  'X-Total-Count': 'X-Total-Count'
} as const
export type HeaderKey = keyof typeof HeaderKey

export class DsHeaders {
  headers: Headers
  constructor(headers: Headers) {
    this.headers = headers    
  }
  public get(key: HeaderKey): string | null {
    return this.headers.get(key);
  }
  public getAsNumber(key: HeaderKey): number | null {
    const value = this.headers.get(key)
    if(!value)
      return null
    return +value ? +value : null
  }
  
}

export type ApiResponse<T> = {
  questions: T;
  headers: DsHeaders
}