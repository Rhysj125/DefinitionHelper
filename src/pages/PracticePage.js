import React, {Component} from 'react'

class PracticePage extends Component{

    constructor(props){
        super(props)

        this.state = {
            definitions: [],
            courseID: null
        }

        this.getDefinitions = this.getDefinitions.bind(this)
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search)

        this.getDefinitions(params.get('id')).then(dbDefinitions => {
            this.setState({
                definitions: dbDefinitions,
                courseID: params.get('id'),
                practiceMode: params.get('mode')
            })
        })
    }

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

    render(){
        return null
    }

}

export default PracticePage