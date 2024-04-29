import {saveLikeToggle, saveTweet} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOOGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export function receiveTweets (tweets) {
    return {
      type: RECEIVE_TWEETS,
      tweets,
    }
  }

function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  } 
}


function toggleTweet ({id, autheduser, hasLiked}) {
  return {
    type: TOOGLE_TWEET,
    id,
    autheduser,
    hasLiked
  }
}

export function handleAddTweet (text, replyingTo, autheduser) {
  return (dispatch) => {


    dispatch(showLoading())

    return saveTweet({
      text,
      author: autheduser,
      replyingTo
    })
      .then((tweet) => 
        dispatch(addTweet(tweet))
      )
      .then(() => dispatch(hideLoading()))
  }
}


export function handleToggleTweet (info) {
  return (dispatch) => {
    dispatch(toggleTweet(info))    
    saveLikeToggle(info)
    .catch((e)=>{
      console.warn('Error Ocurred, please try again!', e)
      dispatch(toggleTweet(info))
    })  
  }
}