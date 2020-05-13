index.d.ts: codegen
	sane-fmt
	deno run --unstable --allow-write=index.d.ts codegen/main.ts
