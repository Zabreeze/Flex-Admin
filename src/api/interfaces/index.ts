/*
 *	响应结果（不包含data）
 */
export interface ResponseResultInterface {
  code: string
  msg: string
}

/*
 *	请求响应参数（包含data）
 */
export interface ResponseResultDataInterface<T = any> extends ResponseResultInterface {
  data: T
}

export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }
}
