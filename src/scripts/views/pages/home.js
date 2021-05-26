import RestaurantSource from '../../data/restaurant-source'
import { restaurantItemTemplate } from '../templates/template-creator'

const Home = {
  async render () {
    return `
      <div class="hero" aria-label="background image">
        <div class="hero_inner">
          <h1 class="hero_title">Daharan Apps</h1>
          <p class="hero_desc">Search, Eat and Happy</p>
        </div>
      </div>
      <h1 id="main-content" class="main_title">Explore Restaurant</h1>
      <hr class="main_line">
      <div class="articles">
        <div id="restaurants" class="article-list"></div>
      </div>
    `
  },

  async afterRender () {
    const restaurants = await RestaurantSource.Home()
    const restaurantListContainer = document.querySelector('#restaurants')
    restaurants.forEach((restaurant) => {
      restaurantListContainer.innerHTML += restaurantItemTemplate(restaurant)
    })
  }
}

export default Home
