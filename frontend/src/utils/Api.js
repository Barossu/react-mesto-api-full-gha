class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  };
  
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  };

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  };

  
  getInitialCards() {
    return this._request(`${this._baseURL}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  getProfileInfo(){
    return this._request(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      } });
  };
  
  postNewCard(name, link){
    return this._request(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  };

  patchProfileInfo(profileName, profileInfo){
    return this._request(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileInfo
      })
    });
  };

  patchProfileAvatar(avatarLink){
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  };

  toggleLike(cardId, isLiked){
    return this._request(`${this._baseURL}/cards/${cardId}/likes`, { method: isLiked ? 'DELETE' : 'PUT', headers: this._headers });
  };

  deleteCard(cardId){
    return this._request(`${this._baseURL}/cards/${cardId}`, { method: 'DELETE', headers: this._headers });
  };
}

const api = new Api({
  baseURL: 'https://api.mesto.kalashnikovpv.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api