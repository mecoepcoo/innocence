all: build

build: build-node build-nginx

build-node: package.json
	docker run --rm -v $(PWD)/app:/usr/src/app -w /usr/src/app node:10-alpine /bin/sh -c "npm install --registry=https://registry.npm.taobao.org; npm run build;"
	# docker build -tag localhost/innocence:innocence -f dockerfiles/Dockerfile-node .

build-nginx: sys_cfg/nginx-conf/nginx.conf sys_cfg/nginx-conf/conf.d/default.conf dockerfiles/Dockerfile-nginx
	docker build -tag localhost/nginx:innocence-nginx -f dockerfiles/Dockerfile-nginx .

push-image:
	docker push localhost/innocence:innocence
	docker push localhost/nginx:nginx

# deploy:
	