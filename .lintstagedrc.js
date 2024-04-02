module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) => `yarn lint:fix ${filenames.join(' ')}`,
}
