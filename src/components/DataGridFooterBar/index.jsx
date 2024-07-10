import React from 'react'
import { useGridApiContext, GridPagination } from '@mui/x-data-grid'

import { Box, Button, Divider } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function DataGridFooterBar() {
  const apiRef = useGridApiContext();

  const handleExportCsv = () => {
    apiRef.current.exportDataAsCsv();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end" width="100%">
      <Divider style={{ width: '100%' }} />
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Button variant="outlined" onClick={handleExportCsv} style={{ marginLeft: '0.6rem' }}>
          Baixar como CSV
          <FileDownloadIcon style={{ marginLeft: '0.6rem' }} />
        </Button>
        <GridPagination />
      </Box>
    </Box>
  )
}

export default DataGridFooterBar
