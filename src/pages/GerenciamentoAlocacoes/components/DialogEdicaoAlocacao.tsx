import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { SlideUp } from '../../../components/Transitions/SlideUp'
import type { UpdateAllocationPayload } from '../../../api/allocation'
import type { AllocationDetailed } from '../../../types'
import { readFormValues } from '../../../helpers/form-values'

interface EdicaoAlocacaoFormValues {
  name: string
}

export interface DialogEdicaoAlocacaoProps {
  item: AllocationDetailed
  isOpen: boolean
  onClose: () => void
  onSubmit: (allocationId: number, allocation: UpdateAllocationPayload) => void
}

function DialogEdicaoAlocacao({ item, isOpen, onClose, onSubmit }: DialogEdicaoAlocacaoProps) {
  const submitAndCloseDialog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newAgencyData = new FormData(event.currentTarget)
    const entries = readFormValues<EdicaoAlocacaoFormValues>(newAgencyData)

    onSubmit(item.id, {
      name: entries.name,
      // masters_degree_awarded_scholarships: Number(entries.masters_degree_awarded_scholarships),
      // doctorate_degree_awarded_scholarships: Number(entries.doctorate_degree_awarded_scholarships)
    })

    onClose()
  }

  const dialogContent = (
    <div className="mt-2 flex w-full min-w-[395px] max-w-[595px] flex-col space-y-4">
      <TextField
        // disabled
        required
        fullWidth
        id="name"
        label="Nome"
        type="text"
        name="name"
        defaultValue={item.name}
        placeholder="Insira o nome da alocação"
        inputProps={{ maxLength: 80 }}
      />

      {/* <TextField
        fullWidth
        id="masters_degree_awarded_scholarships"
        name="masters_degree_awarded_scholarships"
        label="Bolsas Concedidas Para o Mestrado"
        type="number"
        defaultValue={item.masters_degree_awarded_scholarships}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            min: 0,
            step: 1,
          },
        }}
      />

      <TextField
        id="doctorate_degree_awarded_scholarships"
        name="doctorate_degree_awarded_scholarships"
        label="Bolsas Concedidas Para o Doutorado"
        type="number"
        defaultValue={item.doctorate_degree_awarded_scholarships}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputProps: {
            min: 0,
            step: 1,
          },
        }}
      /> */}
    </div>
  )

  const dialogActions = (
    <div className="flex items-center gap-x-4">
      <Button onClick={onClose} variant="text" color="info" size="small">
        Cancelar
      </Button>
      <Button type="submit" autoFocus variant="contained" color="success" size="small">
        Salvar
      </Button>
    </div>
  )

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => submitAndCloseDialog(event)
      }}
      TransitionComponent={SlideUp}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Editar Alocação</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>{dialogActions}</DialogActions>
    </Dialog>
  )
}

export { DialogEdicaoAlocacao }
