/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-base': 'linear-gradient(100deg, var( --color-secondary) -5.85%, var(--color-primary) 109.55%))',
        'hero-pattern': "url('/back-01.jpg')",
      },
      colors: {
        textColor: 'var(--color-text)',
        textColorMuted: 'var(--color-text-muted)',
        fieldColor: 'var( --color-field)',
        cardColor: 'var( --color-card)',
        backColor: 'var(--color-background)',
        avartarBColor: 'var(--color-avatar-border)',
        primary: 'var( --color-primary)',
        secondary: 'var(  --color-secondary)',
        accent: 'var( --color-accent)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}