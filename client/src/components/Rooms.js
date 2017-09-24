import React, { Component } from 'react'

class Rooms extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillMount () {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  handleScroll () {
    if (this.state.loading) return null

    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.body.clientHeight

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) return null

    return this.setState({ loading: true }, async () => {
      try {
        const rooms = await this.props.loadMoreRooms()
        console.log(rooms)

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
