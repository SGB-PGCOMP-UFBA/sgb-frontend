ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_BASE_URL_API
ENV VITE_BASE_URL_API=$VITE_BASE_URL_API

RUN test -n "$VITE_BASE_URL_API" || { \
      echo "ERRO: o build-arg VITE_BASE_URL_API e obrigatorio." >&2; \
      echo "      docker build --build-arg VITE_BASE_URL_API=https://api.exemplo.com ." >&2; \
      exit 1; \
    }

RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

RUN npm install -g serve@14.2.6 && npm cache clean --force

COPY --from=builder --chown=node:node /app/build ./build

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --spider "http://127.0.0.1:${PORT}/" || exit 1

CMD ["sh", "-c", "serve -s build -l tcp://0.0.0.0:${PORT}"]
