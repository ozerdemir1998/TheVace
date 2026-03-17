# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build || true 
# Note: Since there's no build script in package.json for the API (only dev), 
# we'll just use ts-node or compile it. Let's add a build script in package.json later 
# or use ts-node in production (not recommended but works for simple apps).
# I'll use ts-node for now as the package.json doesn't have a build step.

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/index.ts ./
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["npx", "ts-node", "index.ts"]
