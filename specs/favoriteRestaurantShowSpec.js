import likeRestaurantIdb from "../src/scripts/data/restaurant-idb"
import favoriteRestaurantSearchView from "../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view"
import favoriteRestaurantShowPresenter from "../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter"

describe('show all favorite restaurant', () => {
    let view

    const renderTemplate = () => {
        view = new favoriteRestaurantSearchView()
        document.body.innerHTML = view.getTemplate()
    }

    beforeEach(() => {
        renderTemplate()
    })

    describe('when no restaurants have been liked', () => {
        it('should ask for the favorite restaurant', () => {
            const favoriteRestaurants = spyOnAllFunctions(likeRestaurantIdb)

            new favoriteRestaurantShowPresenter({
                view, 
                favoriteRestaurants
            })
            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
        })

        it('should show the information that no restaurant have been liked', (done) => {
            document.getElementById('restaurants').addEventListener('articles:updated', () => {
                expect(document.querySelectorAll('.restaurant-item_not_found').length)
                    .toEqual(1)
                done()
            })
            const favoriteRestaurants = spyOnAllFunctions(likeRestaurantIdb)
            favoriteRestaurants.getAllRestaurants.and.returnValues([])

            new favoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants
            })
        })
    })

    describe('when favorite restaurant exist', () => {
        it('should show the restaurant', (done) => {
            document.getElementById('restaurants').addEventListener('articles:updated', () => {
                expect(document.querySelectorAll('.post-item').length)
                    .toEqual(2)
                done()
            })
            const favoriteRestaurants = spyOnAllFunctions(likeRestaurantIdb)
            favoriteRestaurants.getAllRestaurants.and.returnValues([
                {
                    id: 11, name: 'A', city: 'A', description: 'cafe A'
                },
                {
                    id: 22, name: 'B', city: 'B', description: 'cafe B'
                }
            ])
            new favoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants
            })
        })
    })
})
