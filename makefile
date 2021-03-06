all: build

build: build-node build-nginx

build-node: package.json
	docker run --rm -v $(PWD):/w/public -w /w/public node:10-alpine /bin/sh -c "npm install --registry=https://registry.npm.taobao.org; npm run build;"
	# docker build -tag localhost/innocence:innocence -f dockerfiles/Dockerfile-node .

build-nginx: dist/* sys_cfg/nginx-conf/nginx.conf sys_cfg/nginx-conf/conf.d/default.conf dockerfiles/Dockerfile-nginx
	docker build --tag localhost:5000/innocence-nginx -f dockerfiles/Dockerfile-nginx .

push-image:
	docker push localhost:5000/innocence-nginx

# deploy:

.PHONY : clean
#	clean:
