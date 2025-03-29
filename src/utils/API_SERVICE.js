import axios from 'axios';

const API_BASE_URL = 'https://comeawaybackend.vercel.app/api'; // Adjust the base URL as necessary

// Create an Axios instance with the access token
const createAxiosInstance = (accessToken) => {
  if (!accessToken) {
    throw new Error('Access token is required to create an Axios instance.');
  }

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return instance;
};

const createAxiosInstances = (accessToken) => {
  if (!accessToken) {
    throw new Error('Access token is required to create an Axios instance.');
  }

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return instance;
};

// User API functions
export const login = async (email, password) => {
  const endpoint = '/auth/login';

  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during login:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const signup = async (firstname, lastname, email, password) => {
  const endpoint = '/auth/signup';

  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, { firstname, lastname, email, password });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const forgotPassword = async (email, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/auth/forgetPassword';

  try {
    const response = await axiosInstance.post(endpoint, { email });
    return response.data;
  } catch (error) {
    console.error('Error during forgot password:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const resetPassword = async (resetToken, newPassword, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/users/resetPassword';

  try {
    const response = await axiosInstance.post(endpoint, { resetToken, newPassword });
    return response.data;
  } catch (error) {
    console.error('Error during reset password:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const getAllUsers = async (accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/auth/all-user';

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const updateUserStatus = async (id, status, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/auth/updateStatus/${id}`;

  try {
    const response = await axiosInstance.put(endpoint, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating user status:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const getUserById = async (id, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/auth/getSingleUser/${id}`;

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const updateAdminDetails = async (id, firstname, lastname, email, password, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/auth/admin/update/${id}`;

  try {
    const response = await axiosInstance.put(endpoint, { firstname, lastname, email, password });
    return response.data;
  } catch (error) {
    console.error('Error updating admin details:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

// Category API functions
export const createCategory = async (name, slug, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/categories/create-catagory';

  try {
    const response = await axiosInstance.post(endpoint, { name, slug });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const getCategories = async (accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/categories/getCatagories';

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const getCategoryById = async (id, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/categories/getCatagory/${id}`;

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching category by ID:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const updateCategory = async (id, name, slug, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/categories/updateCatagory/${id}`;

  try {
    const response = await axiosInstance.put(endpoint, { name, slug });
    return response.data;
  } catch (error) {
    console.error('Error updating category:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const deleteCategory = async (id, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/categories/deleteCatagory/${id}`;

  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

// Sound API functions
// Create sound function to handle multipart/form-data
// Create sound function to handle multipart/form-data
export const createSound = async (formData, accessToken) => {
  const axiosInstance = createAxiosInstances(accessToken);
  const endpoint = '/sounds/add-sounds';

  try {
    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating sound:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const getSounds = async (accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/sounds/getSounds';

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching sounds:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const getSoundById = async (id, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/sounds/getSingleSound/${id}`;

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching sound by ID:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const updateSound = async (id, formData, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/sounds/updateSound/${id}`;

  try {
    const response = await axiosInstance.put(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating sound:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

export const deleteSound = async (id, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/sounds/deleteSound/${id}`;

  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting sound:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};

// Subscription API functions
export const getUserSubscriptionDetails = async (userId, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/subscription/subscription-details/${userId}`;

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching subscription by user ID:', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};
export const getAllUsersSubscription = async (accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = `/subscription/admin/all-subscriptions`;

  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching All User Subscription Detail :', {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};