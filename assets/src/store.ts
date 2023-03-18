import { Socket, Presence } from "phoenix"
import { createStore } from 'solid-js/store';

let socket = new Socket("/socket", { params: { token: sessionStorage.userToken } })
socket.connect()

export let channel = socket.channel("cursor:lobby", {})
channel.join()
  .receive("ok", (resp: any) => {
    console.log("Joined successfully", resp)
  })
  .receive("error", (resp: any) => { console.log("Unable to join", resp) })

// channel.on('move', ({ x, y, name }: { x: number, y: number, name: string }) => {
//   const ul = document.createElement('ul');
//   const cursorLi = cursorTemplate({
//     x: x,
//     y: y,
//     name
//   });
//   ul.appendChild(cursorLi);
//   document.getElementById('cursor-list').innerHTML = ul.innerHTML;
// })

const presence = new Presence(channel);

presence.onSync(() => {
  const ul = document.createElement('ul');

  presence.list((name, { metas: [firstDevice] }) => {
    const { x, y } = firstDevice;
    const cursorLi = cursorTemplate({
      name, x, y
    });
    ul.appendChild(cursorLi);
  })

  document.getElementById('cursor-list').innerHTML = ul.innerHTML;
})

function cursorTemplate({ x, y, name }: { x: number, y: number, name: string }) {
  const li = document.createElement('li');
  li.classList =
    'flex flex-col absolute pointer-events-none whitespace-nowrap overflow-hidden text-pink-300';
  li.style.left = x + 'px';
  li.style.top = y + 'px';

  li.innerHTML = `
    <svg
      version="1.1"
      width="25px"
      height="25px"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 21 21">
        <polygon
          fill="black"
          points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6" />
        <polygon
          fill="currentColor"
          points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5"
        />
    </svg>
    <span class="mt-1 ml-4 px-1 text-sm text-pink-300" />
  `;

  li.lastChild.textContent = name;

  return li;
}


export function mouseMove(pos: any) { channel.push('move', pos) }

export default socket

