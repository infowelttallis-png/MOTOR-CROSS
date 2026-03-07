// styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* FIX: Remove default scrollbar visibility while keeping scroll functionality */
  html {
    scroll-behavior: smooth;
  
    /* Hide scrollbar for Firefox */
    scrollbar-width: none; 
    /* Hide scrollbar for IE and Edge */
    -ms-overflow-style: none; 
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  body {
    font-family: ${theme.fonts.primary}; 
 
    color: #ffffff;
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.display}; 
    font-weight: 700;
    line-height: 1.2;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Fix for the Overlay/Fixed button layers */
  #root {
    width: 100%;
    position: relative;
  }
`;
