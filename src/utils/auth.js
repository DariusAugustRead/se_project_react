const baseUrl = "http://localhost:3001";

export const register = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const login = (email, password) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("login failed");
  });
};

export const logout = () => {
  return fetch(`${baseUrl}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log("checkToken response:", res);
    return res;
  });
};
