import axios, { AxiosResponse, AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";
import Questions from "../questions/page";
import { Page } from "../model/Page";
import { QuestionsFilter } from "../model/filter";

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
    return isNaN(+valueStr) ? null : +valueStr
  }
  
}

export type ApiResponse<T> = {
  questions: T;
  headers: DsHeaders
}




export const BASE_URL = 'http://localhost:8080/api/'
export const API_ENDPOINT = {
  'questions': 'questions'
} as const

export const getQuestions = (page: Page, filter: QuestionsFilter): Promise<AxiosResponse<any, any>> => {
  return axios.get(BASE_URL + API_ENDPOINT['questions'], { params: { ...page, ...filter }})
}


