import React, {Component} from 'react'
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import AddCourseModal from '../components/AddCourseModal'
import PracticeCourseModal from '../components/PracticeCourseModal'
import { regExpLiteral } from '@babel/types';

const buttons = {
    margin:'5px'
}

class DefinitionHelperPage extends Component{

    //#region init

    constructor(props){
        super(props)

        this.state = {
            adding: false,
            practice: false,
            practiceCourse: 'initial',
            courses: [],
            //URL: 'http://46.101.47.14:5000'
            URL: 'http://localhost:5000'
        }

        this.getCourses = this.getCourses.bind(this)
        this.renderAdding = this.renderAdding.bind(this)
        this.renderPractice = this.renderPractice.bind(this)
        this.toggleAdding = this.toggleAdding.bind(this)
        this.togglePractice = this.togglePractice.bind(this)
        this.onPracticeClick = this.onPracticeClick.bind(this)
        this.deleteCourse = this.deleteCourse.bind(this)
        this.addCourse = this.addCourse.bind(this)
        this.getCourseFromState = this.getCourseFromState.bind(this)
    }

    componentDidMount(){
        this.getCourses().then((dbCourses) => {
            this.setState({
                courses: dbCourses
            })
        })
    }

    //#endregion

    //#region API calls
    getCourses = async () => {
        return fetch(this.state.URL + `/Courses`, {
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json'
            }
        }).then(response => {
            return response.json()
        })
    }

    async deleteCourse(event){
        let value = event.currentTarget.value

        await fetch(this.state.URL + '/Course/' + value, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(body => {
            this.setState(prevState => ({
                courses: prevState.courses.filter(currCourse => currCourse._id !== body._id)
            }))
        })
    }

    //#endregion

    //#region Toggles
    onPracticeClick(event){
        let value = event.currentTarget.value

        this.setState(prevState => ({
            practiceCourse: value,
            practice: !prevState.practice
        }))
    }

    togglePractice() {
        this.setState(prevState => ({
            practice: !prevState.practice,
        }))
    }

    toggleAdding(){
        this.setState( prevState => ({
            adding: !prevState.adding
        }))
    }

    //#endregion

    //#region Actions

    addCourse(newCourse){
        this.setState( prevState => ({
            courses: [...prevState.courses, newCourse]
        }))
    }

    getCourseFromState(id){
        let course = this.state.courses.find(course => {
            return course._id == id
        })

        return course
    }

    //#endregion

    //#region render Methods
    renderAdding(){
        return <AddCourseModal onChangeState={this.toggleAdding} onAdd={this.addCourse} />
    }

    renderPractice(){
        let course = this.getCourseFromState(this.state.practiceCourse)

        return <PracticeCourseModal onChangeState={this.togglePractice} course={course} />
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
                                    <Button variant="contained" color="secondary" style={{margin:'5px'}} value={course._id} onClick={this.deleteCourse} >Delete</Button>
                                    <Button variant="contained" color="primary" style={{margin:'5px'}} value={course._id} onClick={this.onPracticeClick}>Practice</Button>
                                </TableCell>
                            </TableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
                <Button variant="contained" style={buttons} onClick={this.toggleAdding}>Create New Course</Button>

                {this.state.adding ? this.renderAdding() : null}
                {this.state.practice ? this.renderPractice() : null}
            </div>
        )
    }
    //#endregion
}

export default DefinitionHelperPage