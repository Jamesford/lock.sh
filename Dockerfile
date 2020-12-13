FROM node:lts-alpine as deps
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN yarn build

FROM node:lts-alpine as runner
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
WORKDIR /opt/app
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
