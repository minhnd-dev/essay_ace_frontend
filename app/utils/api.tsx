

export default function fetchWithToken(url: string, options: any) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
}