const baseUrl = "http://localhost:3001";

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
}

const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      console.log("Raw response from backend:", res);

      if (!res.ok) throw new Error("Failed to fetch items");
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      return []; // ← return empty array explicitly
    });
};

function postItems({ name, weather, imageUrl }) {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(handleServerResponse);
}

function deleteItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
}

function updateProfile(name, avatar, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

// const fetchClothingItems = () => {
//   const token = localStorage.getItem("jwt");
//   return fetch(`${baseUrl}/items`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }).then((res) => {
//     if (!res.ok) {
//       throw new Error("Failed to fetch clothing items");
//     }
//     return res.json();
//   });
// };

export { login, getItems, postItems, deleteItems, updateProfile };
