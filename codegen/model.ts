function typeParams (quantity: number) {
  return Array
    .from({ length: quantity })
    .map((_, i) => '    T' + i)
    .join(',\n')
}

function pipeValParams (quantity: number) {
  const sig = (arg: number, res: number) =>
    `(x: T${arg}) => T${res}`

  const params = Array
    .from({ length: quantity - 1 })
    .map((_, i) => `    f${i + 1}: ${sig(i, i + 1)}`)
    .join(',\n')

  return params
}

function composeValParams (quantity: number) {
  const sig = (arg: number, res: number) =>
    `(x: T${arg}) => T${res}`

  const begin = Array
    .from({ length: quantity - 1 })
    .map((_, i) => `    f${i}: ${sig(i + 1, i)}`)
    .join(',\n')

  const last = `    f${quantity}: (...args: Args) => T${quantity - 1}`

  return [begin, last].filter(Boolean).join(',\n')
}

function composeUnaryValParams (quantity: number) {
  const sig = (arg: number, res: number) =>
    `(x: T${arg}) => T${res}`

  return Array
    .from({ length: quantity - 1 })
    .map((_, i) => `    f${i}: ${sig(i + 1, i)}`)
    .join(',\n')
}

function pipeRetVal (quantity: number) {
  return `T${quantity - 1}`
}

function pipeRetFunc (quantity: number) {
  return `(...args: Args) => T${quantity - 1}`
}

function pipeRetUnaryFunc (quantity: number) {
  return `(x: T0) => T${quantity - 1}`
}

function composeUnaryRetFunc (quantity: number) {
  return `(x: T${quantity - 1}) => T0`
}

interface Gen {
  (quantity: number, name: string): string
}

function mkGen (fn: Gen): Gen {
  return (quantity, name) => Array
    .from({ length: quantity })
    .map((_, i) => fn(i + 1, name))
    .join('\n')
}

export function genPipeValOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const values = pipeValParams(quantity)
  const rets = pipeRetVal(quantity)
  return [
    `export declare function ${name} <`,
    types,
    '> (',
    '    x0: T0,',
    values,
    `): ${rets};`
  ].join('\n')
}

export const genPipeVal = mkGen(genPipeValOverload)

export function genPipeFuncOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const values = pipeValParams(quantity)
  const rets = pipeRetFunc(quantity)
  return [
    `export declare function ${name} <`,
    '    Args extends any[],',
    types,
    '> (',
    '    f0: (...args: Args) => T0,',
    values,
    `): ${rets};`
  ].join('\n')
}

export const genPipeFunc = mkGen(genPipeFuncOverload)

export function genComposeFuncOverload (quantity: number, name: string) {
  const types = typeParams(quantity)
  const values = composeValParams(quantity)
  return [
    `export declare function ${name} <`,
    types + ',',
    '    Args extends any[]',
    '> (',
    values,
    '): (...args: Args) => T0;'
  ].join('\n')
}

export const genComposeFunc = mkGen(genComposeFuncOverload)

export function genPipeUnaryFuncOverload (quantity: number, name: string) {
  const types = typeParams(quantity + 1)
  const values = pipeValParams(quantity + 1)
  const rets = pipeRetUnaryFunc(quantity + 1)
  return [
    `export declare function ${name} <`,
    types,
    '> (',
    values,
    `): ${rets};`
  ].join('\n')
}

export const genPipeUnaryFunc = mkGen(genPipeUnaryFuncOverload)

export function genComposeUnaryFuncOverload (quantity: number, name: string) {
  const types = typeParams(quantity + 1)
  const values = composeUnaryValParams(quantity + 1)
  const rets = composeUnaryRetFunc(quantity + 1)
  return [
    `export declare function ${name} <`,
    types + ',',
    '> (',
    values,
    `): ${rets};`
  ].join('\n')
}

export const genComposeUnaryFunc = mkGen(genComposeUnaryFuncOverload)
