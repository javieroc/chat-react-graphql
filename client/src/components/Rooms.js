import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Rooms.css';

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleScroll(e) {
    const { loading } = this.props;
    const { hasNextPage } = this.props.rooms.pageInfo;

    const elem = e.target;
    const scrolled = elem.scrollTop;
    const viewportHeight = elem.offsetHeight;
    const fullHeight = elem.scrollHeight;

    if ((scrolled + viewportHeight + 20 >= fullHeight)) {
      if (!loading && hasNextPage) this.props.loadMoreRooms();
    }
  }

  handleClick(e) {
    const roomName = e.target.text;
    this.setState({
      roomName,
    });
  }

  render() {
    const { rooms, roomId } = this.props;
    let roomName = '';
    let roomsList = [];
    if (rooms) {
      if (!this.state.roomName) {
        roomName = rooms.edges.length > 0 ? rooms.edges.find(elem => elem.node.id === roomId).node.name : '';
      }
      roomsList = rooms.edges.map((elem) => {
        const room = elem.node;
        return (
          <Link to={`/rooms/${room.id}`} className="list-group-item" key={room.id} onClick={e => this.handleClick(e)}>
            {room.name}
          </Link>
        );
      });
    }

    return (
      <div className="rooms">
        <div className="parallelogram">{this.state.roomName ? this.state.roomName : roomName}</div>
        <div id="rooms-sidebar" className="fluorescent-panel scrollbar-magic" onScroll={e => this.handleScroll(e)}>
          <ul className="list-group">
            {roomsList}
          </ul>
        </div>
      </div>
    );
  }
}

export default Rooms;
