import React, { Component } from 'react'
import {Modal, Typography, TextField, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import ModalStyle from '../styles/modalStyle'
import ConnectionString from '../data-access/Connection'
import {postCourse} from '../data-access/Courses'

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
        this.save = this.save.bind(this)
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
                [name]: event.target.value
            }
        })
    }

    // Save the newly created course
    save(){
        // Checking whether the course has a name
        if(this.state.newCourse.courseName.length !== 0){
            postCourse(this.state.newCourse).then(body => {
                this.props.onAdd(body)
            })
            this.closeModal()
        } else {
            this.setState({
                valid: false
            })
        }
    }

    render(){
        const {classes} = this.props

        return(
            <Modal open={this.state.open} onBackdropClick={this.closeModal}>
                <div style={ModalStyle} className={classes.paper}>
                    <Typography variant="title" className="title">
                        New Course
                    </Typography>
                    <Typography variant="subheading" className="form">
                        <TextField className={classes.textField} label="Course Name" defaultValue={null} onChange={this.handleChange('courseName')} fullWidth />
                    </Typography>

                    <Button variant="contained" color="primary" id="save" onClick={this.save}>Save</Button>
                </div>
            </Modal>
        )
    }
}

const AddCourseModalWrapped = withStyles(styles)(AddCourseModal)

export default AddCourseModalWrapped