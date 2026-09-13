import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { formatDate, toPascalCase } from '../../../helpers/formatters'
import type { StudentDetailedWithFullRelations } from '../../../types'

export interface DialogVisualizacaoBolsasProps {
  item: StudentDetailedWithFullRelations
  isOpen: boolean
  onClose: () => void
}

const displayDate = (value: string | null): string =>
  value !== null ? formatDate(value) : ''

function DialogVisualizacaoBolsas({ item, isOpen, onClose }: DialogVisualizacaoBolsasProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[695px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col gap-6">
          {item.enrollments.map((enrollment, index) => (
            <div key={index} className="flex w-full flex-col">
              <h3 className="text-base font-semibold">
                Matrícula - {enrollment.enrollment_number.trim()}
              </h3>
              <Separator />

              <div className="flex flex-col gap-4">
                <div className="mt-5 flex w-full flex-col gap-2 md:flex-row">
                  <div className="w-full space-y-1.5">
                    <Label htmlFor={`enrollment_program-${index}`}>Curso</Label>
                    <Input
                      readOnly
                      id={`enrollment_program-${index}`}
                      name="enrollment_program"
                      defaultValue={toPascalCase(enrollment.enrollment_program)}
                    />
                  </div>

                  <div className="w-full space-y-1.5">
                    <Label htmlFor={`enrollment_date-${index}`}>Data Primeira Matrícula</Label>
                    <Input
                      readOnly
                      id={`enrollment_date-${index}`}
                      name="enrollment_date"
                      defaultValue={displayDate(enrollment.enrollment_date)}
                    />
                  </div>

                  <div className="w-full space-y-1.5">
                    <Label htmlFor={`defense_prediction_date-${index}`}>
                      Data de Previsão de Defesa
                    </Label>
                    <Input
                      readOnly
                      id={`defense_prediction_date-${index}`}
                      name="defense_prediction_date"
                      defaultValue={displayDate(enrollment.defense_prediction_date)}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-base">Bolsas</h4>

                  <div className="mt-1 flex flex-col rounded-md border border-[#e0e0e0] p-4">
                    {enrollment.scholarships.map((scholarship, scholarshipIndex) => (
                      <div
                        key={scholarshipIndex}
                        className={
                          scholarshipIndex === enrollment.scholarships.length - 1
                            ? 'mt-1 flex w-full flex-col gap-2'
                            : 'mb-8 mt-1 flex w-full flex-col gap-2'
                        }
                      >
                        <div className="flex w-full flex-col gap-2 md:flex-row">
                          <div className="w-full space-y-1.5">
                            <Label htmlFor={`agency-${index}-${scholarshipIndex}`}>
                              Agência de Fomento
                            </Label>
                            <Input
                              readOnly
                              id={`agency-${index}-${scholarshipIndex}`}
                              name="enrollment_program"
                              defaultValue={scholarship.agency?.name ?? ''}
                            />
                          </div>

                          <div className="w-full space-y-1.5">
                            <Label htmlFor={`status-${index}-${scholarshipIndex}`}>Situação</Label>
                            <Input
                              readOnly
                              id={`status-${index}-${scholarshipIndex}`}
                              name="enrollment_program"
                              defaultValue={
                                scholarship.status === 'ON_GOING'
                                  ? 'Em Andamento'
                                  : scholarship.status === 'FINISHED'
                                    ? 'Finalizada'
                                    : 'Extendida'
                              }
                            />
                          </div>
                        </div>

                        <div className="flex w-full flex-col gap-2 md:flex-row">
                          <div className="w-full space-y-1.5">
                            <Label htmlFor={`scholarship_starts_at-${index}-${scholarshipIndex}`}>
                              Data de Início da Bolsa
                            </Label>
                            <Input
                              readOnly
                              id={`scholarship_starts_at-${index}-${scholarshipIndex}`}
                              name="scholarship_starts_at"
                              defaultValue={displayDate(scholarship.scholarship_starts_at)}
                            />
                          </div>

                          <div className="w-full space-y-1.5">
                            <Label htmlFor={`scholarship_ends_at-${index}-${scholarshipIndex}`}>
                              Data de Término da Bolsa
                            </Label>
                            <Input
                              readOnly
                              id={`scholarship_ends_at-${index}-${scholarshipIndex}`}
                              name="scholarship_ends_at"
                              defaultValue={displayDate(scholarship.scholarship_ends_at)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-x-4">
          <Button onClick={onClose} variant="ghost" size="sm">
            Voltar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { DialogVisualizacaoBolsas }
