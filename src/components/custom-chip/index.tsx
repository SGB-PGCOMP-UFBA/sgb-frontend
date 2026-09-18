import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import {
  getScholarshipStatusLabel,
  getUserStatusLabel
} from '@/constants/Status'

export type CustomChipType =
  | 'agency'
  | 'program'
  | 'status'
  | 'user-status'

export interface CustomChipProps {
  type: CustomChipType
  value: string
}

const chipVariants = cva(
  'inline-flex w-full items-center justify-center overflow-auto rounded-md px-2.5 py-1 text-xs font-bold',
  {
    variants: {
      tone: {
        cnpq: 'bg-[rgba(17,130,59,0.4)] text-[rgb(10,78,35)]',
        capes: 'bg-[rgba(96,165,250,0.4)] text-[rgb(36,97,172)]',
        fapesb: 'bg-[rgba(250,204,21,0.4)] text-[rgb(116,93,5)]',
        outras: 'bg-[rgba(248,113,113,0.4)] text-[rgb(109,2,2)]',
        doutorado: 'bg-[rgba(214,216,255,0.4)] text-[rgb(104,120,248)]',
        mestrado: 'bg-[rgba(255,223,255,0.4)] text-[rgb(115,58,172)]',
        ativo: 'bg-[rgba(74,222,128,0.4)] text-[rgb(3,100,39)]',
        prorrogated: 'bg-[rgba(235,165,62,0.4)] text-[rgb(122,74,2)]',
        inativo: 'bg-[rgba(201,198,198,0.4)] text-[rgb(105,105,105)]',
        finished: 'bg-[rgba(248,113,113,0.4)] text-[rgb(109,2,2)]',
        default: 'bg-muted text-muted-foreground'
      }
    },
    defaultVariants: {
      tone: 'default'
    }
  }
)

type ChipTone = NonNullable<
  Parameters<typeof chipVariants>[0]
>['tone']

const TONE_BY_KEY: Record<string, ChipTone> = {
  'agency-outras': 'outras',
  'agency-cnpq': 'cnpq',
  'agency-capes': 'capes',
  'agency-fapesb': 'fapesb',
  'program-doutorado': 'doutorado',
  'program-mestrado': 'mestrado',
  'status-inactive': 'inativo',
  'status-on_going': 'ativo',
  'status-extended': 'prorrogated',
  'status-finished': 'finished',
  'user-status-active': 'ativo',
  'user-status-inactive': 'inativo'
}

export default function CustomChip(props: CustomChipProps) {
  const { type, value } = props

  const tone = TONE_BY_KEY[`${type}-${value}`.toLowerCase()] ?? 'default'

  const getLabel = () => {
    if (type === 'status') return getScholarshipStatusLabel(value).toUpperCase()
    if (type === 'user-status') return getUserStatusLabel(value).toUpperCase()

    return value.toUpperCase()
  }

  return <span className={cn(chipVariants({ tone }))}>{getLabel()}</span>
}
