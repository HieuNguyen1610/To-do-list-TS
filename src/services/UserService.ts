import axios from './axios/InstanceAxios'

const fetchAllUsers = (page:number) => {
    return axios.get(`api/users?page=${page}`)
}

const fetchUser = (id:any) => {
    return axios.get(`api/users/${id}`)
}

export {fetchAllUsers, fetchUser}