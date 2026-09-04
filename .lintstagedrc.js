module.exports = {
  '*.{js,jsx,ts,tsx}': (filenames) =>
    `eslint --fix ${filenames.map((f) => `"${f}"`).join(' ')}`,
}
