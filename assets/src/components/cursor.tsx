import { createSignal, Show } from "solid-js";

export default function cursor(props) {
  return (
    <li
      class='flex flex-col absolute pointer-events-none whitespace-nowrap overflow-hidden'
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`,
        color: props.color,
      }}>
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
      <span style={{ "background-color": props.color }}
        class="mt-1 ml-4 px-1 text-sm text-white w-fit">{props.name}</span>
      <Show when={props.msg}>
        <span
          style={{ "background-color": props.color }}
          class="text-green-50 mt-1 py-0, px-1 text-sm text-left rounded-br-md opacity-80 fit-content">
          {props.msg}
        </span>
      </Show>
    </li>
  )
}
