// Ensure this is treated as a module.
export {};

declare global {
  interface Window {
    userToken: string
  }
  interface document {}
}