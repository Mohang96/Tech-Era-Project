import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="header-background">
    <div className="header-website-logo-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website log"
          className="website-logo"
        />
      </Link>
    </div>
  </div>
)

export default Header
