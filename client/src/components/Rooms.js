import React, { Component } from 'react'
import './Rooms.css'

class Rooms extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll (e) {
    if (this.state.loading) return null

    const elem = e.target
    const scrolled = elem.scrollTop
    const viewportHeight = elem.offsetHeight
    const fullHeight = elem.scrollHeight

    if (!(scrolled + viewportHeight + 20 >= fullHeight)) return null

    return this.setState({ loading: true }, async () => {
      try {
        const { hasNextPage } = this.props.rooms.pageInfo
        if (hasNextPage) {
          await this.props.loadMoreRooms()
        }

        this.setState({
          loading: false
        })
      } catch (error) {
        console.error(error)
        this.setState({ loading: false })
      }
    })
  }

  render () {
    if (this.state.loading) {
      return <div>Loading...</div>
    }

    const rooms = this.props.rooms.edges.map((elem) => {
      const room = elem.node
      return <a className='list-group-item' key={room.id}>{room.name}</a>
    })

    return (
      <div id='rooms-sidebar' className='fluorescent-panel' onScroll={(e) => this.handleScroll(e)}>
        <ul className='list-group'>
          {rooms}
        </ul>
      </div>
    )
  }
}

export default Rooms
