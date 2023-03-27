import { createSignal, createEffect, batch, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { mouseMove, msgSend, presence } from './store';
import logo from './../public/images/logo.svg';
import styles from './App.module.css';
import Cursor from './components/cursor';

type TCursor = { x: number, y: number, name: string, color: string };

const App = () => {
  const [cursors, setCursors] = createStore([]);
  const [pos, setPos] = createSignal({ x: 0, y: 0 });

  presence.onSync(() => {
    presence.list((name, { metas: [firstDevice] }) => {
      const { x, y, color, msg } = firstDevice;
      setCursors([{ name: name, x: x, y: y, color: color, msg: msg }])
    })
  })

  createEffect(() => {
    mouseMove(pos())
  })

  function handleMouseMove(event: any) {
    setPos({
      x: event.clientX,
      y: event.clientY
    })
  }

  let input: HTMLInputElement | undefined = undefined;

  const sendMsg = (e: SubmitEvent) => {
    e.preventDefault()
    batch(() => {
      if (input === undefined) return;
      if (!input.value.trim()) return;
      msgSend(input.value)
      input.value = "";
    })
  }

  return (
    <>
      <div onMouseMove={handleMouseMove}>
        <section
          class="flex flex-col w-screen h-screen justify-center items-center text-center"
        >
          <img src={logo} class={styles.logo} alt="logo" />
          <form
            id="msgform"
            class="rounded-xl bg-gradient-to-r to-pink-100 from-pink-50 p-8 drop-shadow-xl flex w-xs mx-auto space-x-3"
            onSubmit={sendMsg}
          >

            <input
              ref={input}
              class="flex-1 appearance-none border border-transparent py-2 px-4 bg-white text-gray-600 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
              maxlength="30"
              aria-label="Your message"
              type="text"
              id="msg"
              name="msg"
              placeholder="Say something"
            />
            <button
              id="submit-msg"
              type="submit"
              class="flex-shrink-0 bg-primary-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-200"
            >
              Change
            </button>
          </form>
          <ul>
            <For each={cursors}>
              {(cursor: any) => {
                return <Cursor x={cursor.x} y={cursor.y} name={cursor.name} color={cursor.color}></Cursor>
              }}
            </For>
          </ul>
        </section>
      </div >
    </>
  );
};

export default App;
