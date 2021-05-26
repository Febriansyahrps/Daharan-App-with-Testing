class favoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurants, view }) {
        this._view = view
        this._listenToSearchRequestByUser()
        this._favoriteRestaurants = favoriteRestaurants
    }

    _showFoundRestaurant(restaurants) {
        this._view.showFavoriteRestaurants(restaurants)
    }

    _listenToSearchRequestByUser() {
        this._view.runWhenUserIsSearching((latestQuery) => {
            this._searchRestaurants(latestQuery)
        })
    }

    async _searchRestaurants(latestQuery) {
        this._latestQuery = latestQuery.trim()
        
        let foundRestaurant
        if (this._latestQuery.length > 0) {
            foundRestaurant = await this._favoriteRestaurants.searchRestaurants(this.latestQuery)
        }else {
            foundRestaurant = await this._favoriteRestaurants.getAllRestaurants()
        }
        this._showFoundRestaurant(foundRestaurant)
    }

    get latestQuery() {
        return this._latestQuery
    }
}

export default favoriteRestaurantSearchPresenter