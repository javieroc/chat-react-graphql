import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      const { email, password } = this.state;
      const response = await this.props.mutate({
        variables: {
          loginData: {
            email,
            password,
          },
        },
      });

      const { user, token, refreshToken } = response.data.login;
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

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
    const { email, password } = this.state;

    return (
      <div className="container">
        <div className="login-form">
          <div className="parallelogram">Login</div>
          <div className="fluorescent-panel">
            <form onSubmit={this.handleSubmit}>
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
              <button type="submit" className="btn btn-primary custom-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const loginMutation = gql`
  mutation login($loginData: LoginData!) {
    login(loginData: $loginData) {
      user {
        id
        username
        email
        avatar
      }
      token
      refreshToken
    }
  }
`;


export default graphql(loginMutation)(Login);
