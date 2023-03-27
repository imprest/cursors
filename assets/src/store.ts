import { Socket, Presence } from "phoenix"

let socket = new Socket("/socket", { params: { token: sessionStorage.userToken } })
socket.connect()

export let channel = socket.channel("cursor:lobby", {})
channel.join()
  .receive("ok", (resp: any) => {
    console.log("Joined successfully", resp)
  })
  .receive("error", (resp: any) => { console.log("Unable to join", resp) })

export const presence = new Presence(channel);

export function mouseMove(pos: any) { channel.push('move', pos) }
export function msgSend(msg: any) { channel.push('msg_send', { msg: msg }) }

export default socket

