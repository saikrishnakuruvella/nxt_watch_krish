import {Link} from 'react-router-dom'
import './index.css'

const GamingVideo = props => {
  const {data} = props
  const {id, title, viewCount, thumbnailUrl} = data
  return (
    <Link to={`/videos/${id}`} className="gamingLinkEdit">
      <li className="gamingCon">
        <img src={thumbnailUrl} alt="gamingImage" className="gamingThumbnail" />
        <div>
          <p className="gamingTitle">{title}</p>
          <p className="gamingDescription">{viewCount}Watching Worldwide</p>
        </div>
      </li>
    </Link>
  )
}
export default GamingVideo
