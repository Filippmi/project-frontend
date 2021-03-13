class Api {
  static baseUrl = "http://localhost:3000"

  static headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  static get(path) {
    return fetch(Api.baseUrl + path, {
      method: "GET",
      headers: Api.headers
    })
  }

  static post(path) {
    return fetch(Api.baseUrl + path, {
      method: "POST",
      headers: Api.headers,
      body: JSON.stringify(data)
    })
    
  }
}