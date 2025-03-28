const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function postItems() {
  return fetch(
    `${baseUrl}/items`,
    {
      method: "POST",
      body: JSON.stringify({
        name: items.name,
        imageUrl: items.imageUrl,
        weather: items.weather,
      }),
      headers: {
        "Content-Type": application / json,
      },
    }.then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
  );
}

function deleteItems() {
  return fetch(
    `${baseUrl}/items`,
    {
      method: "DELETE",
      body: JSON.stringify({
        name: items.name,
        imageUrl: items.imageUrl,
        weather: items.weather,
      }),
      headers: {
        "Content-Type": application / json,
      },
    }.then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
  );
}

export { getItems, postItems };
