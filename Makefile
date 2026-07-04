.PHONY: install dev build preview update clean

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

preview:
	pnpm preview

update:
	pnpm up-latest

clean:
	rm -rf dist tsconfig.tsbuildinfo node_modules/.vite
