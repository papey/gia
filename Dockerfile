# Stage 1 : Build
# From latest node version
FROM node:lts-buster as builder

RUN apt-get update -y \
	&& apt-get upgrade -y

# Declare args
ARG REVISION
ARG RELEASE_TAG
ENV YARN_VERSION=1.22.4

# Create src dir
RUN mkdir /opt/gia

# Set working directory
WORKDIR /opt/gia

# Deps first, optimizing layers
COPY package.json .

# Download all the world in node_modules
RUN yarn

# Then code
COPY . .

# From ts to js
RUN yarn build

# Stage 2 : run !
FROM node:lts-buster

RUN apt-get update -y \
	&& apt-get upgrade -y

# image-spec annotations using labels
# https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL org.opencontainers.image.source="https://github.com/papey/gia"
LABEL org.opencontainers.image.revision=${GIT_COMMIT_SHA}
LABEL org.opencontainers.image.version=${RELEASE_TAG}
LABEL org.opencontainers.image.authors="Wilfried OLLIVIER"
LABEL org.opencontainers.image.title="gia"
LABEL org.opencontainers.image.description="gia runtime"
LABEL org.opencontainers.image.licences="Unlicense"

RUN useradd -ms /bin/bash gia

RUN mkdir /opt/gia

WORKDIR /opt/gia

COPY --from=builder /opt/gia/dist ./dist
COPY --from=builder /opt/gia/package.json .
RUN npm install --only=production

USER gia

# setup default args
CMD ["/opt/gia/dist/main.js"]

# setup entrypoint command
ENTRYPOINT ["node"]
