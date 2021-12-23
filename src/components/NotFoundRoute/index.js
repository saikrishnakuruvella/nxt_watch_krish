import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="homeSideContainer">
      <Sidebar />
      <div className="overFlowCon">
        <div className="failureCon">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            className="failureimage"
            alt="not found"
          />
          <h1>Page Not Found</h1>
          <p>we are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </div>
  </>
)
export default NotFound
