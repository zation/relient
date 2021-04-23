export interface Action<Payload, Meta> {
  type: string
  payload?: Payload
  meta?: Meta
  error?: boolean
}

export interface APIActionPayload extends RequestInit {
  method: string
  url: string
  isApi: boolean
}

export type APIAction = Action<APIActionPayload, any>;

export interface APIActionCreator<Params> {
  (params: Params): APIAction
}
