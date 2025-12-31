export const requestInterceptor = (config: RequestInit): RequestInit => {
  // Add auth token to headers
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

export const responseInterceptor = async (response: Response): Promise<Response> => {
  // Handle common errors
  if (response.status === 401) {
    // Handle unauthorized
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }
  return response;
};
