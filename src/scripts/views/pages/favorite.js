import likeRestaurantIdb from '../../data/restaurant-idb'
import favoriteRestaurantSearchView from '../pages/liked-restaurants/favorite-restaurant-search-view'
import favoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter'
import favoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter'

const view = new favoriteRestaurantSearchView

const Favorite = {
  async render () {
    return view.getTemplate()
  },

  async afterRender () {
    new favoriteRestaurantShowPresenter({ view, favoriteRestaurants : likeRestaurantIdb })
    new favoriteRestaurantSearchPresenter({ view, favoriteRestaurants : likeRestaurantIdb })
  }
}

export default Favorite
