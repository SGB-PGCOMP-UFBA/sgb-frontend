import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoEstudantesView } from './GerenciamentoEstudantesView'

function GerenciamentoEstudantes() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getStudents = async () => {
    const response = await api.student.getStudents()

    if (response.status === 200) {
      setStudents(response.data)
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  const updateStudent = async (studentId, student) => {
    const response = await api.student.updateStudent(studentId, student)

    if (response.status === 200) {
      toast.success('Estudante atualizado(a) com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getStudents()
  }

  const deleteStudent = async (student) => {
    const response = await api.student.deleteStudent(student)

    if (response.status === 204) {
      toast.success('Estudante excluído(a) com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }

    await getStudents()
  }

  const resetStudentPassword = async (payload) => {
    const response = await api.password.resetPassword(payload)

    if ([200, 201].includes(response.status)) {
      toast.success('Senha resetada com sucesso.')
    } else {
      toast.error(`[${response.status}]: ${response.data.error}`)
    }
  }

  useEffect(() => {
    getStudents().finally(() => setIsLoading(false))
  }, [])

  return (
    <GerenciamentoEstudantesView
      isLoading={isLoading}
      data={students}
      onUpdate={updateStudent}
      onDelete={deleteStudent}
      onResetPassword={resetStudentPassword}
    />
  )
}

export { GerenciamentoEstudantes }
