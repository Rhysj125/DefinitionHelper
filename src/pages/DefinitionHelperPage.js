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
            courses: []
        }

        this.getCourses = this.getCourses.bind(this)
        this.renderAdding = this.renderAdding.bind(this)
        this.toggleAdding = this.toggleAdding.bind(this)
    }

    componentDidMount(){
        this.getCourses().then((dbCourses) => {
            this.setState({
                courses: dbCourses
            })
        })
    }

    getCourses = async () => {
        const response = await fetch(`/courses`)
        const body = await response.json()

        if (response.status !== 200){
            console.log(body.message)
        }

        return body
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

    toggleAdding(){
        this.setState( prevState => ({
            adding: !prevState.adding
        }))
    }

    renderAdding(){
        return <AddCourseModal onChangeState={this.toggleAdding} />
    }

    render(){
        console.log(this.state.courses)

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
                                    <Button variant="contained" color="secondary" style={{margin:'5px'}}>Delete</Button>
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