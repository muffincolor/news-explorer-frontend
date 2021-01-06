class NewsApi {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  registerUser(email, password, name) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({email, password, name})
    }).then((res) => {
      return res.json();
    })
  }

  loginUser(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({email, password})
    }).then((res) => {
      return res.json();
    })
  }

  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: Object.assign(this.headers, {Authorization: `Bearer ${token}`}),
    }).then((res) => {
      return this._getResponseData(res)
    })
  }

  getUserArticles(token) {
    return fetch(`${this.baseUrl}/articles`, {
      method: "GET",
      headers: Object.assign(this.headers, {Authorization: `Bearer ${token}`}),
    }).then((res) => {
      return this._getResponseData(res)
    })
  }

  addArticle(keyword, cardData, token) {
    const {title, description, publishedAt, source, url, urlToImage} = cardData;
    return fetch(`${this.baseUrl}/articles`, {
      method: "POST",
      headers: Object.assign(this.headers, {Authorization: `Bearer ${token}`}),
      body: JSON.stringify({
        keyword,
        title,
        "text": description,
        "date": publishedAt,
        "source": source.name,
        "link": url,
        "image": urlToImage
      })
    }).then((res) => {
      return this._getResponseData(res)
    })
  }

  removeArticle(cardId, token) {
    return fetch(`${this.baseUrl}/articles/${cardId}`, {
      method: "DELETE",
      headers: Object.assign(this.headers, {Authorization: `Bearer ${token}`})
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
  baseUrl: 'http://api.diploma-muffin.students.nomoreparties.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
})
