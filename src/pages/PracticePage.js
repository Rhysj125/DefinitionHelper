import React, {Component} from 'react'
import Loading from '../components/utils/Loading'
import QuestionCard from '../components/QuestionCard'
import AnswerCards from '../components/AnswerCards'
import {getDefinition} from '../data-access/Definition'

class PracticePage extends Component{

    //#region init

    constructor(props){
        super(props)

        this.state = {
            definitions: [],
            courseID: null
        }
    }

    componentDidMount() {

        const params = new URLSearchParams(this.props.location.search)
        
        getDefinition(params.get('id')).then(dbDefinitions => {
            this.setState({
                loading: true
            })

            return dbDefinitions.map((definition) => {
                return {
                    ...definition,
                    practiced: false
                }
            })
        }).then(results => {
            this.setState({
                definitions: results,
                courseID: params.get('id'),
                practiceMode: params.get('mode'),
                loading: false
            })
        })
    }

    //#endregion

    //#region Actions

    // Get a random question that has not yet been done this practice session
    getRandomQuestion(){
        let unpracticedQuestions = this.state.definitions.filter(currentDefinition => currentDefinition.practiced !== true)

        let numberOfDefinitions = unpracticedQuestions.length - 1

        let questionIndex = (Math.floor(Math.random() * (+numberOfDefinitions)))

        return unpracticedQuestions[questionIndex]
    }

    // Get three random answers that does not match current answer.
    getRandomAnswers(question){
        let topThreeQuestions = [].concat(this.state.definitions)
            .filter(currentDefinition => 
                currentDefinition._id !== question._id)
            .map(questions => {
                return {
                    ...questions,
                    order: (Math.floor(Math.random() * (+1000))),
                    correctAnswer: false
                }
            }).sort((a, b) => {
                return a.order - b.order
            })

        if(topThreeQuestions.length > 3){
            return this.addCorrectAnswerAndSort(question, topThreeQuestions.slice(0, 3))
        }else{
            return this.addCorrectAnswerAndSort(question, topThreeQuestions)
        }
    }

    getCurrentQuestionNumber(){
        return this.state.definitions.filter(currentDefinition => currentDefinition.practiced === true).length + 1
    }

    // Returns the correct property of the question object depending on
    // which mode has been chosen by the user
    getQuestionBasedOnMode(question){
        if(this.state.practiceMode == 'word'){
            return question.word
        }else if(this.state.practiceMode == 'definition'){
            return question.definition
        }else{
            return 'Something went Wrong'
        }
    }

    // Returns the correct list of property of the answer object array depending on
    // which mode has been chosen by the user
    getAnswersBasedOnMode(answers){
        if(this.state.practiceMode == 'word'){
            return answers.map(currentAnswer => {
                return  {
                    answer : currentAnswer.definition,
                    correct: currentAnswer.correctAnswer
                }
            })
        }else if(this.state.practiceMode == 'definition'){
            return answers.map(currentAnswer => {
                return {
                    answer : currentAnswer.word,
                    correct: currentAnswer.correctAnswer
                }
            })
        }else{
            return []
        }
    }

    getCorrectAnswer(){

    }

    addCorrectAnswerAndSort(question, answers){
        answers.push({
            ...question,
            order: Math.floor(Math.random() * (+1000)),
            correctAnswer: true
        })

        return answers.sort((a, b) => {
            return a.order - b.order
        })
    }

    //#endregion

    //#region Render Methods

    renderLoading(){
        return <Loading />
    }

    render(){
        let question = this.getRandomQuestion()

        let answers = question ? this.getRandomAnswers(question) : null

        return (
            <div>
                <QuestionCard questionNumber={this.getCurrentQuestionNumber()} 
                    totalQuestions={this.state.definitions.length} question={this.getQuestionBasedOnMode(question)} />
                
                <AnswerCards answers={answers ? this.getAnswersBasedOnMode(answers) : []} />

                {this.state.loading ? this.renderLoading() : null}
            </div>
        )
    }

    //#endregion

}

export default PracticePage