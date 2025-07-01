import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.gitignore',
    '.husky/**',
    'cli/pnpm-lock.yaml',
    'pnpm-lock.yaml',
    'public/**',
    'src/assets/**',
    'index.html',
    'server/**',
  ],
})
