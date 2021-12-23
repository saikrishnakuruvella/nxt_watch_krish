import {withRouter, Link} from 'react-router-dom'
// import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import './index.css'

const Navbar = styled.nav`
  width: 100vw;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 100px;
  padding-right: 100px;

  @media (max-width: 560px) {
    padding: 0px;
    padding-left: 15px;
    padding-right: 15px;
  }
`

const Header = props => {
  const {history} = props

  const logoutClick = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Navbar>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="navBarLogo"
        />
      </Link>
      <ul className="logoutCon">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
            className="navBarProfile"
          />
        </li>
        <li>
          <div className="popup-container ">
            <Popup
              modal
              trigger={
                <button
                  type="button"
                  className="trigger-button logoutConfirmation"
                >
                  Logout
                </button>
              }
            >
              {close => (
                <div className="modelCon">
                  <div>
                    <p>Are you sure, you want to logout</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="trigger-button confirmBnt"
                      onClick={logoutClick}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </li>
      </ul>
    </Navbar>
  )
}
export default withRouter(Header)
