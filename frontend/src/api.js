import axios from 'axios';
import { logout } from './shared/utils/auth';
import { showAlertMessage } from './store/reducers/alertReducer';

const apiClient = axios.create({
  baseURL: 'http://localhost:5002/api',
  // baseURL: 'https://connect-easy-rid.herokuapp.com/api',
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

export const getMe = async () => {
  try {
    return await apiClient.get('/auth/getMe');
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// checks token again and resets password if valid
export const resetPassword = async (data) => {
  try {
    return await apiClient.post('/password/reset', data);
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// sends email address to backend to send reset password link
export const resetPasswordLink = async (data) => {
  try {
    return await apiClient.post('/password', data);
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};
// checks if token is valid before resetting password
export const checkTokenForPasswordReset = async ({ email, token }) => {
  try {
    return await apiClient.get(`/password/${email}/${token}`);
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

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

// get existing appointments for specific consultantId
export const getAllAppointments = async (consultantId) => {
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

// get user profile
export const getUserProfile = async () => {
  try {
    return await apiClient.get('/user/profile');
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// update user profile
export const updateUserProfile = async (userData) => {
  try {
    // if imageFile is not null, then upload image
    if (userData.imageFile) {
      // issue GET request to get the presigned image url
      const uploadConfig = await apiClient.get(
        'http://localhost:5002/api/upload'
      );

      /**
       * uploadConfig.data.url is the presigned image url
       * data:
            key: "62c9b78173c3d270c8046ccc/b11f7144-fc10-457b-a49a-2d55ada2bd74.jpeg"
            url: "https://connect-easy-images.s3.amazonaws.com/62c9b78173c3d270c8046ccc/b11f7144-fc10-457b-a49a-2d55ada2bd74.jpeg?AWSAccessKeyId=AKIATQQMCFC4KW5T66WC&Content-Type=jpeg&Expires=1657444177&Signature=D%2FbILCtNDjOHvTyCP092fzawplk%3D"
            [[Prototype]]: Object
      */

      // upload image to the presigned url
      await axios.put(uploadConfig.data.url, userData.imageFile, {
        headers: {
          'Content-Type': userData.imageFile.type, // specify the content type of the file for the security.
        },
      });

      userData.imageUrl = uploadConfig.data.key;
    }

    return await apiClient.patch('/user/edit', userData);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

// avatar upload
export const submitImage = async (imageFile) => {
  try {
    // issue GET request to get the presigned image url
    const uploadConfig = await apiClient.get(
      'http://localhost:5002/api/upload'
    );

    /**
     * uploadConfig.data.url is the presigned image url
     * data:
          key: "62c9b78173c3d270c8046ccc/b11f7144-fc10-457b-a49a-2d55ada2bd74.jpeg"
          url: "https://connect-easy-images.s3.amazonaws.com/62c9b78173c3d270c8046ccc/b11f7144-fc10-457b-a49a-2d55ada2bd74.jpeg?AWSAccessKeyId=AKIATQQMCFC4KW5T66WC&Content-Type=jpeg&Expires=1657444177&Signature=D%2FbILCtNDjOHvTyCP092fzawplk%3D"
          [[Prototype]]: Object
     */

    // upload image to the presigned url
    await axios.put(uploadConfig.data.url, imageFile, {
      headers: {
        'Content-Type': imageFile.type, // specify the content type of the file for the security.
      },
    });

    // update user profile with the image url
    const response = await apiClient.patch('/user/edit', {
      imageUrl: uploadConfig.data.key,
    });

    return response.data;

    // issue POST request to upload the image to the presigned url
    // if anything goes wrong, redirect to error page
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

export const postStartMeeting = async (appointmentData) => {
  try {
    return await apiClient.post(
      `/appointment/postStartMeeting`,
      appointmentData
    );
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};

export const postEndMeeting = async (appointmentData) => {
  try {
    console.log('FROM API.JS', appointmentData);
    return await apiClient.post(`/appointment/postEndMeeting`, {
      appointmentId: appointmentData,
    });
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response.data,
    };
  }
};
