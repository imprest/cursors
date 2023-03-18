declare global {
  interface window {
    userToken: any
  }
  interface document { }
}

declare module 'phoenix'
