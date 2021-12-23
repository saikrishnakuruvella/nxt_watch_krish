import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddLine} from 'react-icons/ri'
import './index.css'

const Sidebar = props => {
  const {history} = props
  const getBackgroundColor = current => {
    if (history.location.pathname === current) {
      return '#f1f5f9'
    }
    return ''
  }

  const getIconColor = current => {
    if (history.location.pathname === current) {
      return '#ff0000'
    }
    return '#94a3b8'
  }

  const getContentColor = current => {
    if (history.location.pathname === current) {
      return '#1e293b'
    }
    return '#475569'
  }

  return (
    <div className="sideBarCon">
      <div>
        <Link to="/" className="linkEdit">
          <div
            className="iconCon"
            style={{backgroundColor: getBackgroundColor('/')}}
          >
            <AiFillHome size={20} style={{color: getIconColor('/')}} />
            <p className="sidebarName" style={{color: getContentColor('/')}}>
              Home
            </p>
          </div>
        </Link>
        <Link to="/trending" className="linkEdit">
          <div
            className="iconCon"
            style={{backgroundColor: getBackgroundColor('/trending')}}
          >
            <FaFire size={20} style={{color: getIconColor('/trending')}} />
            <p
              className="sidebarName"
              style={{color: getContentColor('/trending')}}
            >
              Trending
            </p>
          </div>
        </Link>
        <Link to="/gaming" className="linkEdit">
          <div
            className="iconCon"
            style={{backgroundColor: getBackgroundColor('/gaming')}}
          >
            <SiYoutubegaming
              size={20}
              style={{color: getIconColor('/gaming')}}
            />
            <p
              className="sidebarName"
              style={{color: getContentColor('/gaming')}}
            >
              Gaming
            </p>
          </div>
        </Link>
        <Link to="/saved-videos" className="linkEdit">
          <div
            className="iconCon"
            style={{backgroundColor: getBackgroundColor('/saved-videos')}}
          >
            <RiMenuAddLine
              size={20}
              style={{color: getIconColor('/saved-videos')}}
            />
            <p
              className="sidebarName"
              style={{color: getContentColor('/saved-videos')}}
            >
              Saved Videos
            </p>
          </div>
        </Link>
      </div>
      <div className="bottomCon">
        <p className="contactUs">CONTACT US</p>
        <div className="imagesCon">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="facebookLogo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="facebookLogo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="facebookLogo"
          />
        </div>
        <p className="contactUsDes">
          {' '}
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )
}
export default withRouter(Sidebar)
