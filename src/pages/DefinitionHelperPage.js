import React, {Component} from 'react'
import { Button } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCourseModal from '../components/AddCourseModal'

const buttons = {
    margin:'5px'
}

class DefinitionHelperPage extends Component{

    

    constructor(props){
        super(props)

        this.state = {
            adding: false,
            courses: [],
            URL: 'http://46.101.47.14:5000'
            //URL: 'http://localhost:5000'
        }

        this.getCourses = this.getCourses.bind(this)
        this.renderAdding = this.renderAdding.bind(this)
        this.toggleAdding = this.toggleAdding.bind(this)
        this.deleteCourse = this.deleteCourse.bind(this)
        this.addCourse = this.addCourse.bind(this)
    }

    componentDidMount(){
        this.getCourses().then((dbCourses) => {
            this.setState({
                courses: dbCourses
            })
        })
    }

    getCourses = async () => {
        const response = await fetch(this.state.URL + `/Courses`, {
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json'
            }
        })
        
        const body = await response.json()

        if (response.status !== 200){
            console.log(body.message)
        }

        return body
    }

    async deleteCourse(event){
        let value = event.currentTarget.value

        const response = await fetch(this.state.URL + '/Course/' + value, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json'
            }
        })
        
        const body = await response.json()

        console.log(body)

        this.setState(prevState => ({
            courses: prevState.courses.filter(currCourse => currCourse._id !== body._id)
        }))

        console.log(this.state.courses)

    }

    getEachCourseRow(){
        this.state.courses.map((course) => {
            console.log(course.courseName)
            
            return(
                <TableRow>
                    <TableCell>
                        {course.courseName}
                    </TableCell>
                </TableRow>
            )
        })
    }

    addCourse(newCourse){
        this.setState( prevState => ({
            courses: [...prevState.courses, newCourse]
        }))
    }

    toggleAdding(){
        this.setState( prevState => ({
            adding: !prevState.adding
        }))
    }

    renderAdding(){
        return <AddCourseModal onChangeState={this.toggleAdding} onAdd={this.addCourse} />
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
                                    <Button variant="contained" color="primary" style={{margin:'5px'}}>Practice</Button>
                                </TableCell>
                            </TableRow>
                            )
                        })
                    }
                    </TableBody>
                </Table>
                <Button variant="contained" style={buttons} onClick={this.toggleAdding}>Create New Course</Button>

                {this.state.adding ? this.renderAdding() : null}
            </div>
        )
    }
}

export default DefinitionHelperPage