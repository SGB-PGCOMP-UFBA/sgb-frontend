import React from 'react'
import PropTypes from 'prop-types'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { TabPanelDeMatricula } from './TabPanelDeMatricula';

function TabPanel(props) {
  const { children, value, index, ...other } = props

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
  const { student, enrollmentTabIndex, handleChangeEnrollmentTab } = props

  const enrollments = student.enrollments.sort((a, b) => a.id - b.id)

  return (
    <Box width="100%">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={enrollmentTabIndex} onChange={handleChangeEnrollmentTab}>
          {enrollments.map((enrollment, index) => (
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

      {enrollments.length === 0 ? (
        <Typography variant="subtitle2" align="center">Parece que você não está matriculado em nenhum curso!</Typography>
      ) : (
        enrollments.map((enrollment, index) => (
          <TabPanel key={enrollment.enrollment_number} index={index} value={enrollmentTabIndex}>
            <TabPanelDeMatricula
              enrollment={enrollment}
              advisors={props.advisors}
              agencies={props.agencies}
              onCreateNewScholarship={props.onCreateNewScholarship}
              onDeleteEnrollment={props.onDeleteEnrollment}
              onDeleteScholarship={props.onDeleteScholarship}
            />
          </TabPanel>
        ))
      )}

    </Box>
  )
}

TabDeMatriculas.prototypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteEnrollment: PropTypes.func,
}

export { TabDeMatriculas }
