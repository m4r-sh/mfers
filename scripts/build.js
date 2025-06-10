build()

async function build(){
  const result = await Bun.build({
    entrypoints: ['./src/index.js'],
    outdir: './dist',
    target: 'browser',
    minify: true
  })
  if(!result.success){
    console.error('build failed:', result.logs)
  } else {
    console.log('build success')
  }
}