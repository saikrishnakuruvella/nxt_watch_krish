import {Component} from 'react'
import {RiMenuAddLine} from 'react-icons/ri'
import Header from '../Header'
import TrendingVideo from '../TrendingVideo'
import Sidebar from '../Sidebar'
import NxtContext from '../../Context/NxtContext'
import BottomBar from '../BottomBar'
import './index.css'

class SavedVideosRoute extends Component {
  renderSavedVideos = () => (
    <NxtContext.Consumer>
      {value => {
        const {savedList} = value

        return (
          <>
            <Header />
            <div className="homeSideContainer">
              <Sidebar />
              <div className="overFlowCon">
                <div className="trendingHeadBar">
                  <div className="trendingIconCon">
                    <RiMenuAddLine className="trendingIcon" />
                  </div>
                  <h1 className="trendingHeadName">Saved Videos </h1>
                </div>
                {savedList.length === 0 ? (
                  <div className="failureCon">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      className="failureimage"
                      alt="no saved videos"
                    />
                    <h1>No saved videos found</h1>
                    <p>You can save your videos while watching them</p>
                  </div>
                ) : (
                  <ul>
                    {savedList.map(eachItem => (
                      <TrendingVideo data={eachItem} key={eachItem.id} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <BottomBar />
          </>
        )
      }}
    </NxtContext.Consumer>
  )

  render() {
    return this.renderSavedVideos()
  }
}
export default SavedVideosRoute
