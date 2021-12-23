import {Component} from 'react'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GoPrimitiveDot} from 'react-icons/go'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiMenuAddLine} from 'react-icons/ri'
import Header from '../Header'
import Sidebar from '../Sidebar'
import BottomBar from '../BottomBar'
import NxtContext from '../../Context/NxtContext'

import './index.css'

const YoutubeHead = styled.h1`
  color: #231f20;
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 20px;
`
const apiConstant = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class DetailedVideoRoute extends Component {
  state = {videoDetails: {}, like: false, dislike: false, apiStatus: 'initial'}

  componentDidMount() {
    this.getVideoDetails()
  }

  onLikeBtn = () => {
    this.setState(prevState => ({
      like: !prevState.like,
      dislike: false,
    }))
  }

  onDislikeBtn = () => {
    this.setState(prevState => ({
      dislike: !prevState.dislike,
      like: false,
    }))
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.video_details.channel.name,
        id: data.video_details.id,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        description: data.video_details.description,
      }
      this.setState({videoDetails: updatedData, apiStatus: apiConstant.success})
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  renderLoader = () => (
    <>
      <Header />
      <div className="homeSideContainer">
        <Sidebar />
        <div
          className="loader-container overFlowCon specificHeight"
          data-testid="loader"
        >
          <Loader type="ThreeDots" color="#ff0000" height="50" width="50" />
        </div>
      </div>
    </>
  )

  renderfailure = () => (
    <>
      <Header />
      <div className="homeSideContainer">
        <Sidebar />
        <div className="failureCon overFlowCon specificHeight">
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
            onClick={this.getVideoDetails}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderCompleteVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderDetailedVideo()
      case apiConstant.loading:
        return this.renderLoader()
      case apiConstant.failure:
        return this.renderfailure()
      default:
        return null
    }
  }

  renderDetailedVideo = () => (
    <NxtContext.Consumer>
      {value => {
        const {addVideo, savedList} = value

        const {videoDetails, like, dislike} = this.state
        const {
          name,
          videoUrl,
          title,
          viewCount,
          publishedAt,
          subscriberCount,
          profileImageUrl,
          description,
        } = videoDetails
        const onSavedBtn = () => {
          addVideo(videoDetails)
        }
        const checkingId = savedList.filter(
          eachItem => eachItem.id === videoDetails.id,
        )

        const savedClass = checkingId.length !== 0 ? 'selected' : null
        const savedText = checkingId.length !== 0 ? 'Saved' : 'Save'

        const likeClassName = like ? 'selected' : null
        const dislikeClassName = dislike ? 'selected' : null
        return (
          <>
            <Header />
            <div className="homeSideContainer">
              <Sidebar />
              <div className="overFlowCon">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="60%"
                />
                <YoutubeHead>{title}</YoutubeHead>
                <div className="viewsAndLikeCon">
                  <div className="youtubeVideoViewsCon">
                    <p className="commonYoutubeDetailed">{viewCount} views</p>
                    <GoPrimitiveDot className="commonYoutubeDetailed" />
                    <p className="commonYoutubeDetailed">{publishedAt}</p>
                  </div>
                  <div className="LikesCon">
                    <div className="commonCon">
                      <BiLike
                        className={`commonYoutubeDetailed  ${likeClassName}`}
                      />
                      <button
                        type="button"
                        className={`commonYoutubeDetailed likebtnEdit ${likeClassName}`}
                        onClick={this.onLikeBtn}
                      >
                        Like
                      </button>
                    </div>
                    <div className="commonCon">
                      <BiDislike
                        className={`commonYoutubeDetailed  ${dislikeClassName}`}
                        size={14}
                      />
                      <button
                        onClick={this.onDislikeBtn}
                        type="button"
                        className={`commonYoutubeDetailed likebtnEdit ${dislikeClassName}`}
                      >
                        Dislike
                      </button>
                    </div>
                    <div className="commonCon">
                      <RiMenuAddLine
                        className={`commonYoutubeDetailed ${savedClass}`}
                        size={12}
                      />
                      <button
                        onClick={onSavedBtn}
                        type="button"
                        className={`commonYoutubeDetailed likebtnEdit ${savedClass}`}
                      >
                        {savedText}
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="subscriberContainer">
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="videoProfileLogo"
                  />
                  <div>
                    <p className="youtubeChannelName">{name}</p>
                    <p className="subscriber">{subscriberCount} subscribers</p>
                    <p className="subscriberDescription">{description}</p>
                  </div>
                </div>
              </div>
            </div>
            <BottomBar />
          </>
        )
      }}
    </NxtContext.Consumer>
  )

  render() {
    return this.renderCompleteVideos()
  }
}
export default DetailedVideoRoute
