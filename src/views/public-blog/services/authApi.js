export async function fetchUserIsAuthenticated() {
  const res = await fetch(`/api/v1/users/is-logged-in`, {
    credentials: 'include',
  });

  const json = await res.json();
  return json;
}
