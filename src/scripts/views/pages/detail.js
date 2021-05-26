import likeRestaurantIdb from '../../data/restaurant-idb'
import RestaurantSource from '../../data/restaurant-source'
import urlParser from '../../routes/url-parser'
import likeButtonInitiator from '../../utils/like-button-initiator'
import { notFoundPageCreator, restaurantDetailTemplate } from '../templates/template-creator'

const Detail = {
  async render () {
    return `
      <div class="articles">
        <div id="restaurant" class="article-item"></div>
        <div id="likeButtonContainer"></div>
        <div id= "restaurant-not-found"></div>
      </div>
    `
  },

  async afterRender () {
    try {
      const url = urlParser.parseActiveWithoutCombiner()
      const restaurant = await RestaurantSource.Detail(url.id)
      const restaurantContainer = document.querySelector('#restaurant')
      restaurantContainer.innerHTML = restaurantDetailTemplate(restaurant)
      this._postReview(url)

      likeButtonInitiator.init({
        likeButtonElement: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: likeRestaurantIdb,
        restaurant: {
          id: restaurant.id,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          name: restaurant.name,
          address: restaurant.address,
          categories: restaurant.categories,
          description: restaurant.description,
          menus: restaurant.menus,
          rating: restaurant.rating,
          customerReviews: restaurant.customerReviews
        }
      })
    } catch (error) {
      const notFoundElement = document.querySelector('#restaurant-not-found')
      notFoundElement.style.display = 'block'
      let errorMessage
      if (error.message === 'Failed to fetch') {
        errorMessage = 'Please Check Your Connection !'
      } else {
        errorMessage = 'Sorry, Restaurant not Found'
      }
      notFoundElement.innerHTML = notFoundPageCreator(errorMessage)
    }
  },

  _postReview (url) {
    const postReviewButton = document.querySelector('#postReview')
    const reviewerNameInput = document.querySelector('#nameReview')
    const reviewerTextInput = document.querySelector('#textReview')
    postReviewButton.addEventListener('click', () => {
      const customerReviews = {
        id: url.id,
        name: reviewerNameInput.value,
        review: reviewerTextInput.value
      }
      RestaurantSource.Review(customerReviews)
    })
  }
}

export default Detail
