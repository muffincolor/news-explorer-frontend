class NewsApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  getNewsByKeyword(query, from, to, pageSize) {
    return fetch(`${this.baseUrl}/everything?apiKey=b2be50e224f143dc85fc892c8c528c5d&q=${query}&from=${from}&to=${to}&pageSize=${pageSize}`, {
      method: "GET"
    }).then((res) => {
      return this._getResponseData(res)
    })
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }
}

export default new NewsApi({
  baseUrl: 'https://newsapi.org/v2',
  headers: {
    'Content-Type': 'application/json'
  }
})
