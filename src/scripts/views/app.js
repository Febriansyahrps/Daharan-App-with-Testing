import Routes from '../routes/routes'
import urlParser from '../routes/url-parser'
import drawerInitiator from '../utils/drawer-initiator'

class App {
  constructor ({ button, drawer, content }) {
    this._button = button
    this._drawer = drawer
    this._content = content

    this._initialAppShell()
  }

  _initialAppShell () {
    drawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content
    })
  }

  async renderPage () {
    const url = urlParser.parseActiveWithCombiner()
    const page = Routes[url]
    this._content.innerHTML = await page.render()
    await page.afterRender()
  }
}

export default App
