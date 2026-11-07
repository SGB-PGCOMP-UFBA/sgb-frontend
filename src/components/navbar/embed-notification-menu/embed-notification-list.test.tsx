import { fireEvent, render, screen } from '@testing-library/react'
import type { EmbedNotificationDetailed } from '@/types'
import { EmbedNotificationList, type EmbedNotificationListProps } from './embed-notification-list'

type ObserverStub = { trigger: (isIntersecting?: boolean) => void }
const observers = () =>
  (window.IntersectionObserver as unknown as { instances: ObserverStub[] }).instances

function notification(id: number, consumed: boolean): EmbedNotificationDetailed {
  return {
    id,
    owner_id: 7,
    owner_type: 'STUDENT',
    title: `Notificação ${id}`,
    description: 'Descrição',
    consumed,
    created_at: '2026-11-01T10:00:00.000Z',
    updated_at: '2026-11-01T10:00:00.000Z',
  }
}

function renderList(overrides: Partial<EmbedNotificationListProps> = {}) {
  const props: EmbedNotificationListProps = {
    notifications: [notification(2, false), notification(1, true)],
    filter: 'all',
    isLoading: false,
    isLoadingMore: false,
    hasMore: false,
    onLoadMore: jest.fn(),
    onMarkAsRead: jest.fn(),
    ...overrides,
  }
  render(<EmbedNotificationList {...props} />)
  return props
}

describe('EmbedNotificationList', () => {
  beforeEach(() => observers().splice(0))

  it('mostra lidas e não lidas, com o botão de marcar só nas não lidas', () => {
    const props = renderList()

    expect(screen.getByText('Notificação 1')).toBeInTheDocument()
    expect(screen.getByText('(não lida)')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(1)

    fireEvent.click(screen.getByRole('button', { name: 'Marcar "Notificação 2" como lida' }))
    expect(props.onMarkAsRead).toHaveBeenCalledWith(2)
  })

  it('mostra a data por extenso com hora e minuto', () => {
    renderList()

    expect(screen.getAllByText(/^1 de novembro de 2026 às \d{2}:\d{2}$/)).toHaveLength(2)
  })

  it('no filtro de não lidas, a lista vazia avisa que não há não lidas', () => {
    renderList({ notifications: [], filter: 'unread' })

    expect(screen.getByText('Nenhuma notificação não lida.')).toBeInTheDocument()
  })

  it('quando o fim da lista aparece e há mais páginas, pede a próxima', () => {
    const props = renderList({ hasMore: true })

    observers().at(-1)?.trigger()

    expect(props.onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('sem mais páginas, não observa o fim da lista e avisa que acabou', () => {
    renderList({ hasMore: false })

    expect(observers()).toHaveLength(0)
    expect(screen.getByText('Não há mais notificações')).toBeInTheDocument()
  })

  it('mostra o loading enquanto traz mais notificações', () => {
    renderList({ hasMore: true, isLoadingMore: true })

    expect(screen.getByRole('status')).toHaveTextContent('Carregando mais notificações')
  })

  it('na primeira carga mostra skeleton e, sem nada, a mensagem vazia', () => {
    const { unmount } = render(
      <EmbedNotificationList
        notifications={[]}
        filter="all"
        isLoading
        isLoadingMore={false}
        hasMore={false}
        onLoadMore={jest.fn()}
        onMarkAsRead={jest.fn()}
      />
    )
    expect(screen.getByRole('status', { name: 'Carregando notificações' })).toBeInTheDocument()
    unmount()

    renderList({ notifications: [] })
    expect(screen.getByText('Você não tem notificações.')).toBeInTheDocument()
  })
})
