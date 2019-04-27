import React, {Component} from 'react'
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from '@material-ui/core';
import {Redirect} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

class DefinitionTable extends Component{

    //#region init

    constructor(props){
        super(props)

        this.state = {
            definitions: [],
            adding: false,
            redirect: false,
            redirectTo: null,
            word: null,
            definition: null,
            courseID: null,
            //URL: 'http://46.101.47.14:5000'
            URL: 'http://localhost:5000'
        }

        this.getDefinitions = this.getDefinitions.bind(this)
        this.deleteDefinition = this.deleteDefinition.bind(this)
        this.toggleAdding = this.toggleAdding.bind(this)
        this.toggleRedirect = this.toggleRedirect.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.save = this.save.bind(this)
        this.deleteClick = this.deleteClick.bind(this)
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search)

        this.getDefinitions(params.get('id')).then(dbCourses => {
            this.setState({
                definitions: dbCourses,
                courseID: params.get('id')
            })
        })

    }

    //#endregion

    //#region State Toggles

    toggleAdding(){
        this.setState(prevState => ({
            adding: !prevState.adding
        }))
    }

    toggleRedirect(event){
        const value = event.currentTarget.value

        this.setState(prevState => ({
            redirect: !prevState.redirect,
            redirectTo: value
        }))
    }

    //#endregion

    //#region API Calls

    getDefinitions = async (id) => {
        //const response = 
        return fetch(`${this.state.URL}/definitions/${id}`, {
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json'
            }
        }).then(response => {
            return response.json()
        })
    }

    postDefinition = async (definition) => {
        fetch(`${this.state.URL}/definition`, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(definition)
        }).then(response => {
            return response.json()
        }).then(definition =>{         
            this.setState(prevState => ({
                definitions: [...prevState.definitions, definition],
                adding: !prevState
            }))
        })
    }

    deleteDefinition = async (id) => {
        fetch(`${this.state.URL}/definition/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type' : 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(definition => {
            console.log(definition)

            this.setState(prevState => ({
                definitions: prevState.definitions.filter(curDefinition => curDefinition._id !== definition._id)
            }))
        })
    }
    
    //#endregion

    //#region Actions

    handleTextChange = name => event =>{
        this.setState({
            [name]: event.target.value
        })
    }

    save(){
        const definition = {
            word: this.state.word,
            definition: this.state.definition,
            courseID: this.state.courseID
        }

        console.log(JSON.stringify(definition))

        this.postDefinition(definition)
    }

    deleteClick(event){
        const id = event.currentTarget.value

        this.deleteDefinition(id)
    }

    //#endregion

    //#region Render Methods

    renderAdding(){
        return (
            <TableRow>
                <TableCell>
                    <TextField placeholder='Word' onChange={this.handleTextChange('word')}/>
                </TableCell>
                <TableCell>
                    <TextField placeholder='Definition' onChange={this.handleTextChange('definition')} />
                </TableCell>
                <TableCell className='td-action'>
                    <Button variant='contained' color='primary' style={{margin:'5px'}} onClick={this.save}><SaveIcon /></Button>
                    <Button variant='contained' color='secondary' style={{margin:'5px'}} onClick={this.toggleAdding}><CancelIcon /></Button>
                </TableCell>
            </TableRow>
        )
    }

    renderRedirect(){
        return <Redirect to={`/${this.state.redirectTo}`} />
    }

    render(){
        return (
            <div>
                <Button variant='contained' style={{margin: '5px', float:'right'}}>
                    practice
                </Button>

                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Word</TableCell>
                            <TableCell>Definition</TableCell>
                            <TableCell className='td-action'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <div className='table-definition'>
                <Table >
                    <TableBody>
                        {
                            this.state.definitions.map((definition) => {                        
                                return (
                                    <TableRow>
                                        <TableCell className='td-word'>
                                            {definition.word}
                                        </TableCell>
                                        <TableCell className='td-definition'>
                                            {definition.definition}
                                        </TableCell>
                                        <TableCell className='td-action'>
                                            <Button variant="contained" color="secondary" style={{margin:'5px'}} value={definition._id} onClick={this.deleteClick}>
                                                <DeleteIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    )
                                })
                        }
                        {this.state.adding ? this.renderAdding() : null}
                    </TableBody>
                </Table>
                </div>

                <Button variant='contained' color='default' value='Lilli' style={{margin:'5px'}} onClick={this.toggleRedirect}>
                    <BackIcon />
                </Button>
                <Button variant='contained' style={{margin:'5px', background:'Green'}} onClick={this.toggleAdding}>
                    <AddIcon />
                </Button>
                {this.state.redirect ? this.renderRedirect() : null}
            </div>
        )
    }
}

export default DefinitionTable