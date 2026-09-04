module.exports = {
  roots: ['<rootDir>'],

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/utils/tests/setup.js'],

  // Casa pasta `__tests__` e arquivos com `test`/`spec` no nome.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js'
  },

  moduleDirectories: ['node_modules', 'src'],

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  }
}
