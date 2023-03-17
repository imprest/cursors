import { render } from "solid-js/web";
import { For, createSignal } from 'solid-js';

import { channel } from "./user_socket.ts";

import logo from './logo.svg';
import styles from './App.module.css';

const App = () => {
  const [pos, setPos] = createSignal({ x: 0, y: 0 });

  function handleMouseMove(event: any) {
    setPos({
      x: event.clientX,
      y: event.clientY
    })

    channel.on('move', pos())
  }

  const [mousers, setMousers] = createSignal([])
  let input: HTMLInputElement;
  let mouserId = 0;

  const addMouser = (text: string) => {
    setMousers([...mousers(), { id: ++mouserId, text }])
  }

  return (
    <>
      < div onMouseMove={handleMouseMove}>
        <img src={logo} class={styles.logo} alt="logo" />
        <section
          class="flex flex-col w-screen h-screen justify-center items-center text-center"
        >
          <form
            id="msgform"
            class="rounded-xl bg-gradient-to-r to-pink-100 from-pink-50 p-8 drop-shadow-xl flex w-xs mx-auto space-x-3"
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
              onClick={(e) => {
                if (!input.value.trim()) return;
                addMouser(input.value);
                input.value = "";
              }}
              id="submit-msg"
              type="submit"
              class="flex-shrink-0 bg-pink-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-200"
            >
              Change
            </button>
          </form>
          <ul id="cursor-list" />
        </section>

      </div >
    </>
  );
};

export default App;
