/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["Inter", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      colors: {
        bg:       "#0f1117",
        surface:  "#1a1d27",
        surface2: "#22263a",
        border:   "#2e3147",
        accent:   "#6366f1",
        accent2:  "#818cf8",
        muted:    "#8892a4",
        subtle:   "#4a5568",
      },
      borderRadius: { xl2: "1.5rem" },
      boxShadow: {
        accent: "0 4px 14px rgba(99,102,241,.4)",
        card:   "0 8px 24px rgba(0,0,0,.5)",
      },
    },
  },
  plugins: [],
};
