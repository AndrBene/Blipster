export async function fetchUserIsAuthenticated() {
  const res = await fetch(
    `http://localhost:3000/api/v1/users/is-logged-in`,
    {
      credentials: 'include',
    },
  );

  const json = await res.json();
  return json;
}
