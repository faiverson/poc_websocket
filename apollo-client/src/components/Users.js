import React from 'react';
import { USERS } from '../queries/users';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Users extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.getUsers();
  }

  async getUsers() {
    const { data }  = await this.props.apolloClient.query({
      query: USERS
    });
    this.setState({ users: data.users.data });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-4 text-center">
          <ul className="list-group  text-secondary">
            {this.state.users.map(user =>
              <li className={"list-group-item text-dark-50 list-group-item-dark"} key={user.id}>{user.name}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Users;
