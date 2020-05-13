import { resolve } from 'https://deno.land/std@v1.0.0-rc3/path/mod.ts'
import { writeFileStr } from 'https://deno.land/std@v1.0.0-rc3/fs/mod.ts'
import { dirname } from 'https://deno.land/x/dirname/mod.ts'

import {
  genPipeVal,
  genPipeFunc,
  genComposeFunc,
  genPipeUnaryFunc,
  genComposeUnaryFunc,
} from './model.ts'

export async function render() {
  const __dirname = dirname(import.meta)
  const filename = resolve(__dirname, '../index.d.ts')

  // WARNING:
  //   Size of index.d.ts increases exponentially as quantity increases:
  //   size = 3 * (1 + quantity) * (quantity / 2)
  const quantity = 64

  const content = [
    genPipeVal(quantity, 'pipe'),
    genPipeFunc(quantity, 'pipeline'),
    genComposeFunc(quantity, 'compose'),
    genPipeUnaryFunc(quantity, 'pipelineUnary'),
    genComposeUnaryFunc(quantity, 'composeUnary'),
    'export { pipeline as composeRight }',
    'export { pipelineUnary as composeUnaryRight }',
  ].join('\n\n')

  await writeFileStr(filename, content)

  return 0
}

export default render
