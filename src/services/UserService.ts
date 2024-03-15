import axios from './axios/InstanceAxios'

const fetchAllUsers = () => {
    return axios.get('api/users?page=1')
}

const fetchUser = (id:any) => {
    return axios.get(`api/users/${id}`)
}

export {fetchAllUsers, fetchUser}