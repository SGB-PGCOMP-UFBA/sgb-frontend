// jest-dom adiciona matchers para asserções sobre nós do DOM,
// permitindo coisas como expect(element).toHaveTextContent(/react/i).
import '@testing-library/jest-dom'

// window.matchMedia não existe no jsdom e é usado pelos breakpoints do MUI.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
