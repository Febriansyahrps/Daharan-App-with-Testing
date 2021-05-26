import API_ENDPOINT from '../globals/api-endpoint'
import CONFIG from '../globals/config'

class RestaurantSource {
  static async Home () {
    const response = await fetch(API_ENDPOINT.HOME)
    const results = await response.json()
    return results.restaurants
  }

  static async Detail (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    const results = await response.json()
    return results.restaurant
  }

  static async Review (review) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': CONFIG.API_KEY
        },
        body: JSON.stringify(review)
      })
      if (response.status === 200) {
        alert('Send Review Success')
        location.reload()
      }
      return response
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        alert('Please Check Your Connection')
      }
    }
  }
}

export default RestaurantSource
