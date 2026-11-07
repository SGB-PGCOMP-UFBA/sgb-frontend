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

// ResizeObserver não existe no jsdom e é usado pelos componentes do Radix.
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// IntersectionObserver não existe no jsdom e é usado pelo scroll infinito.
// O teste que precisa disparar a interseção pega a instância em `instances`.
class IntersectionObserverStub {
  static instances: IntersectionObserverStub[] = []
  callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    IntersectionObserverStub.instances.push(this)
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
  trigger(isIntersecting = true) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    )
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverStub,
})
