import {Component} from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import EachTumbnail from '../EachTumbnail'
import BottomBar from '../BottomBar'
import './index.css'

const SearchInput = styled.input`
  width: 250px;
  height: 30px;
  outline: none;
  border: 0px;
  padding-left: 10px;
  @media (max-width: 560px) {
    width: 180px;
  }
`
const SearchBtn = styled.button`
  background-color: transparent;
  height: 31px;
  width: 45px;
  border: none;
  background-color: #cbd5e1;
  cursor: pointer;
`

const SearchCon = styled.div`
  border: 1px solid #cbd5e1;
  width: 215px;
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
`

const VideoAndSearch = styled.div`
  background-color: #f8fafc;
`

const apiConstant = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    bannerDisplay: true,
    noOfVideos: [],
    searchInput: '',
    apiStatus: 'initial',
  }

  onBanner = () => {
    this.setState({bannerDisplay: false})
  }

  componentDidMount = () => {
    this.getVideoBanner()
  }

  onChangeSearchBar = event => {
    if (event.target.value !== '') {
      this.setState({searchInput: event.target.value})
    } else {
      this.setState({searchInput: ''}, this.getVideoBanner)
    }
  }

  onClickSearchBar = () => {
    this.getVideoBanner()
  }

  onSearchBar = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getVideoBanner)
    }
  }

  getVideoBanner = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiConstant.loading})
    console.log(searchInput)
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

      this.setState({noOfVideos: updatedData, apiStatus: apiConstant.success})
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
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
      <button type="button" className="retryBtn" onClick={this.getVideoBanner}>
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
    const {noOfVideos} = this.state
    const checkSearch = noOfVideos.length

    return (
      <>
        {checkSearch === 0 ? (
          <div className="failureCon">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              className="failureimage"
              alt="no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>

            <button
              type="button"
              className="retryBtn"
              onClick={this.getVideoBanner}
            >
              Retry
            </button>
          </div>
        ) : (
          <ul className="homeUlCon">
            {noOfVideos.map(eachItem => (
              <EachTumbnail data={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderOverFollowCont = () => {
    const {bannerDisplay} = this.state
    return (
      <div className="overFlowCon">
        <>{bannerDisplay && this.renderBanner()}</>
        <VideoAndSearch>
          <SearchCon>
            <SearchInput
              type="search"
              placeholder="Search"
              onKeyDown={this.onSearchBar}
              onChange={this.onChangeSearchBar}
            />
            <SearchBtn
              type="button"
              onClick={this.onClickSearchBar}
              data-testid="searchButton"
            >
              <BsSearch style={{margin: 0}} />
            </SearchBtn>
          </SearchCon>
          {this.renderCompleteVideos()}
        </VideoAndSearch>
      </div>
    )
  }

  renderBanner = () => (
    <div className="bannerCon" data-testid="banner">
      <div>
        <img
          className="navBarLogo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <h1 className="mobileBannerHead">Buy Nxt Watch Premium</h1>
        <button type="button" className="getItNowBtn" data-testid="close">
          GET IT NOW
        </button>
      </div>
      <button type="button" className="bannerCloseBtn" onClick={this.onBanner}>
        X
      </button>
    </div>
  )

  renderHomePage = () => (
    <div data-testid="home" className="mainCon">
      <Header />
      <div className="homeSideContainer">
        <Sidebar />
        {this.renderOverFollowCont()}
      </div>
      <BottomBar />
    </div>
  )

  render() {
    return this.renderHomePage()
  }
}

export default HomeRoute
