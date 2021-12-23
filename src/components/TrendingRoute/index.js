import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Sidebar from '../Sidebar'
import Header from '../Header'
import TrendingVideo from '../TrendingVideo'
import BottomBar from '../BottomBar'
import './index.css'

const apiConstant = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {trendingVideos: [], apiStatus: 'initial'}

  componentDidMount() {
    this.getTrendingVideos()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ff0000" height="50" width="50" />
    </div>
  )

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const url = `https://apis.ccbp.in/videos/trending`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachItem => ({
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))

      this.setState({
        trendingVideos: updatedData,
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  renderTrendingVideos = () => {
    const {trendingVideos} = this.state
    return (
      <ul className="trendingUlCon">
        {trendingVideos.map(eachItem => (
          <TrendingVideo data={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderTrending = () => (
    <>
      <Header />
      <div className="homeSideContainer">
        <Sidebar />
        <div className="overFlowCon">
          <div className="trendingHeadBar">
            <div className="trendingIconCon">
              <FaFire className="trendingIcon" />
            </div>
            <h1 className="trendingHeadName">Trending </h1>
          </div>
          {this.renderCompleteVideos()}
        </div>
      </div>
      <BottomBar />
    </>
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
      <button
        type="button"
        className="retryBtn"
        onClick={this.getTrendingVideos}
      >
        Retry
      </button>
    </div>
  )

  renderCompleteVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderTrendingVideos()
      case apiConstant.loading:
        return this.renderLoader()
      case apiConstant.failure:
        return this.renderfailure()
      default:
        return null
    }
  }

  render() {
    return this.renderTrending()
  }
}

export default TrendingRoute
