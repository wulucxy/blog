/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,public}/**/*.{js,ts,jsx,tsx,md,mdx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
