import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './SendMessage.css';

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isSubmitting: false,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    const ENTER_KEY = 13;
    const { text, isSubmitting } = this.state;
    if (event.keyCode === ENTER_KEY && !isSubmitting) {
      const { roomId } = this.props.match.params;

      if (text && text.trim()) {
        await this.props.mutate({
          variables: { roomId, text },
        });

        this.setState({
          text: '',
        });
      }
    }
  }

  render() {
    const { text } = this.state;
    return (
      <div id="send-message">
        <input
          name="text"
          onChange={this.onChange}
          onKeyDown={this.handleSubmit}
          className="form-control custom-input"
          placeholder="Write a message..."
          value={text}
        />
      </div>
    );
  }
}

const createMessageMutation = gql`
  mutation($roomId: Int, $text: String!) {
    createMessage(roomId: $roomId, text: $text)
  }
`;

export default graphql(createMessageMutation)(SendMessage);
