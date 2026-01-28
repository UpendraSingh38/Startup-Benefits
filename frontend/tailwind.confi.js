/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}"
];
export const theme = {
  extend: {
    transitionTimingFunction: {
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }
};
export const plugins = [];
