import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { CREATE_POST } from '../queries/users';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

class Subscription extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      post: 'Hello World!',
      posts: [],
      subscriptions: null,
    };
  }

  handleChange = (e) =>{
    this.setState({post: e.target.value});
  };

  async createPost(apolloClient) {
    if(this.state.post) {
      const { data }  = await apolloClient.mutate({
        mutation: CREATE_POST,
        variables: { post: this.state.post  },
        refetchQueries: ['createPost'],
      });

      let post = data.createPost;
      post.subscribed = false;
      this.updatePosts(post);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.subscription !== this.props.subscription) {
      this.updateSubscriptions();
    }
  }

  updatePosts(element) {
    let posts = [...this.state.posts];
    let postIndex = posts.findIndex((el) => { return el.id === element.id; });

    postIndex >= 0 ? posts.splice(postIndex,1, element) : posts.push(element);

    this.setState(prevState => ({
      post: '',
      posts,
    }));
  }

  updateSubscriptions() {
    let subscription = this.props.subscription;
    subscription.subscribed = true;
    this.updatePosts(subscription);
  }

  getSubscriptions() {
    let table;
    let subscriptions;

    if(this.state.posts.length > 0) {
      subscriptions = this.state.posts.map((post,i) => {
        return <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td><FontAwesomeIcon icon={post.subscribed ? faCheckSquare : faTimesCircle} /></td>
        </tr>;
      });

      table = <table className="table table-light">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Post</th>
          <th scope="col">Subscribed</th>
        </tr>
        </thead>
        <tbody>
        { subscriptions }
        </tbody>
      </table>;
    }

    return table;
  }

  render() {
    let table = this.getSubscriptions();
    return (
      <ApolloConsumer>
        {client => (
          <section>
            <div className="row justify-content-center">
              <div className="col-lg-4 text-center">
                <form className="form-inline">
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">New Post: </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.post}
                      onChange={this.handleChange}
                    />
                    <button type="button" className={"btn btn-primary ml-2"} onClick={() => this.createPost(client)}>
                      Add Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-5 align-self-center text-center mt-2">{table}</div>
            </div>
          </section>
        )}
      </ApolloConsumer>
    );
  }
}

export default Subscription;
