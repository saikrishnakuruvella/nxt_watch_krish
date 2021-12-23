import {Link} from 'react-router-dom'
// import {formatDistanceToNow} from 'date-fns'
import {GoPrimitiveDot} from 'react-icons/go'
import './index.css'

const EachTumbnail = props => {
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
    <Link to={`/videos/${id}`} className="LinkoftumbnailCon">
      <li className="thumbnailContainer">
        <img src={thumbnailUrl} alt="tumbnail" className="thumbnailImage" />
        <div className="thumbnailTextCont">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="videoProfileLogo"
          />
          <div>
            <p className="thumbailTitle">{title}</p>
            <p className="thumbnailName">{name}</p>
            <div className="datesCon">
              <p className="thumbnailName">{viewCount} views</p>
              <GoPrimitiveDot style={{color: '#475569', marginBottom: 10}} />
              <p className="thumbnailName">{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default EachTumbnail
