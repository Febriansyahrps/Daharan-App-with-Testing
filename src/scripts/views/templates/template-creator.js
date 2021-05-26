import CONFIG from "../../globals/config"

const restaurantItemTemplate = (restaurant) => `
    <article class="article-item post-item">  
        <div class="post-item_card">
            <a href="#/detail/${restaurant.id}">
                <div class="post-item_thumbnail">
                    <img src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" class="lazyload post-item_image" alt="${restaurant.name}" crossorigin="anonymous">
                    <p class="post-item_place">Kota ${restaurant.city}</p>
                </div>
            </a>
            <div class="post-item_content">
                <p class="post-item_rating">Rating ${restaurant.rating}</p>
                <h1 class="restaurant_title">${restaurant.name || '-'}</h1>
                <p class="post-item_desc">${restaurant.description.substring(0, 180) || '-'}</p>
            </div>
        </div>
    </article>
` 

const restaurantDetailTemplate = (restaurant) => `
    <div class="detail_header">
        <div class="image_header">
            <img src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" class="lazyload detail_image" alt="${restaurant.name}" crossorigin="anonymous">
        </div>
        <div class="desc_header">
            <h1 class="detail_title">${restaurant.name}</h1>
            <p class="detail_address">${restaurant.address}, ${restaurant.city}</p>
            <h2 class="detail_category">Menu Categories :</h2>
            <div class="categories_list">
                ${restaurant.categories.map((category) => `
                        <div class="category_item">${category.name}</div>`)
                    .join('')}
            </div>
        </div>
    </div>
    <section>
        <div class="detail_description">
            <p>${restaurant.description}</p>
        </div>
        <h1 class="title_menu">Restaurant Menu</h1>
        <hr class="main_line">
        <article class="menu">
            <div class="list_menu">
                <ol><h2 class="menu_category">Foods : </h2>
                    ${restaurant.menus.foods
                        .map((food) => `
                        <li class="item_menu">${food.name}</li>
                        `)
                    .join('')}
                <ol>
            </div>
            <div class="list_menu">
                <ol><h2 class="menu_category">Drinks : </h2>
                    ${restaurant.menus.drinks
                        .map((drink) => `
                        <li class="item_menu">${drink.name}</li>
                        `)
                    .join('')}
                <ol>
            </div>
        </article>
        <h2 class="title_review">Restaurant Review</h2>
        <p class="detail_rating">Rating ⭐️: ${restaurant.rating} </p>
        <hr class="main_line">
        <div class="review">
            ${restaurant.customerReviews
                .map((customer) => `
                    <div class="item-review">
                        <div class="review_header">
                            <div>
                                <h3 class="review_name">${customer.name}</h3>
                            </div>
                            <div>
                                <p class="review_date">${customer.date}</p>
                            </div>
                        </div>
                        <hr class="main_line">
                        <p class="review_desc">${customer.review}</p>
                    </div>
                `)
            .join('')}
        </div>
        <h2 class="add_review_title">Add Review</h2>
        <div class="post_review">
            <h3 class="add_review_tag">Name</h3>  
            <input type="text" id="nameReview" class="name_input" placeholder="Reviewers Name..." label="Reviewers Name"><br><br>
            <h3 class="add_review_tag">Review</h3>
            <textarea id="textReview" class="review_input" placeholder="Write Restaurant Review..." label="Write Restaurant Review"></textarea>
            <button id="postReview" class="review_button" aria-label="Send Review">Send Review</button>
        </div>
    </section>
`

const likeButtonCreator = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`

const likedButtonCreator = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`

const notFoundPageCreator = (errorMessage) => `
    <div class="error-page">
        <h1>${errorMessage}</h1>
    </div>
`

export { restaurantDetailTemplate, restaurantItemTemplate, likeButtonCreator, likedButtonCreator, notFoundPageCreator }
