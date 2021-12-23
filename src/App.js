import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import DetailedVideoRoute from './components/DetailedVideoRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NxtContext from './Context/NxtContext'
import NotFound from './components/NotFoundRoute'
import './App.css'

// Replace your code here
class App extends Component {
  state = {savedList: []}

  addVideo = videoDetails => {
    const {savedList} = this.state
    const productList = savedList.filter(
      eachItem => eachItem.id === videoDetails.id,
    )
    if (productList.length === 0) {
      this.setState(prevState => ({
        savedList: [...prevState.savedList, videoDetails],
      }))
    } else {
      this.deleteVideo(videoDetails)
    }
  }

  deleteVideo = videoDetails => {
    this.setState(prevState => ({
      savedList: prevState.savedList.filter(
        eachItem => eachItem.id !== videoDetails.id,
      ),
    }))
  }

  render() {
    const {savedList} = this.state
    console.log(savedList)
    return (
      <NxtContext.Provider
        value={{
          savedList,
          addVideo: this.addVideo,
          deleteVideo: this.deleteVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={DetailedVideoRoute}
          />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <Route component={NotFound} />
        </Switch>
      </NxtContext.Provider>
    )
  }
}

export default App
