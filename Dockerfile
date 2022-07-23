FROM nginx:1.17.8-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist /usr/share/nginx/html

CMD /bin/sh -c "envsubst < /usr/share/nginx/html/assets/config/env.tpl.js > /usr/share/nginx/html/assets/config/env.js && nginx -g 'daemon off;'"
