import React from 'react';
import Subscription from './components/Subscription';
import {ApolloProvider} from "@apollo/react-hooks";
import { ApolloLink } from 'apollo-link';
import ApolloClient from 'apollo-client';
import PusherLink from './components/PusherLink';
import {InMemoryCache} from "apollo-cache-inmemory";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Users from "./components/Users";
import Pusher from "pusher-js";
import {SUBSCRIBE_POST} from "./queries/users";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from './navbar';

class App extends React.Component {
  constructor(props) {
    super(props);

    let link = createHttpLink({ uri: 'http://localhost:9001/graphql', credentials: 'include' });

    this.state = {
      status: false,
      subscription: null
    };

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers
        },
      };
    });
    link = authLink.concat(link);

    const pusherLink = new PusherLink({
      pusher: new Pusher("f3450a96a719ac517c3d", {
        cluster: "us2",
        authEndpoint: `http://localhost:9001/graphql/subscriptions/auth`,
        enabledTransports: ['ws', 'flash'],
        wsHost: window.location.hostname,
        wsPort: 6003,
        wssPort: 6003,
        disableStats: true,
      })
    });

    pusherLink.pusher.connection.bind('initialized', states => {
      console.log("Initialized Pusher");
    });

    pusherLink.pusher.connection.bind('connected', states => {
      console.log("Pusher connected");
      this.setState({status: true});
    }).bind(this);

    pusherLink.pusher.connection.bind('disconnected', states => {
      console.log("Pusher disconnected");
      this.setState({status: false});
    }).bind(this);

    pusherLink.pusher.connection.bind('state_change', states => {
      console.log("Pusher state change", states);
      this.subscribeToAllChannels();
    }).bind(this);

    pusherLink.pusher.connection.bind('error', event => {
      console.log("pusher error: " + event.error.data.message);
      if (event.error.data.code === 4100) {
        console.log("Maximum connection limit exceeded!");
      }
    });

    this.apolloClient = new ApolloClient({
      link: ApolloLink.from([pusherLink, link]),
      cache: new InMemoryCache(),
    });
  }

  subscribeToAllChannels = () => {
    var self = this;
    this.apolloClient.subscribe({
      query: SUBSCRIBE_POST
    }).subscribe({
      next(sub) {
        // setTimeout only to see a state change when we create a new post
        setTimeout(() => {
          self.setState( {
            subscription: sub.data.postCreated
          });
        }, 3000);
      },
      complete(data) {
        console.log('ApolloClient Subscribe Complete');
      },
      error(err) {
        console.error('err', err);
      },
    });
  };

  render() {
    return (
      <div className="container">
        <ApolloProvider client={this.apolloClient}>
          <BrowserRouter>
            <Navbar status={this.state.status} />
            <div className="row mt-3">
            <div className="col-lg-12">
              <Switch>
                <Route path="/users">
                  <Users apolloClient={this.apolloClient} />
                </Route>
                <Route path="/post">
                  <Subscription subscription={this.state.subscription} />
                </Route>
              </Switch>
            </div>
          </div>
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
