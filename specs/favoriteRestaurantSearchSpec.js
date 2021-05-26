import likeRestaurantIdb from "../src/scripts/data/restaurant-idb"
import favoriteRestaurantSearchPresenter from "../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter"
import favoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view'

describe('searching restaurants', () => {
    let presenter
    let favoriteRestaurants
    let view

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('query')
        queryElement.value = query
        queryElement.dispatchEvent(new Event('change'))
    }

    const setRestaurantSearchContainer = () => {
        view = new favoriteRestaurantSearchView()
        document.body.innerHTML = view.getTemplate()
    }

    const constructPresenter = () => {
        favoriteRestaurants = spyOnAllFunctions(likeRestaurantIdb)
        presenter = new favoriteRestaurantSearchPresenter({ 
            favoriteRestaurants, 
            view 
        })
    }

    beforeEach(() => {
        setRestaurantSearchContainer()
        constructPresenter()
    })

    describe('when query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurants('cafe a')
    
            expect(presenter.latestQuery)
                .toEqual('cafe a')
        })
    
        it('should ask the model to search for liked restaurant', () => {
            searchRestaurants('cafe a')
    
            expect(favoriteRestaurants.searchRestaurants)
                .toHaveBeenCalledWith('cafe a')
        })
    
        it('should show the name of the restaurant found by favorite restaurant', () => {
            document.getElementById('restaurants')
                .addEventListener('articles:updated', () => {
                    const restaurantTitle = document.querySelectorAll('.restaurant_title')
                    expect(restaurantTitle.item(0).textContent).toEqual('cafe abc')
                    expect(restaurantTitle.item(1).textContent).toEqual('ada juga cafe abcde')
                    expect(restaurantTitle.item(2).textContent).toEqual('ini juga boleh cafe a')
                })
    
            favoriteRestaurants.searchRestaurants.withArgs('cafe a').and.returnValues([
                { id: 111, name: 'cafe abc' },
                { id: 222, name: 'ada juga cafe abcde' },
                { id: 333, name: 'ini juga boleh cafe a' },
            ])
            searchRestaurants('cafe a')
        })
    })

    describe('when query empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants(' ')
            expect(presenter.latestQuery.length).toEqual(0)

            searchRestaurants('    ')
            expect(presenter.latestQuery.length).toEqual(0)
            
            searchRestaurants('')
            expect(presenter.latestQuery.length).toEqual(0)

            searchRestaurants('\t')
            expect(presenter.latestQuery.length).toEqual(0)
        })

        it('should show all favorite restaurant', () => {
            searchRestaurants('    ')

            expect(favoriteRestaurants.getAllRestaurants)
                .toHaveBeenCalled()
        })
    })

    describe('when no favorite restaurant could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('restaurants')
                .addEventListener('articles:updated', () => {
                    expect(document.querySelectorAll('.restaurant-item_not_found').length)
                        .toEqual(1)
                    done()
                })
            favoriteRestaurants.searchRestaurants.withArgs('cafe a').and.returnValues([])
            
            searchRestaurants('cafe a')
        })

        it('should not show any restaurant', (done) => {
            document.getElementById('restaurants')
                .addEventListener('articles:updated', () => {
                    expect(document.querySelectorAll('.restaurant-item_not_found').length)
                        .toEqual(1)
                    done()
                })
            favoriteRestaurants.searchRestaurants.withArgs('cafe a').and.returnValues([])

            searchRestaurants('cafe a')
        })
    })
})