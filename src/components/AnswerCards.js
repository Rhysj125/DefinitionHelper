import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
}

class AnswerCards extends Component{
    
    //#region init
    constructor(props){
        super(props)

        this.state = {
            questionAnswered: false
        }

        this.toggleQuestionAnswered = this.toggleQuestionAnswered.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.answers !== this.props.answers){
            this.setState({
                questionAnswered: false
            })
        }
    }

    //#endregion

    //#region Actions

    handleHover = (event) => {
        if(!this.state.questionAnswered){
            event.currentTarget.style.backgroundColor = 'lightgrey'
        }
    }

    handleLeave = (event) => {
        if(!this.state.questionAnswered){
            event.currentTarget.style.backgroundColor = 'white'
        }
    }

    handleClick = question => event => {
        if(!this.state.questionAnswered){
            if(question.correct){
                event.currentTarget.style.backgroundColor = 'green'
            }else{
                event.currentTarget.style.backgroundColor = 'red'
            }

            this.toggleQuestionAnswered(event.currentTarget)
        }
    }

    //#endregion

    //#region toggles

    toggleQuestionAnswered(eventTarget){
        this.setState({
            questionAnswered: true
        })

        setTimeout(() => {
            this.props.nextQuestion(this.props.currentQuestion)
            eventTarget.style.backgroundColor = 'white'
        }, 2000)
    }

    //#endregion

    //#region Render Methods

    render(){
        const { classes } = this.props;

        return this.props.answers.map(currentQuestion => {
            return (
                <Card style={{marginTop: '5px'}} className={classes.card} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave} onClick={this.handleClick(currentQuestion)}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {currentQuestion.answer}
                        </Typography>
                    </CardContent>
                </Card>
            )
        })
    }

    //#endregion

}

export default withStyles(styles)(AnswerCards)