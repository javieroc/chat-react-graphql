import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errorMessages: [],
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { username, email, password } = this.state;
      await this.props.mutate({
        variables: {
          newUser: {
            username,
            email,
            password,
          },
        },
      });

      this.props.history.push('/');
    } catch (err) {
      if (err.graphQLErrors) {
        this.setState({
          errorMessages: err.graphQLErrors[0],
        });
      }
    }
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <div className="container">
        <div className="register-form">
          <div className="parallelogram">REGISTER</div>
          <div className="fluorescent-panel">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  onChange={this.onChange}
                  className="form-control custom-input"
                  type="text"
                  placeholder="Username/Nickname"
                  value={username}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  onChange={this.onChange}
                  className="form-control custom-input"
                  type="text"
                  placeholder="Email"
                  value={email}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  onChange={this.onChange}
                  className="form-control custom-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                />
              </div>
              {
                this.state.errorMessages.length > 0 &&
                <div className="custom-alert">
                  {
                    this.state.errorMessages.map(elem => <li key={elem.path}>{elem.message}</li>)
                  }
                </div>
              }
              <button type="submit" className="btn btn-primary custom-button">Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const registerMutation = gql`
  mutation signUp($newUser: NewUser!) {
    signUp(newUser: $newUser) {
      id
      username
      email
      avatar
    }
  }
`;

export default graphql(registerMutation)(Register);
