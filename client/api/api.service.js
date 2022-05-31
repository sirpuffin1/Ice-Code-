export const apiService = {
    baseUrl: "http://localhost:3001/",
    get(url) {
      return fetch(this.baseUrl + url).then((res) => res.json());
    },
    post(url, data) {
      return fetch(this.baseUrl + url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
    },
    put(url, data) {
      return fetch(this.baseUrl + url, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    },
    delete(url, data) {
      return fetch(this.baseUrl + url, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json",
        }
      }).then((res) => res.json())
    }
  };