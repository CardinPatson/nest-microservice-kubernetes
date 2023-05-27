FROM node:alpine As development 

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install 

COPY . .

RUN pnpm run build 

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

#TAKE THE BUILD OF DEVELOPMENT AND PUT THAT  INSIDE PRODUCTION 
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]

#docker build ../../ -f Dockerfile -t microservice_reservation
# ../../ = context (la ou est exécuté)
# Dockerfile = nom du fichier
# microservice_reservation = tag de l'image