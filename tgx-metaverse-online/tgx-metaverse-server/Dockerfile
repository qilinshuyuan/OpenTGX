FROM node

# 使用淘宝 NPM 镜像（国内机器构建推荐启用）
# RUN npm config set registry https://registry.npm.taobao.org/

# npm install
ADD package*.json /src/
WORKDIR /src
RUN npm i

# build
ADD . /src
RUN npm run build

# clean
RUN npm prune --production

# move
RUN rm -rf /app \
    && mv dist /app \
    && mv node_modules /app/ \
    && rm -rf /src

# ENV
ENV NODE_ENV production

EXPOSE 3000

WORKDIR /app
CMD node index.js