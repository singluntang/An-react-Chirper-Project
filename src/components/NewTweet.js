import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {

   state = {
     text : '',
   }

   handleChange = (e) => {
     const text = e.target.value;

     this.setState({
        text: text,
        toHome: false,
     })
   }

   handleSubmit = (e) =>{
       e.preventDefault();
       const { text } = this.state
       const {dispatch, id, autheduser} = this.props
     
       dispatch(handleAddTweet(text, id, autheduser))

       this.setState(() => ({
        text: '',
        toHome: id ? false : true,
      }))      
   }

   render() {

    const {text, toHome} = this.state    
    const tweetleft = 280 - text.length

    if (toHome === true) {
      return <Redirect to='/' />
    }     

    return (
        <div>
             <h3 className='center'>Compose A New Tweet</h3>
             <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea 
                        placeholder='What is Happenning'
                        onChange = {this.handleChange}
                        value={text} 
                        maxLength ={280}
                        className = 'textarea'
                        />

                    {tweetleft >= 100 && 
                        (<div className='tweet-length'>
                            {tweetleft}
                        </div>                                                     
                        )}
                    <div>
                        <button className='btn' type='submit' disabled={text === '' || tweetleft === 0}>                        
                            Submit
                        </button>
                    </div>
             </form>
        </div>
    )

   }
}

function mapStateToProps ({autheduser}, {id = null}) {
  return {
    autheduser: autheduser,
    id
  }
}  

export default connect(mapStateToProps)(NewTweet)

