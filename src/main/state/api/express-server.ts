import * as http from 'node:http'

export class ExpressServerInstance {
  private static instance: http.Server | undefined

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static set(server: http.Server) {
    this.instance = server
  }

  public static get(): http.Server {
    if (!this.instance) {
      throw new Error('No express server instance available')
    }
    return this.instance
  }

  public static clear() {
    this.instance?.close()
    this.instance = undefined
  }

  public static hasInstance() {
    return this.instance !== undefined
  }
}
