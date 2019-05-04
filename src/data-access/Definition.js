import {ConnectionString} from './Connection'

const getDefinition = async (id) => {
    return fetch(`${ConnectionString}/definitions/${id}`, {
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err)
    })
}

const deleteDefinition = async (id) => {
    return fetch(`${ConnectionString}/definition/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => {
        return response.json()
    })
}

const postDefinition = async (definition) => {
    return fetch(`${ConnectionString}/definition`, {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(definition)
    }).then(response => {
        return response.json()
    })
}

export{
    getDefinition,
    deleteDefinition,
    postDefinition
}