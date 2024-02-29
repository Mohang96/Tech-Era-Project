import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div className="not-found-background">
    <Header />
    <div className="not-found-info-display-background">
      <div className="not-found-message-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-msg">Page Not Found</h1>
        <p className="not-found-feedback">
          We are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
