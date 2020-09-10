export type CommandAction = {
  id: number
  name: string
  payload: {
    [key: string]: any
  }
  category?: string
}

export type Mapping = {
  src: string
  dst: string
}

export type Profile = {
  name: string
  mappings: {
    [keyboardId: string]: Mapping[]
  }
}
