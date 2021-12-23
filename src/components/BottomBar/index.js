import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddLine} from 'react-icons/ri'
import './index.css'

const BottomBar = props => {
  const {history} = props
  const getIconColor = current => {
    if (history.location.pathname === current) {
      return '#ff0000'
    }
    return '#94a3b8'
  }
  return (
    <div className="bottomBarCon">
      <Link to="/">
        <AiFillHome
          className="bottomBarIcon"
          style={{color: getIconColor('/')}}
        />
      </Link>

      <Link to="/trending">
        <FaFire
          className="bottomBarIcon"
          style={{color: getIconColor('/trending')}}
        />
      </Link>
      <Link to="/gaming">
        <SiYoutubegaming
          className="bottomBarIcon"
          style={{color: getIconColor('/gaming')}}
        />
      </Link>

      <Link to="/saved-videos">
        <RiMenuAddLine
          className="bottomBarIcon"
          style={{color: getIconColor('/saved-videos')}}
        />
      </Link>
    </div>
  )
}
export default withRouter(BottomBar)
