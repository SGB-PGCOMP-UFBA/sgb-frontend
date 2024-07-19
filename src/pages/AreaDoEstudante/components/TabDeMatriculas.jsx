import React from 'react'
import PropTypes from 'prop-types'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { TabPanelDeMatricula } from './TabPanelDeMatricula';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${index}`}
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: 1 }}>{children}</Box>}
    </div>
  );
}

function TabDeMatriculas(props) {
  const { student } = props

  const [tableIndex, setTableIndex] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setTableIndex(newValue);
  };

  return (
    <Box width="100%" height="100% !important">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tableIndex} onChange={handleChangeTab}>
          {student.enrollments.map((enrollment, index) => (
            <Tab
              id={`tab-${index}`}
              key={index}
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '0.925rem' }}>{enrollment.enrollment_number}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.750rem' }}>{enrollment.enrollment_program}</Typography>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {student.enrollments.map((enrollment, index) => (
        <TabPanel key={enrollment.enrollment_number} index={index} value={tableIndex}>
          <TabPanelDeMatricula enrollment={enrollment} advisors={props.advisors} agencies={props.agencies} />
        </TabPanel>
      ))}

    </Box>
  )
}

TabDeMatriculas.prototypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
}

export { TabDeMatriculas }
