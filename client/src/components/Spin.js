import React, { Component } from 'react'
import Animate from 'rc-animate'
import './Spin.css'

const loader = (
  <div className='loader loader-2'>
    <svg className='loader-star'>
      <polygon points='29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 ' fill='#18ffff' />
    </svg>
    <div className='loader-circles'></div>
  </div>
)

class Spin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: props.loading
    }
  }

  render () {
    const { loading } = this.state
    return (
      <Animate transitionName='fade'>
        {loading && <div key='loading'>{loader}</div>}
        <div key='container'>{this.props.children}</div>
      </Animate>
    )
  }
}

export default Spin
