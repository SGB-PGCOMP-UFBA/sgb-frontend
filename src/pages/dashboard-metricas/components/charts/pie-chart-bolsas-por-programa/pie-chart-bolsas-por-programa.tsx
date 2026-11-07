import { useCallback } from 'react'
import { api } from '@/services'
import type { CountByAgencyAndCourse } from '@/services/scholarship'
import { useApiData } from '@/hooks/use-api-data'
import type { EnrollmentProgram, ScholarshipStatus } from '@/types'
import { toPieData } from '@/pages/dashboard-metricas/components/charts/chart-data.util'
import { PieChartBolsasPorProgramaView } from './pie-chart-bolsas-por-programa.view'

const EMPTY_COUNT: CountByAgencyAndCourse = {}

export interface PieChartBolsasPorProgramaProps {
  program: EnrollmentProgram
  scholarshipStatus?: ScholarshipStatus
  className?: string
}

function PieChartBolsasPorPrograma(props: PieChartBolsasPorProgramaProps) {
  const { program, scholarshipStatus, className } = props

  const request = useCallback(
    () =>
      api.scholarship.countScholarshipsGroupingByAgencyForCourse(
        program,
        scholarshipStatus ?? null
      ),
    [program, scholarshipStatus]
  )
  const { data, isLoading } = useApiData(request, EMPTY_COUNT)

  return (
    <PieChartBolsasPorProgramaView
      className={className}
      isLoading={isLoading}
      program={program}
      isFinished={scholarshipStatus === 'FINISHED'}
      slices={toPieData(data[program])}
    />
  )
}

export { PieChartBolsasPorPrograma }
