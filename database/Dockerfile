FROM mongo:3.4.7

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD 1234
ENV MONGO_INITDB_DATABASE moomall

ADD ./data/product.js /docker-entrypoint-initdb.d

