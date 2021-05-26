const urlParser = {
  parseActiveWithCombiner () {
    const url = window.location.hash.slice(1).toLowerCase()
    const splitedUrl = this._urlSplitter(url)
    return this._urlCombiner(splitedUrl)
  },

  parseActiveWithoutCombiner () {
    const url = window.location.hash.slice(1).toLowerCase()
    return this._urlSplitter(url)
  },

  _urlSplitter (url) {
    const urlsSpilts = url.split('/')
    return {
      resource: urlsSpilts[1] || null,
      id: urlsSpilts[2] || null,
      verb: urlsSpilts[3] || null
    }
  },

  _urlCombiner (splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/') +
      (splitedUrl.id ? '/:id' : '') +
      (splitedUrl.verb ? `/${splitedUrl.verb}` : '')
  }
}

export default urlParser
