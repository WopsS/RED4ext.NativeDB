FROM node:alpine as builder

WORKDIR /app
COPY . .

RUN npm install && \
    npm run build && \
    npm install --production

FROM node:alpine as runner

ENV NODE_ENV production
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000

CMD [ "npm", "run", "start" ]
