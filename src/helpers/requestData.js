export async function postData(url, data, token = null) {
  let headers
  if (token) {
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  } else {
    headers = {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function getData(url, token = null) {
  let headers
  if (token) {
    headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  } else {
    headers = {
      'Accept': 'application/json'
    }
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });
  return response.json();
}