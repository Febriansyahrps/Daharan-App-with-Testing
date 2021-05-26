import likeRestaurantIdb from "../../src/scripts/data/restaurant-idb"
import likeButtonInitiator from "../../src/scripts/utils/like-button-initiator"

const createLikeButtonPresenterWithRestorant = async (restaurant) => {
    await likeButtonInitiator.init({
        likeButtonElement: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: likeRestaurantIdb,
        restaurant
    })
}

export { createLikeButtonPresenterWithRestorant }