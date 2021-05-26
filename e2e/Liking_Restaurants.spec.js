const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
    I.amOnPage('/#/favorite')
})

Scenario('showing empty favorite restaurant', async ({ I }) => {
    I.seeElement('#query')
    I.see('Restaurant Not Found', '.restaurant-item_not_found')
})

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Restaurant Not Found', '.restaurant-item_not_found')

    I.amOnPage('/')
    
    I.seeElement('.post-item_card a')
    const firstRestaurant = locate('.post-item_card a').first()
    const firstRestaurantTitle = await I.grabTextFrom('.restaurant_title')
    I.click(firstRestaurant)

    I.seeElement('#likeButton')
    I.click('#likeButton')

    I.amOnPage('/#/favorite')
    I.seeElement('.article-item')
    const likedRestaurantTitle = await I.grabTextFrom('.restaurant_title')

    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle)
})

Scenario('unliking restaurant', ({ I }) => {
    I.see('Restaurant Not Found', '.restaurant-item_not_found')

    I.amOnPage('/')
    
    I.seeElement('.post-item_card a')
    const firstRestaurant = locate('.post-item_card a').first()
    I.click(firstRestaurant)

    I.seeElement('#likeButton')
    const likeButton = locate('#likeButton')
    I.click(likeButton)

    I.amOnPage('/#/favorite')
    I.seeElement('.article-item')
    
    I.seeElement('.post-item_card a')
    I.click(firstRestaurant)
    
    I.seeElement('#likeButton')
    I.click(likeButton)

    I.amOnPage('/#/favorite')
    I.see('Restaurant Not Found', '.restaurant-item_not_found')
})

Scenario('searching restaurants', async ({ I }) => {
    I.see('Restaurant Not Found', '.restaurant-item_not_found')

    I.amOnPage('/')

    I.seeElement('.post-item_card a')

    const titles = []

    for (let i = 1; i <=3; i++){
        I.click(locate('.post-item_card a').at(i))
        I.seeElement('#likeButton')
        I.click('#likeButton')
        titles.push(await I.grabTextFrom('.detail_title'))
        I.amOnPage('/')
    }

    I.amOnPage('/#/favorite')
    I.seeElement('#query')

    const searchQuery = titles[1].substring(1, 3)
    const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1)


    I.fillField('#query', searchQuery)
    I.pressKey('Enter')

    const visibleLikedRestaurant = await I.grabNumberOfVisibleElements('.article-item')
    assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurant)

    matchingRestaurants.forEach(async (title, index) => {
        const visibleTitle = await I.grabTextFrom(locate('.restaurant_title').at(index + 1))
        assert.strictEqual(title, visibleTitle)
    })
})

Scenario('add review in restaurant', ({ I }) => {
    I.amOnPage('/')

    I.seeElement('.post-item_card a')
    I.click(locate('.post-item_card a').first())

    const nameReview = 'dapid'
    const textReview = 'estehnya kurang gula'

    I.seeElement('#nameReview')
    I.fillField('#nameReview', nameReview)
    
    I.seeElement('#textReview')
    I.fillField('#textReview', textReview)

    I.seeElement('#postReview')
    I.click(locate('#postReview').first())

    I.amAcceptingPopups()

    I.see(textReview)
})