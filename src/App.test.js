import { render, screen } from '@testing-library/react'
import App from './App'

describe('Button component tests', () => {
  test('verifica se a aplicação está subindo', () => {
    render(<App />)
    const linkElement = screen.getByText('login')
    expect(linkElement).toBeInTheDocument()
  })
})
