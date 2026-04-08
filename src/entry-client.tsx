import ReactDOM from "react-dom/client"
import {StrictMode} from "react"
import './index.css'
import App from "./App"

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <StrictMode>
    <App />
  </StrictMode>,
)
