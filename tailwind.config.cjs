/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif" ],
      rufina: ["Rufina", "serif"],
      shippori: ["Shippori Mincho", "serif"]
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(145px, 1fr))',  // 200px being the minimum size of the item.
      },
      colors: {
        primary: "#515B57",
        secondary: "#788473",
        secondaryHover: '#535850',
        textPrimary: '#798781',
        textSecondary: '#7B7D7C',
        text2nd: '#899385',
        faily: '#B78F8F',
        failyBtn: '#CDA7A7'
      },
      lineHeight: {
        'extra-tight': '0.8'
      },
      boxShadow: {
        'landing-btn': '0px 12px 32px rgba(0, 0, 0, 0.25)'
      },
      backgroundImage: {
        'landing-gradient': "linear-gradient(180deg, rgba(10, 12, 12, 0.61) 42.71%, rgba(15, 23, 23, 0.65) 46.88%, rgba(10, 23, 23, 0.00) 100%)",
        'text-gradient': 'linear-gradient(180deg,#fff,hsla(0,0%,100%,.85))',
        'mobile-gradient': "linear-gradient(180deg, rgba(10, 12, 12, 0.25) 0%, rgba(15, 23, 23, 0.25) 0.01%, rgba(10, 23, 23, 0.25) 100%)"
      },
    }
  },
  plugins: [
    require("@kobalte/tailwindcss")
  ]
};
