import { GraphQLClient } from 'graphql-request'

export class VportalConnection {
  private static instance: GraphQLClient | undefined

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): GraphQLClient {
    if (!VportalConnection.instance) {
      throw new Error('Vportal client has not been initialized')
    }
    return VportalConnection.instance
  }

  public static hasInstance(): boolean {
    return VportalConnection.instance != undefined
  }

  public static initialize(url: string, token: string) {
    VportalConnection.instance = new GraphQLClient(url + '/graphql', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  public static destroy() {
    VportalConnection.instance = undefined
  }
}
