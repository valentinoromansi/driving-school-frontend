import { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";

export const HeaderKey = {
  'X-Total-Count': 'X-Total-Count'
} as const
export type HeaderKey = keyof typeof HeaderKey

type AxiosHeaderType = RawAxiosResponseHeaders | AxiosResponseHeaders
export class DsHeaders {
  headers: AxiosHeaderType

  constructor(headers: AxiosHeaderType) {
    this.headers = headers
  }

  /**
   * To lowercase is needed since axio saves them under lowercase header key
   */
  public get(key: HeaderKey): string | null {
    return this.headers[key?.toLowerCase()];
  }  
  public getAsNumber(key: HeaderKey): number | null {
    const valueStr: string | null = this.get(key)
    if(!valueStr)
      return null
    return +valueStr ? +valueStr : null
  }
  
}

export type ApiResponse<T> = {
  questions: T;
  headers: DsHeaders
}