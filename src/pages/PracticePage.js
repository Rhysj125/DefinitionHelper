import React, {Component} from 'react'
import Loading from '../components/utils/Loading'

class PracticePage extends Component{

    //#region init

    constructor(props){
        super(props)

        this.state = {
            definitions: [],
            courseID: null,
            URL: 'http://localhost:5000'
        }

        this.getDefinitions = this.getDefinitions.bind(this)
    }

    componentDidMount() {

        this.simulateWait()
        /*const params = new URLSearchParams(this.props.location.search)
        
        const dbDefinitions = this.getDefinitions(params.get('id')).then(dbDefinitions => {

            this.setState({
                loading: true
            })

            return dbDefinitions.map((definition) => {
                return {
                    ...definition,
                    practiced: false
                }
            })
        })

        dbDefinitions.then(results => {
            this.setState({
                definitions: results,
                courseID: params.get('id'),
                practiceMode: params.get('mode'),
                loading: false
            })
        })*/
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

    //#endregion

    //#region Actions

    // Get a random question that has not yet been done this practice session
    getRandomQuestion(){
        let unpracticedQuestions = this.state.definitions.filter(currentDefinition => currentDefinition.practiced !== false)

        let numberOfDefinitions = unpracticedQuestions.length - 1

        let questionIndex = (Math.floor(Math.random() * (+numberOfDefinitions)))
    }

    // Get three random answers that does not match current answer.
    getRandomThreeAnswers(definitionID){
        let topThreeQuestions = [].concat(this.state.definitions)
            .filter(currentDefinition => 
                currentDefinition._id !== definitionID)
            .map(questions => {
                let rand = (Math.floor(Math.random() * (+1000)))
                return {
                    ...questions,
                    order: rand
                }
            }).sort((a, b) => {
                return a.order - b.order
            })

        if(topThreeQuestions.length > 3){
            return topThreeQuestions.slice(0, 3)
        }else{
            return topThreeQuestions
        }
    }

    simulateWait = () =>{
        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
    }

    //#endregion

    //#region Render Methods

    renderLoading(){
        return <Loading />
    }

    render(){
        console.log(this.state)

        return (
            <div>
                {this.state.loading ? this.renderLoading() : null}

                Hello something behind me
            </div>
        )
    }

    //#endregion

}

export default PracticePage