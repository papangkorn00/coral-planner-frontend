# Stage 1: build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN bun run build

# Stage 2: serve with bun
FROM oven/bun:1-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 5173
ENV NODE_ENV=production
CMD ["bunx", "serve", "-s", "dist", "-l", "tcp://0.0.0.0:5173"]
