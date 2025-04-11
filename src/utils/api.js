const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application / json",
    },
  }).then(handleServerResponse);
}

function postItems() {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application / json",
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(handleServerResponse);
}

function deleteItems(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
}

export { getItems, postItems, deleteItems };
