import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

            this.toggleQuestionAnswered()
        }
    }

    //#endregion

    //#region toggles

    toggleQuestionAnswered(){
        this.setState({
            questionAnswered: true
        })

        setTimeout(() => {
            this.props.nextQuestion(this.props.currentQuestion)
        }, 300)
    }

    //#endregion

    //#region Render Methods

    render(){
        const { classes } = this.props;

        return this.props.answers.map(currentQuestion => {
            return (
                <Card className={classes.card} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave} onClick={this.handleClick(currentQuestion)}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {currentQuestion.answer}
                        </Typography>
                    </CardContent>
                </Card>
            )
        })

        return null
    }

    //#endregion

}

export default withStyles(styles)(AnswerCards)