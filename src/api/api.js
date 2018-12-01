import axios from 'axios';

const base = '';

export const requestLogin = params => axios.post(`${base}/login`, params).then(res => res.data);

export const requestLogout = params => axios.get(`${base}/logout`, { params });

export const getPersonList = params => axios.get(`${base}/person/list`, { params });

export const getPersonListPage = params => axios.get(`${base}/person/listpage`, { params });

export const removePerson = params => axios.get(`${base}/person/remove`, { params });

export const batchRemovePerson = params => axios.get(`${base}/person/batchremove`, { params });

export const editPerson = params => axios.get(`${base}/person/edit`, { params });

export const addPerson = params => axios.get(`${base}/person/add`, { params });

export const changePersonState = params => axios.get(`${base}/person/changestate`, { params });

export const exportPerson = params => axios.get(`${base}/person/export`, { params });
