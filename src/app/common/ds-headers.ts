
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
  
}