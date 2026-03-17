# Build stage
FROM node:20-slim AS builder

# Prisma için gerekli kütüphaneleri yükle
RUN apt-get update && apt-get install -y openssl && apt-get clean

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-slim

# Çalışma zamanı için OpenSSL yükle
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Üretim için derlenmiş JS kullanmak daha güvenlidir
CMD ["node", "dist/index.js"]
