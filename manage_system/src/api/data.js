import axios from './axios'

export const getMenu = (parmas) => {
  return axios.request({
    url:'/permission/getMenu',
    method:'post',
    data: parmas
  })
}

export const getDate = () => {
  return axios.request({
    url:'/home/getDate',
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    mothod:'get',
    params
  })
}