import { GridToolbarContainer } from '@mui/x-data-grid'
import {
  GridToolbarColumnsButtonCompat,
  GridToolbarDensitySelectorCompat,
  GridToolbarExportCompat
} from '../gridCompat'

function DataGridToolBar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButtonCompat />
      <GridToolbarDensitySelectorCompat />
      <GridToolbarExportCompat />
    </GridToolbarContainer>
  )
}

export default DataGridToolBar
