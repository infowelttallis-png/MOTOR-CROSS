// styles/theme.js
export const theme = {
  colors: {
    primary: "#ff4d00", // Racing Orange
    secondary: "#000000", // Midnight Deep Blue/Black (Uniform background)
    accent: "#ff6b00",
    background: "#020617",
    surface: "#020617", // Lighter surface for cards/sections
    dark: "#020617",
    light: "#f8f9fa",
    white: "#ffffff",
    gray: "rgba(255, 255, 255, 0.4)",
    border: "rgba(255, 255, 255, 0.05)",
  },

  gradients: {
    primary: "linear-gradient(135deg, #ff4d00 0%, #ff8c00 100%)",
    darkFade: "linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, #020617 100%)",
    overlay:
      "linear-gradient(75deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
  },

  fonts: {
    primary: "'Inter', sans-serif", // Body text
    display: "'Orbitron', sans-serif", // HEADINGS - back to the racing look
  },

  // Uniform Racing Styles
  racing: {
    slant: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)",
    slantSmall: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
    borderBottom: "3px solid #ff4d00",
    transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  spacing: {
    section: "100px",
    container: "1200px",
  },

  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },

  shadows: {
    glow: "0 0 20px rgba(255, 77, 0, 0.3)",
    heavy: "0 20px 40px rgba(0, 0, 0, 0.6)",
  },
};
