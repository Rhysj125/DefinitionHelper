import React, { Component } from 'react'
import LoadingIcon from '@material-ui/icons/Cached';

class Loading extends Component{
    render(){
        return (
            <div className='loading'>
                <div className='loadingBody'>
                    <LoadingIcon className='loadingIcon'/>
                    Loading
                </div>
            </div>
        )
    }
}

export default Loading