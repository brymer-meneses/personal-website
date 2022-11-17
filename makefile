

dev:
	npm run dev

build:
	npm run build

generate_svg_coords:
	npx ts-node --esm "./scripts/generateCoords.ts"

# normally make will run each command on a unique shell
# this forces make to ensure that the commands below all
# run on the same shell
.ONESHELL:
deploy: build
	cd "./dist" 
	git init
	git checkout -B main
	git add --all
	git commit -m 'deploy'
	git push -f git@github.com:brymer-meneses/brymer-meneses.github.io.git main
