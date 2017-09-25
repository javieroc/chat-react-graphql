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

  componentDidMount () {
    const elem = document.getElementById('rooms-sidebar')
    elem.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount () {
    const elem = document.getElementById('rooms-sidebar')
    elem.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll () {
    if (this.state.loading) return null

    const elem = document.getElementById('rooms-sidebar')
    const scrolled = elem.scrollTop
    const viewportHeight = elem.clientHeight
    const fullHeight = elem.scrollHeight

    if (!(scrolled + viewportHeight + 10 >= fullHeight)) return null

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
      return <li className='list-group-item' key={room.id}>{room.name}</li>
    })

    return (
      <div>
        <ul className='list-group'>
          {rooms}
        </ul>
      </div>
    )
  }
}

export default Rooms
