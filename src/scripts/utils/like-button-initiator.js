import { likeButtonCreator, likedButtonCreator } from '../views/templates/template-creator'

const likeButtonInitiator = {
  async init ({ likeButtonElement, favoriteRestaurants, restaurant }) {
    this._likeButtonElement = likeButtonElement
    this._restaurant = restaurant
    this._favoriteRestaurants = favoriteRestaurants

    await this._renderButton()
  },

  async _renderButton () {
    const { id } = this._restaurant

    if (await this._isRestaurantExist(id)) {
      this._renderLiked()
    } else {
      this._renderLike()
    }
  },

  async _isRestaurantExist (id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id)
    return !!restaurant
  },

  _renderLike () {
    this._likeButtonElement.innerHTML = likeButtonCreator()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant)
      this._renderButton()
    })
  },

  _renderLiked () {
    this._likeButtonElement.innerHTML = likedButtonCreator()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id)
      this._renderButton()
    })
  }
}

export default likeButtonInitiator
