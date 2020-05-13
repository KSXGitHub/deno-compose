# Overload Definition of Pipe and Compose

`pipe`, `pipeline`, and `compose` functions with 64 overloads per function.

## What's the point?

This package not only provides simple `pipe`, `pipeline`, and `compose` implementation, it also provides 64 TypeScript overloads for each function. [See [index.d.ts](./index.d.ts)]

## Usage

### Import as module

**URLs to import from:** _(replace `:VERSION` with suitable version, which are git tags)_

* GitHub User Content: `https://raw.githubusercontent.com/KSXGitHub/deno-compose/:VERSION/index.js`
* GitHub Pages: `https://ksxgithub.github.io/deno-compose/index.js` (always master branch)
* Deno Third-Party Modules: `https://deno.land/x/compose@:VERSION/index.js`

**Code Example:**

```typescript
import {
  pipe,
  pipeline,
  compose,
  pipeUnary,
  pipelineUnary,
  composeUnary,
} from 'https://deno.land/x/compose@1.0.0/index.js'
```

### APIs

#### `pipe`

**Signature:** `pipe (value, ...functions) → result`

```typescript
const y = pipe(x0, f1, f2, f3)
```

is equivalent to

```typescript
const x1 = f1(x0)
const x2 = f2(x1)
const y = f3(x2)
```

or

```typescript
const y = f3(f2(f1(x0)))
```

#### `pipeline`

**Signature:** `pipeline (...functions) → function`

```typescript
const fn = pipe(f0, f1, f2, f3)
```

is equivalent to

```typescript
const fn = (...args) => f3(f2(f1(f0(...args))))
```

#### `compose`

**Signature:** `compose (...functions) → function`

```typescript
const fn = compose(f3, f2, f1, f0)
```

is equivalent to

```typescript
const fn = (...args) => f3(f2(f1(f0(...args))))
```

#### `pipelineUnary`

**Signature:** `pipeline (...functions) → function`

```typescript
const fn = pipe(f0, f1, f2, f3)
```

is equivalent to

```typescript
const fn = x => f3(f2(f1(f0(x))))
```

#### `composeUnary`

**Signature:** `compose (...functions) → function`

```typescript
const fn = compose(f3, f2, f1, f0)
```

is equivalent to

```typescript
const fn = x => f3(f2(f1(f0(x))))
```

#### `composeRight`

It is just an alias of [`pipeline`](#pipeline)

#### `composeUnaryRight`

It is just an alias of [`pipelineUnary`](#pipelineunary)

### Example

```typescript
// pipe
const y0 = pipe(x, f1, f2, f3, f4)

// pipeline
const g1 = pipeline(f0, f1, f2, f3, f4)
const y1 = g1(...args)

// compose
const g2 = compose(f4, f3, f2, f1, f0)
const y2 = g2(...args)
```

## Development

### Code Style

This project is formatted according to [sane-fmt](https://github.com/KSXGitHub/sane-fmt/).

## License

[MIT](https://git.io/JvNN2) © [Hoàng Văn Khải](https://github.com/KSXGitHub/)
