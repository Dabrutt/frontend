const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Authentication APIs
export const authAPI = {
  register: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// Users APIs
export const usersAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getChart: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/chart/${id}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  add: async (data) => {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// Progress APIs
export const progressAPI = {
  getOverview: async () => {
    const response = await fetch(`${API_BASE_URL}/progress/overview`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateModule: async (moduleId, data) => {
    const response = await fetch(`${API_BASE_URL}/progress/module/${moduleId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getChart: async () => {
    const response = await fetch(`${API_BASE_URL}/progress/chart`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getModulesBar: async () => {
    const response = await fetch(`${API_BASE_URL}/progress/modules/bar`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Modules APIs
export const modulesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/modules/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (moduleId) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getChapters: async (moduleId) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/chapters`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getChapter: async (moduleId, chapterId) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getSubchapters: async (moduleId, chapterId) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}/subchapters`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getSubchapter: async (moduleId, chapterId, subchapterId) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}/subchapters/${subchapterId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateSubchapter: async (moduleId, chapterId, subchapterId, data) => {
    const response = await fetch(`${API_BASE_URL}/modules/${moduleId}/chapters/${chapterId}/subchapters/${subchapterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// Learning Paths APIs
export const learningPathsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/learning-paths/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getById: async (learningpathId) => {
    const response = await fetch(`${API_BASE_URL}/learning-paths/${learningpathId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Subscriptions (Langganan) APIs
export const subscriptionsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/langganan/`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  add: async (data) => {
    const response = await fetch(`${API_BASE_URL}/langganan/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/langganan/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/langganan/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};
