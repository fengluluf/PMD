// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
     'postcss-px2rem-exclude': {
        remUnit: 75,
        exclude: /node_modules|folder_name/i
      },
      'postcss-pxtorem': {
        rootValue: 37.5,
        propList: ['*','!font-size'],
      }
  }
}
