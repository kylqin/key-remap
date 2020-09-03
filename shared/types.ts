export type CommandAction = {
  id: number
  name: string
  payload: {
    [key: string]: any
  }
  category?: string
}
