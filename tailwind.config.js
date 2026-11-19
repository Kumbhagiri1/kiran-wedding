/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#641B2E",
          deep: "#42101F",
          dark: "#2A0B14",
          light: "#82263E",
        },
        gold: {
          antique: "#C6A15B",
          champagne: "#E8D6AD",
          light: "#F5E9CE",
          dark: "#9E7B36",
          accent: "#D4AF37",
        },
        cream: {
          ivory: "#FFF9EF",
          warm: "#F5EBDD",
          light: "#FDFBF7",
        },
        darkText: "#30231F",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-lora)", "serif"],
        ceremonial: ["var(--font-cinzel)", "serif"],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #C6A15B 0%, #FFF9EF 50%, #C6A15B 100%)',
        'royal-gradient': 'linear-gradient(180deg, #42101F 0%, #641B2E 50%, #42101F 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFF9EF 0%, #F5EBDD 100%)',
      },
      boxShadow: {
        'royal': '0 10px 30px -5px rgba(66, 16, 31, 0.3)',
        'gold-glow': '0 0 25px rgba(198, 161, 91, 0.35)',
        'gold-subtle': '0 4px 20px rgba(198, 161, 91, 0.2)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
