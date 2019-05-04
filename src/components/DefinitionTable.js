import React, {Component} from 'react'
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from '@material-ui/core';
import {Redirect} from 'react-router-dom'
import PracticeCourseModal from './PracticeCourseModal'
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import {getDefinition, deleteDefinition, postDefinition} from '../data-access/Definition'

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
            practice: false
        }

        this.toggleAdding = this.toggleAdding.bind(this)
        this.toggleRedirect = this.toggleRedirect.bind(this)
        this.togglePractice = this.togglePractice.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.save = this.save.bind(this)
        this.deleteClick = this.deleteClick.bind(this)
        this.renderPractice = this.renderPractice.bind(this)
    }

    componentDidMount(){
        const params = new URLSearchParams(this.props.location.search)

        getDefinition(params.get('id')).then(dbDefinitions => {
            this.setState({
                definitions: dbDefinitions,
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

    togglePractice(){
        this.setState(prevState => ({
            practice: !prevState.practice
        }))
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

        postDefinition(definition).then(definition =>{         
            this.setState(prevState => ({
                definitions: [...prevState.definitions, definition],
                adding: !prevState
            }))
        })
    }

    deleteClick(event){
        const id = event.currentTarget.value

        deleteDefinition(id).then(definition => {
            console.log(definition)

            this.setState(prevState => ({
                definitions: prevState.definitions.filter(curDefinition => curDefinition._id !== definition._id)
            }))
        })
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

    renderPractice(){
        return <PracticeCourseModal id={this.state.courseID} onChangeState={this.togglePractice} />
    }

    render(){
        return (
            <div>
                <Button variant='contained' style={{margin: '5px', float:'right'}} value='practice' onClick={this.togglePractice}>
                    practice
                </Button>

                <div className="tablePractice">
                    <Table>
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
                </div>

                <Button variant='contained' color='default' value='Lilli' style={{margin:'5px'}} onClick={this.toggleRedirect}>
                    <BackIcon />
                </Button>
                <Button variant='contained' style={{margin:'5px', background:'Green'}} onClick={this.toggleAdding}>
                    <AddIcon />
                </Button>
                {this.state.redirect ? this.renderRedirect() : null}
                {this.state.practice ? this.renderPractice() : null}
            </div>
        )
    }
}

export default DefinitionTable