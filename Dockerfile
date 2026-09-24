FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
ENV DATA_DIR=/data
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.mjs color-advice.mjs ./
COPY --from=build /app/dist ./dist
RUN apk add --no-cache wget \
    && mkdir -p /data
VOLUME ["/data"]
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
CMD ["npm", "start"]
