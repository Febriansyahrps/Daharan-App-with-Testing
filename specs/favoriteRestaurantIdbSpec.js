import likeRestaurantIdb from '../src/scripts/data/restaurant-idb'
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract'

describe('favorite restaurant idb contract test implementation', () => {
    afterEach(async () => {
        (await likeRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
            await likeRestaurantIdb.deleteRestaurant(restaurant.id)
        })
    })

    itActsAsFavoriteRestaurantModel(likeRestaurantIdb)
})