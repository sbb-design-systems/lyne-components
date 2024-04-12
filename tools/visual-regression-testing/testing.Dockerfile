FROM mcr.microsoft.com/playwright:v1.43.0-jammy

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .
