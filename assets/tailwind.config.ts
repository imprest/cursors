import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../lib/cursors_web/**/*.{heex, ex}'
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.pink,
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config

