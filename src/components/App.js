import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import LoadingBar from 'react-redux-loading'
import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'

class App extends Component {

  componentDidMount(){

    this.props.dispatch(handleInitialData())

  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />
                </div>}
          </div>
        </React.Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ autheduser }) {
  return {
    loading: autheduser === null,
  }
}

export default connect(mapStateToProps)(App)