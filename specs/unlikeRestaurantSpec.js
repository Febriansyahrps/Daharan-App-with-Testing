import likeRestaurantIdb from "../src/scripts/data/restaurant-idb"
import * as TestFactories from './helpers/testFactories'

const addLikeButtonContainer = () => {  
    document.body.innerHTML = '<div id="likeButtonContainer"></div>'
}

describe('unliking a restaurant', () => {
    beforeEach(async () => {
        addLikeButtonContainer()
        await likeRestaurantIdb.putRestaurant({ id: 1 })
    })

    afterEach(async () => {
        await likeRestaurantIdb.deleteRestaurant(1)
    })

    it('should display unlike widget when the restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestorant({ id: 1 })

        expect(document.querySelector('[aria-label="unlike this restaurant"]'))
            .toBeTruthy()
    })

    it('should not display like widget when restaurant has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestorant({ id: 1 })

        expect(document.querySelector('[aria-label="like this restaurant"]'))
            .toBeFalsy()
    })

    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestorant({ id: 1 })

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

        expect(await likeRestaurantIdb.getAllRestaurants()).toEqual([])
    })

    it('should not throw error if the unliked restaurant is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestorant({ id: 1 })

        await likeRestaurantIdb.deleteRestaurant(1)

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

        expect(await likeRestaurantIdb.getAllRestaurants()).toEqual([])
    })
})