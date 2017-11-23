import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
    console.log(this.state);
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
              <button type="submit" className="btn btn-primary custom-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
