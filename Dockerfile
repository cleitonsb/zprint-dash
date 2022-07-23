FROM nginx:1.17.8-alpine

ENV APIURL ${APIURL}
ENV FRONTURL ${FRONTURL}

## Copy our default nginx config
# COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY ./dist /usr/share/nginx/html

CMD /bin/sh -c "envsubst < /usr/share/nginx/html/assets/config/env.tpl.json > /usr/share/nginx/html/assets/config/env.json && nginx -g 'daemon off;'"
