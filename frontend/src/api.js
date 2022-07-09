import axios from 'axios';
import { logout } from './shared/utils/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:5002/api',
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user');

    if (userDetails) {
      const token = JSON.parse(userDetails).token;

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const login = async (data) => {
  try {
    return await apiClient.post('/auth/login', data);
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// secured routes
const checkResponseCode = (error) => {
  console.log(error);
  const status = error?.response.status;

  if (status) {
    (status === 401 || status === 403) && logout();
  }
};

// queries category list
export const getCategories = async () => {
  try {
    return await apiClient.get('/category');
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// queries consultants list within a specific category
export const getConsultantsWithinCategory = async (categoryName) => {
  try {
    return await apiClient.get(`/category/${categoryName}`);
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// create open appointments
export const setOpenAppointments = async (openAppointmentsList) => {
  try {
    return await apiClient.post('/appointment', openAppointmentsList);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// get existing appointments
export const getOpenedAppointments = async (consultantId) => {
  try {
    return await apiClient.get(`/appointment/${consultantId}`);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// delete existing appointment by id
export const deleteOneAppointmentById = async (appointmentId) => {
  try {
    return await apiClient.delete(`/appointment/${appointmentId}`);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

export const bookAppointment = async (appointmentData) => {
  try {
    return await apiClient.patch(`/appointment/book`, appointmentData);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

export const getAppointmentsForConsultantsByDate = async (
  consultantId,
  date
) => {
  try {
    return await apiClient.get(`/appointment/date/${consultantId}/${date}`);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// get existing appointments for the client
export const getAppointmentsForClientId = async (clientId) => {
  try {
    return await apiClient.get(`/appointment/client/${clientId}`);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

export const cancelBookedAppointment = async (appointmentId) => {
  try {
    return await apiClient.patch(`/appointment/cancel`, appointmentId);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};
