import React, { Component } from 'react'
import './Rooms.css'

class Rooms extends Component {
  constructor (props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll (e) {
    const { loading } = this.props
    const { hasNextPage } = this.props.rooms.pageInfo

    const elem = e.target
    const scrolled = elem.scrollTop
    const viewportHeight = elem.offsetHeight
    const fullHeight = elem.scrollHeight

    if ((scrolled + viewportHeight + 20 >= fullHeight)) {
      if (!loading && hasNextPage) this.props.loadMoreRooms()
    }
  }

  render () {
    const { rooms } = this.props
    let roomsList = []
    if (rooms) {
      roomsList = rooms.edges.map((elem) => {
        const room = elem.node
        return <a className='list-group-item' key={room.id}>{room.name}</a>
      })
    }

    return (
      <div id='rooms-sidebar' className='fluorescent-panel' onScroll={(e) => this.handleScroll(e)}>
        <ul className='list-group'>
          {roomsList}
        </ul>
      </div>
    )
  }
}

export default Rooms
