# ════════════════════════════════════════════════════════════════
# HINDUSTAN PROJECTS — DOCKER MULTI-STAGE PRODUCTION CONTAINER
# ════════════════════════════════════════════════════════════════

# ── Stage 1: Build Frontend Assets ──
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Production Runtime (Express Backend + Static Host) ──
FROM node:20-alpine AS production
WORKDIR /app

# Install SQLite dependencies & build tools
RUN apk add --no-libc-base-search python3 make g++

# Copy backend dependencies and source
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --production

COPY backend ./backend
COPY --from=frontend-builder /app/dist ./dist

# Create persistent storage directories
RUN mkdir -p /app/backend/uploads

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app/backend
CMD ["node", "server.js"]
