import React, {Component} from 'react'
import DefinitionsTable from '../components/DefinitionTable'

class CourseManagementPage extends Component{

    //#region init

    //#region Render Methods
    
    render(){
        return <DefinitionsTable location={this.props.location} />
    }

    //#endregion
}

export default CourseManagementPage