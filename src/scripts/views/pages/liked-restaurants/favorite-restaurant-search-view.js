import { restaurantItemTemplate } from "../../templates/template-creator"

class favoriteRestaurantSearchView {
    getTemplate() {
        return `
            <h1 id="main-content" class="main_title">Favorite Restaurants</h1>
            <hr class="main_line">
            <div class="search_form">
                <input id="query" class="search_box" type="text" placeholder="Search Favorite Restaurants..." label="Search Restaurants">
            </div>
            <div class="articles">
                <div id="restaurants" class="article-list"></div>
            </div>
        `
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value)
        })
    }

    showFavoriteRestaurants(restaurants = []) {
        let html
        if (restaurants.length) {
            html = restaurants.reduce((carry, restaurant) => carry.concat(restaurantItemTemplate(restaurant)), '')
        } else {
            html = this._getEmptyRestaurantTemplate()
        }
        document.getElementById('restaurants').innerHTML = html
        document.getElementById('restaurants').dispatchEvent(new Event('articles:updated'))
    }

    _getEmptyRestaurantTemplate() {
        return `<div class="restaurant-item_not_found">Restaurant Not Found</div>`
    }
}

export default favoriteRestaurantSearchView