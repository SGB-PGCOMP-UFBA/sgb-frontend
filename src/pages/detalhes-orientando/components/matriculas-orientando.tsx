import { CustomChip } from '@/components'
import { DetailSection } from '@/components/detail-section'
import { InfoItem } from '@/components/info-item'
import {
  formatBrazilianCurrency,
  formatCalendarDate,
} from '@/helpers/formatters.helper'
import type { EnrollmentDetailedWithFullRelations } from '@/types'

const NOT_INFORMED = 'Não informado'
const GRID_CLASS =
  'grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3'

function chip(value: string | undefined, type: 'agency' | 'program' | 'status') {
  if (!value) return NOT_INFORMED

  return (
    <span className='inline-block'>
      <CustomChip value={value} type={type} />
    </span>
  )
}

export interface MatriculasOrientandoProps {
  enrollments: EnrollmentDetailedWithFullRelations[]
}

function MatriculasOrientando({ enrollments }: MatriculasOrientandoProps) {
  if (enrollments.length === 0) {
    return (
      <DetailSection title='Matrículas' className='mt-4'>
        <p className='text-sm text-gray-500'>Nenhuma matrícula cadastrada.</p>
      </DetailSection>
    )
  }

  return (
    <>
      {enrollments.map(enrollment => (
        <DetailSection
          key={enrollment.id}
          title={`Matrícula ${enrollment.enrollment_number.trim()}`}
          className='mt-4'
        >
          <dl className={GRID_CLASS}>
            <InfoItem
              label='Curso'
              value={chip(enrollment.enrollment_program, 'program')}
            />
            <InfoItem
              label='Data da matrícula'
              value={formatCalendarDate(enrollment.enrollment_date)}
            />
            <InfoItem
              label='Previsão de defesa'
              value={
                enrollment.defense_prediction_date
                  ? formatCalendarDate(enrollment.defense_prediction_date)
                  : NOT_INFORMED
              }
            />
          </dl>

          <h3 className='mb-3 mt-6 text-sm font-semibold text-gray-900'>
            Bolsas
          </h3>
          {enrollment.scholarships.length === 0 ? (
            <p className='text-sm text-gray-500'>
              Nenhuma bolsa vinculada a esta matrícula.
            </p>
          ) : (
            <ul className='space-y-4'>
              {enrollment.scholarships.map(scholarship => (
                <li
                  key={scholarship.id}
                  className='rounded-lg border border-gray-100 p-4'
                >
                  <dl className={GRID_CLASS}>
                    <InfoItem
                      label='Agência'
                      value={chip(scholarship.agency?.name, 'agency')}
                    />
                    <InfoItem
                      label='Situação'
                      value={chip(scholarship.status, 'status')}
                    />
                    <InfoItem
                      label='Alocação'
                      value={scholarship.allocation?.name ?? NOT_INFORMED}
                    />
                    <InfoItem
                      label='Início'
                      value={formatCalendarDate(
                        scholarship.scholarship_starts_at
                      )}
                    />
                    <InfoItem
                      label='Término'
                      value={formatCalendarDate(scholarship.scholarship_ends_at)}
                    />
                    <InfoItem
                      label='Extensão até'
                      value={
                        scholarship.extension_ends_at
                          ? formatCalendarDate(scholarship.extension_ends_at)
                          : NOT_INFORMED
                      }
                    />
                    <InfoItem
                      label='Valor'
                      value={
                        scholarship.salary !== null
                          ? formatBrazilianCurrency(scholarship.salary)
                          : NOT_INFORMED
                      }
                    />
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </DetailSection>
      ))}
    </>
  )
}

export { MatriculasOrientando }
