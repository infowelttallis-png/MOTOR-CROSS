import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// We remove StrictMode for maximum performance in the final render
root.render(<App />);
