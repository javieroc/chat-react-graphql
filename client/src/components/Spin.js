import React, { Component } from 'react'
import Animate from 'rc-animate'
import './Spin.css'

const loader = (
  <div className='spin'>
    <div className='loader loader-2'>
      <svg className='loader-star'>
        <polygon points='29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 ' fill='#18ffff' />
      </svg>
      <div className='loader-circles'></div>
    </div>
  </div>
)

class Spin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: props.loading
    }
  }

  componentWillUnmount () {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout)
    }
  }

  componentWillReceiveProps (nextProps) {
    const currentloading = this.props.loading
    const loading = nextProps.loading
    const { delay } = this.props

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }
    if (currentloading && !loading) {
      this.debounceTimeout = setTimeout(() => this.setState({ loading }), 200)
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout)
      }
    } else {
      if (loading && delay && !isNaN(Number(delay))) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout)
        }
        this.delayTimeout = setTimeout(() => this.setState({ loading }), delay)
      } else {
        this.setState({ loading })
      }
    }
  }

  render () {
    const { loading } = this.state
    const animateClasses = loading ? 'blur' : ''
    return (
      <Animate
        transitionName='fade'
        className={animateClasses}
      >
        {loading && <div key='loading'>{loader}</div>}
        <div className='container-spin' key='container-spin'>{this.props.children}</div>
      </Animate>
    )
  }
}

export default Spin
