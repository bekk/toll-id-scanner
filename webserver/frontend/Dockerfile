FROM nginx:alpine

COPY ./index.html /usr/share/nginx/html/index.html
COPY ./script.js /usr/share/nginx/html/script.js
COPY ./style.css /usr/share/nginx/html/style.css

EXPOSE 80

CMD sed -i 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

