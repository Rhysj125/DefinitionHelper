import {ConnectionString} from './Connection'

const postCourse = async (course) =>{
    return fetch(ConnectionString + '/course', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(course),
    }).then(response => {
        return response.json()
    })
}

const getCourses = async () => {
    return fetch(ConnectionString + `/Courses`, {
        headers: {
            'content-type' : 'application/json',
            'accept' : 'application/json'
        }
    }).then(response => {
        return response.json()
    })
}

const deleteCourse = async (courseID) => {
    return fetch(ConnectionString + '/Course/' + courseID, {
        method: 'DELETE',
        headers: {
            'content-type' : 'application/json',
            'accept' : 'application/json'
        }
    }).then(response => {
        return response.json()
    })
}

export{
    getCourses,
    postCourse,
    deleteCourse
}