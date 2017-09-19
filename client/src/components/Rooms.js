import React, { Component } from 'react'

class Rooms extends Component {
  render () {
    const rooms = this.props.rooms.map((elem) => {
      return <li className='list-group-item' key={elem.id}>{elem.name}</li>
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
