import React, {Component} from 'react'
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import AddCourseModal from '../components/AddCourseModal'
import {Redirect} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import {getCourses, deleteCourse} from '../data-access/Courses'

class DefinitionHelperPage extends Component{

    //#region init

    constructor(props){
        super(props)

        this.state = {
            adding: false,
            redirect: false,
            courses: [],
            redirectTo: null
        }

        this.renderAdding = this.renderAdding.bind(this)
        this.toggleAdding = this.toggleAdding.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.addCourse = this.addCourse.bind(this)
        this.getCourseFromState = this.getCourseFromState.bind(this)
        this.redirectOnClick = this.redirectOnClick.bind(this)
    }

    componentDidMount(){
        getCourses().then((dbCourses) => {
            this.setState({
                courses: dbCourses
            })
        })
    }   

    //#endregion

    //#region Toggles

    toggleAdding(){
        this.setState( prevState => ({
            adding: !prevState.adding
        }))
    }

    //#endregion

    //#region Actions

    handleDeleteClick(event){
        let value = event.currentTarget.value

        deleteCourse(value).then(body => {
            this.setState(prevState => ({
                courses: prevState.courses.filter(currCourse => currCourse._id !== body._id)
            }))
        })
    }

    addCourse(newCourse){
        this.setState( prevState => ({
            courses: [...prevState.courses, newCourse]
        }))
    }

    getCourseFromState(id){
        let course = this.state.courses.find(course => {
            return course._id === id
        })

        return course
    }

    redirectOnClick(event){
        let value = event.currentTarget.value

        this.setState(prevState => ({
            redirect: !prevState.redirect,
            redirectTo: '/courseManagement?id=' + value,
        }))
    }

    //#endregion

    //#region render Methods
    renderAdding(){
        return <AddCourseModal onChangeState={this.toggleAdding} onAdd={this.addCourse} />
    }

    renderRedirect(){
        return <Redirect to={this.state.redirectTo} />
    }

    render(){
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {        
                        this.state.courses.map((course) => {                        
                        return (
                            <TableRow>
                                <TableCell>
                                    {course.courseName}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" style={{margin:'5px'}} value={course._id} onClick={this.redirectOnClick}>
                                        <MenuIcon />
                                    </Button>
                                    <Button variant="contained" color="secondary" style={{margin:'5px'}} value={course._id} onClick={this.handleDeleteClick}>
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
                <Button variant="contained" style={{background:'green', margin:'5px'}} onClick={this.toggleAdding}>
                    <AddIcon/>
                </Button>

                {this.state.adding ? this.renderAdding() : null}
                {this.state.redirect ? this.renderRedirect() : null}
            </div>
        )
    }
    //#endregion
}

export default DefinitionHelperPage