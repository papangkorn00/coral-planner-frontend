import ReactDOMServer from "react-dom/server"
import {StrictMode} from "react"
import App from "./App"

export async function render() {
   return ReactDOMServer.renderToReadableStream(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
