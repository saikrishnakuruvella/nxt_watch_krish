import React from 'react'

const NxtContext = React.createContext({
  savedList: [],
  addVideo: () => {},
  deleteVideo: () => {},
})
export default NxtContext
