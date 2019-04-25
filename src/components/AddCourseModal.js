import React, { Component } from 'react'
import {Modal, Typography, TextField, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import ModalStyle from '../styles/modalStyle'

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

class AddCourseModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            open: true,
            valid: true,
            newCourse: {
                courseName: ""
            }
        }

        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        //this.handleKey = this.handleKey.bind(this)
        this.save = this.save.bind(this)
    }

    postCourse = async () =>{
        console.log(JSON.stringify(this.state.newCourse))

        const response = await fetch('/course', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'ContentType' : 'application/json',
                'content-type' : 'application/json'
            },
            body: JSON.stringify(this.state.newCourse),
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))

        console.log(response)
    }


    // Close the current modal
    closeModal(){
        this.setState({
            open: false
        })

        this.props.onChangeState()
    }

    // Handle any changes made to the given field
    handleChange = name => event =>{
        this.setState({
            newCourse: {
                courseName: event.target.value
            }
        })
    }

    // Save the newly created session
    save(){

        console.log(this.state.newCourse)

        // Checking whether the session has a name
        if(this.state.newCourse.courseName.length !== 0){
            this.postCourse()
            this.closeModal()
        } else {
            this.setState({
                valid: false
            })
        }
    }

    render(){
        const {classes} = this.props

        console.log(this.state.newCourse.courseName)

        return(
            <Modal onKeyUp={this.handleKey} open={this.state.open} onBackdropClick={this.closeModal}>
                <div style={ModalStyle} className={classes.paper}>
                    <Typography variant="title" className="title">
                        New Game Session
                    </Typography>
                    <Typography variant="subheading" className="form">
                        <TextField className={classes.textField} label="Game Name" defaultValue={null} onChange={this.handleChange()} fullWidth />
                    </Typography>

                    <Button variant="contained" color="primary" id="save" onClick={this.save}>Save</Button>
                </div>
            </Modal>
        )
    }
}

const AddCourseModalWrapped = withStyles(styles)(AddCourseModal)

export default AddCourseModalWrapped