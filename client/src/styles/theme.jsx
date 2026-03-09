export const theme = {
  colors: {
    primary: "#ff5100", // Racing Orange
    secondary: "#020617", // Midnight Blue
    accent: "#ff6b00",
    background: "#020617",
    surface: "#0f172a",
    dark: "#020617",
    light: "#f8f9fa",
    white: "#ffffff",
    gray: "rgba(255, 255, 255, 0.4)",
    border: "rgba(255, 102, 0, 0.15)",
  },

  gradients: {
    primary: "linear-gradient(135deg, #ff4d00 0%, #ff8c00 100%)",
    darkFade: "linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, #020617 100%)",
    overlay:
      "linear-gradient(75deg, #020617 0%, rgba(2, 6, 23, 0.8) 40%, transparent 100%)",
  },

  fonts: {
    primary: "'Inter', sans-serif",
    display: "'Orbitron', sans-serif",
  },

  // Added uniform font scaling
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    h3: "clamp(1.5rem, 3vw, 2rem)",
    h2: "clamp(2rem, 5vw, 3.5rem)",
    h1: "clamp(3rem, 8vw, 6rem)",
    display: "clamp(4rem, 12vw, 10rem)", // For that massive 404/Hero look
  },

  // Added uniform padding & layout spacing
  padding: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "48px",
    section: "clamp(60px, 10vw, 120px)",
    container: "20px",
  },

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
};
