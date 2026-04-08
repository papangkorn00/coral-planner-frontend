import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"
import express from "express"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === "production"
const port = process.env.PORT || 5173

async function createServer() {
  const app = express()
  let vite

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  if (!isProduction) {
    const {createServer: createViteServer} = await import("vite")
    vite = await createViteServer({
      server: {middlewareMode: true},
      appType: "custom",
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.resolve(__dirname, "dist/client"), {index: false}),
    )
  }

  app.use("*all", async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template
      let render

      if (!isProduction) {
        // 1. Read index.html
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8",
        )

        // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
        // and also applies HTML transforms from Vite plugins, e.g. global
        // preambles from @vitejs/plugin-react
        template = await vite.transformIndexHtml(url, template)

        // 3. Load the server entry. ssrLoadModule automatically transforms
        // ESM source code to be usable in Node.js! There is no bundling
        // required, and provides efficient invalidation similar to HMR.
        const module = await vite.ssrLoadModule("/src/entry-server.tsx")
        render = module.render
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, "dist/client/index.html"),
          "utf-8",
        )
        const module = await import("./dist/server/entry-server.js")
        render = module.render
      }

      const stream = await render()
      // 4. render the app HTML. This assumes entry-server.js's exported
      // `render` function calls appropriate framework SSR APIs,
      // e.g. ReactDOMServer.renderToString()
      const appHtml = await new Response(stream).text()
      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, () => appHtml)
      // 6. Send the rendered HTML back.
      res.status(200).set({"Content-Type": "text/html"}).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      if (!isProduction) {
        vite.ssrFixStacktrace(e)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(
      `Server started at http://localhost:${port} (Mode: ${isProduction ? "Production" : "Development"})`,
    )
  })
}

createServer()
