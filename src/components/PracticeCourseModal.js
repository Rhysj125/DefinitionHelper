import React, { Component } from 'react'
import {Modal, Typography, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import ModalStyle from '../styles/modalStyle'
import {Redirect} from 'react-router-dom'

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },

    textField: {
        padding: '10px',
    },
  });

class PracticeCourseModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            open: true,
            valid: true,
            redirect: false,
            mode: null
        }

        this.closeModal = this.closeModal.bind(this)
        this.redirectOnClick = this.redirectOnClick.bind(this)
    }

    // Close the current modal
    closeModal(){
        this.setState({
            open: false
        })

        this.props.onChangeState()
    }

    redirectOnClick(event){
        let value = event.currentTarget.value

        this.setState(prevState => ({
            redirect: !prevState.redirect,
            mode: value
        }))
    }

    renderRedirect(){
        console.log(this.state.mode)

        return <Redirect to={`/practice?id=${this.props.id}&mode=${this.state.mode}`} />
        //return null
    }

    render(){
        const {classes} = this.props

        return(
            <Modal open={this.state.open} onBackdropClick={this.closeModal}>
                <div style={ModalStyle} className={classes.paper}>
                    <Typography variant="title" className="title">
                        Practice Mode
                    </Typography>
                    <div>
                        <Button variant="contained" id="word" value="word" onClick={this.redirectOnClick} style={{margin:'5px'}}>Words</Button>
                        <Button variant="contained" id="definition" value="definition" onClick={this.redirectOnClick} style={{margin:'5px'}}>Definitions</Button>                    
                    </div>
                    {this.state.redirect ? this.renderRedirect() : null}
                </div>
            </Modal>
        )
    }
}

const PracticeCourseModalWrapped = withStyles(styles)(PracticeCourseModal)

export default PracticeCourseModalWrapped