/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import reducer from './reducer' // eslint-disable-line

import {
  actions,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  GET_STUDENTS_BEGIN,
  GET_STUDENTS_SUCCESS,
  GET_STUDENTS_ERROR,
  GET_ADVISORS_BEGIN,
  GET_ADVISORS_SUCCESS,
  GET_ADVISORS_ERROR,
  CHANGE_PAGE,
  HANDLE_CHANGE,
  GET_EXPIRED_STUDENTS_SUCCESS,
  GET_EXPIRED_STUDENTS_ERROR,
  GET_EXPIRED_STUDENTS_BEGIN,
  EXTEND_END_DATE_BEGIN,
  EXTEND_END_DATE_SUCCESS,
  EXTEND_END_DATE_ERROR
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const roles = localStorage.getItem('role')
const username = localStorage.getItem('name')
const userId = localStorage.getItem('id')

const initialState = {
  isLoading: false,
  showAlert: false,
  showToast: false,
  alertType: '',
  alertText: '',
  expandSidebar: true,
  id: userId || 0,
  user: user || null,
  token: token || '',
  userRole: roles || '',
  name: username || '',
  agencys: [],
  students: [],
  advisors: [],
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,
  itemsPerPage: 0,
  itemCount: 0,
  allItems: 'Todos',
  courseType: '',
  courseOptions: ['Mestrado', 'Doutorado'],
  scholarshipDate: '',
  scholarshipOptions: ['Bolsas recentes', 'Bolsas próximas de encerrar'],
  sort: '',
  sortOptions: ['A-Z', 'Z-A'],
  selectedItem: ''
}

const AppContext = React.createContext()

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT, payload: 'Por favor, preencha todos os campos' })
    clearAlert()
  }

  const displayFormAlert = (text) => {
    dispatch({ type: DISPLAY_ALERT, payload: text })
    clearAlert()
  }

  const addUserToLocalStorage = (taxId, accessToken, userRole, userName, id) => {
    localStorage.setItem('user', JSON.stringify(taxId))
    localStorage.setItem('token', accessToken)
    localStorage.setItem('role', userRole)
    localStorage.setItem('name', userName)
    localStorage.setItem('id', id)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, currentUser)
      const { tax_id, access_token, role, name, id } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { tax_id, access_token, role, name, id }
      })
      addUserToLocalStorage(tax_id, access_token, role, name, id)
    } catch (error) {
      if (!error?.response) {
        dispatch({ type: LOGIN_USER_ERROR, payload: 'Sem resposta do servidor' })
      } else if (error?.response?.status === 400) {
        dispatch({ type: LOGIN_USER_ERROR, payload: 'Credenciais inválidas!' })
      } else if (error?.response?.status === 401) {
        dispatch({ type: LOGIN_USER_ERROR, payload: 'Login não autorizado' })
      } else {
        dispatch({ type: LOGIN_USER_ERROR, payload: 'Erro inesperado. Tente novamente' })
      }
    }
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const getStudents = async () => {
    dispatch({ type: GET_STUDENTS_BEGIN })

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/student`)
      dispatch({
        type: GET_STUDENTS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({ type: GET_STUDENTS_ERROR, payload: 'Falha ao carregar a lista de estudantes.' })
    }

    clearAlert()
  }

  const getAgencys = async () => {
    dispatch({ type: actions.agency.getAll.GET_AGENCYS_BEGIN })

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/agency`)
      dispatch({
        type: actions.agency.getAll.GET_AGENCYS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: actions.agency.getAll.GET_AGENCYS_ERROR,
        payload: 'Falha ao carregar a lista de agências.'
      })
    }

    clearAlert()
  }

  const deleteAgency = async (id) => {
    dispatch({ type: actions.agency.delete.DELETE_AGENCY_BEGIN })

    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/agency/${id}`)
      dispatch({
        type: actions.agency.delete.DELETE_AGENCY_SUCCESS,
        payload: 'Agência excluída com sucesso.'
      })
    } catch (error) {
      dispatch({
        type: actions.agency.delete.DELETE_AGENCY_ERROR,
        payload: 'Falha ao carregar a lista de agências.'
      })
    }

    clearAlert()
  }

  const getAdvisors = async () => {
    dispatch({ type: GET_ADVISORS_BEGIN })

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/advisor`)
      dispatch({
        type: GET_ADVISORS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({ type: GET_ADVISORS_ERROR, payload: 'Falha ao carregar a lista de orientadores.' })
    }

    clearAlert()
  }

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } })
  }

  const handleChange = ({ name, value, id }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value, id } })
  }

  const getExpiredStudents = async () => {
    dispatch({ type: GET_EXPIRED_STUDENTS_BEGIN })
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/students/not-paginate/list/all`
      )
      const expiredStudents = data.filter((student) => student.scholarship.active === false)
      dispatch({ type: GET_EXPIRED_STUDENTS_SUCCESS, payload: expiredStudents })
    } catch (error) {
      dispatch({ type: GET_EXPIRED_STUDENTS_ERROR, payload: 'Erro ao carregar lista de usuários' })
    }
  }

  const getStudentsEndDate = async () => {
    dispatch({ type: GET_STUDENTS_BEGIN })

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/students/not-paginate/list/all`
      )
      const studentList = data
        .sort((a, b) => {
          return (
            new Date(a.scholarship.scholarship_ends_at) -
            new Date(b.scholarship.scholarship_ends_at)
          )
        })
        .filter((student) => student.scholarship.active === true)
      dispatch({
        type: GET_STUDENTS_SUCCESS,
        payload: studentList
      })
    } catch (error) {
      dispatch({ type: GET_STUDENTS_ERROR, payload: 'Erro ao carregar lista de usuários' })
    }

    clearAlert()
  }

  const getStudentData = async () => {
    dispatch({ type: GET_STUDENTS_BEGIN })
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/students/find/byid/${userId}`
      )
      dispatch({ type: GET_STUDENTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_STUDENTS_ERROR, payload: 'Erro ao carregar dados' })
    }
  }

  const extendEndDate = async (scholarshipId, endDate) => {
    dispatch({ type: EXTEND_END_DATE_BEGIN })
    const formatDate = endDate.split('-').join('/')
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/scholarship/${scholarshipId}/update/end/`,
        { newFinalDate: formatDate }
      )
      dispatch({
        type: EXTEND_END_DATE_SUCCESS,
        payload: 'Data de término estendida com sucesso.'
      })
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    } catch (error) {
      if (error?.response?.status === 400) {
        displayFormAlert('A nova data deve ser posterior à data de término atual')
        dispatch({ type: EXTEND_END_DATE_ERROR })
      } else {
        displayFormAlert('Erro ao estender data de término')
        dispatch({ type: EXTEND_END_DATE_ERROR })
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        loginUser,
        logoutUser,
        toggleSidebar,
        getStudents,
        changePage,
        handleChange,
        getExpiredStudents,
        getStudentsEndDate,
        displayFormAlert,
        getStudentData,
        extendEndDate,
        getAdvisors,
        getAgencys,
        deleteAgency
      }}
    >
      {children}
    </AppContext.Provider>
  ) // eslint-disable-line
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
