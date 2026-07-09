# Stage 1: build stage
FROM oven/bun:1-alpine AS builder

WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install
COPY . .
RUN bun run build

# Stage 2 final
FROM oven/bun:1-alpine

WORKDIR /app
COPY --from=builder /app /app
EXPOSE 5173
ENV NODE_ENV=production
CMD ["bun", "server.js"]

