import CoffeeScript from 'coffeescript'

export const coffeeScritPlugin = () => {
  return {
    name: 'coffee-script-plugin',
    transform(code, id) {
      if (id.endsWith('.coffee')) {
        const result = CoffeeScript.compile(code, {
          bare: true,
          sourceMap: true
        })
        return {
          code: result.js,
          map: result.sourceMap
        }
      }
    }
  }
}