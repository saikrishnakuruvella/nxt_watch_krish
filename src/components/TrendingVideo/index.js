import {Link} from 'react-router-dom'
import {GoPrimitiveDot} from 'react-icons/go'

import './index.css'

const TrendingVideo = props => {
  const {data} = props
  const {
    id,
    title,
    viewCount,
    thumbnailUrl,
    publishedAt,
    profileImageUrl,
    name,
  } = data
  return (
    <Link to={`/videos/${id}`} className="trendingLinkEdit">
      <li className="trendingVideoSingle">
        <div className="trendingSingleVideoCon">
          <img
            src={thumbnailUrl}
            alt="trendingTestid"
            className="trendingImage"
          />
          <div className="mobileTrendingCOn">
            <img
              src={profileImageUrl}
              alt="profile"
              className="mobileProfileImg"
            />
            <div className="trendingTextCon">
              <h1 className="trendingTitle">{title}</h1>
              <p className="tendingCommon">{name}</p>
              <div className="trendingViewsCountCon">
                <p className="tendingCommon">{viewCount} views</p>
                <GoPrimitiveDot className="tendingCommon" />
                <p className="tendingCommon">{publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default TrendingVideo
