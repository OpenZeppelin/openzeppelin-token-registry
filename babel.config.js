module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env'
    ],
    [
      '@babel/preset-react'
    ]
  ]

  const plugins = [
    [
      'inline-react-svg'
    ],
    [
      '@babel/transform-runtime'
    ],
    [
      '@babel/plugin-proposal-class-properties'
    ],
    [
      'babel-plugin-root-import',
      {
        'rootPathSuffix': 'src',
        'rootPathPrefix': '~'
      }
    ],
    [
      'babel-plugin-root-import',
      {
        'rootPathSuffix': 'artifacts',
        'rootPathPrefix': '#'
      },
      'contract-root-import'
    ]
  ]

  return {
    presets,
    plugins
  }
}
