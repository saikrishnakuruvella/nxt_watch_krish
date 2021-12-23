import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingVideo from '../GamingVideo'
import BottomBar from '../BottomBar'
import './index.css'

const apiConstant = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {gamingList: [], apiStatus: 'initial'}

  componentDidMount() {
    this.getGamingVideos()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ff0000" height="50" width="50" />
    </div>
  )

  renderfailure = () => (
    <div className="failureCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failureimage"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <p>Please try again.</p>
      <button type="button" className="retryBtn" onClick={this.getGamingVideos}>
        Retry
      </button>
    </div>
  )

  renderCompleteVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderVideo()
      case apiConstant.loading:
        return this.renderLoader()
      case apiConstant.failure:
        return this.renderfailure()
      default:
        return null
    }
  }

  renderVideo = () => {
    const {gamingList} = this.state
    return (
      <ul className="ulGammingCon">
        {gamingList.map(eachItem => (
          <GamingVideo data={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const url = `https://apis.ccbp.in/videos/gaming`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))

      this.setState({gamingList: updatedData, apiStatus: apiConstant.success})
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  renderGaming = () => (
    <>
      <Header />
      <div className="homeSideContainer">
        <Sidebar />
        <div className="overFlowCon">
          <div className="trendingHeadBar">
            <div className="trendingIconCon">
              <SiYoutubegaming className="trendingIcon" />
            </div>
            <h1 className="trendingHeadName">Gaming</h1>
          </div>
          {this.renderCompleteVideos()}
        </div>
      </div>
      <BottomBar />
    </>
  )

  render() {
    return this.renderGaming()
  }
}
export default GamingRoute
