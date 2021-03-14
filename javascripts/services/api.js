class Api {
  static baseUrl = "http://localhost:3000"

  static headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  static async get(path) {
    let resp = await fetch(Api.baseUrl + path, {
      method: "GET",
      headers: Api.headers
    })

    let data = await resp.json();
    return data
  }

  static async post(path, data) {
    let resp = await fetch(Api.baseUrl + path, {
      method: "POST",
      headers: Api.headers,
      body: JSON.stringify(data)
    })
  
    let data = await resp.json();

    return data;
  }
}