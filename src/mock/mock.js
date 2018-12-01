import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers } from './data/user';

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        const mock = new MockAdapter(axios);
        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success',
        });
        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure',
        });
        // // 登录
        // mock.onPost('/login').reply((config) => {
        //     const { username, password } = JSON.parse(config.data);
        //     return new Promise((resolve, reject) => {
        //         let user = null;
        //         setTimeout(() => {
        //             const hasUser = LoginUsers.some((u) => {
        //                 if (u.username === username && u.password === password) {
        //                     user = JSON.parse(JSON.stringify(u));
        //                     user.password = undefined;
        //                     return true;
        //                 }
        //             });
        //
        //             if (hasUser) {
        //                 resolve([200, { code: 200, msg: '请求成功', user }]);
        //             } else {
        //                 resolve([200, { code: 500, msg: '账号或密码错误' }]);
        //             }
        //         }, 100);
        //     });
        // });
        //
        // // 获取用户列表
        // mock.onGet('/person/list').reply((config) => {
        //     const mockPersons = _Persons;
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve([200, {
        //                 persons: mockPersons,
        //             }]);
        //         }, 100);
        //     });
        // });
        // // 获取用户列表（分页）
        // mock.onGet('/person/listpage').reply((config) => {
        //     const { page, name } = config.params;
        //     let mockPersons = _Persons;
        //     const total = mockPersons.length;
        //     mockPersons = mockPersons.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve([200, {
        //                 total,
        //                 persons: mockPersons,
        //             }]);
        //         }, 100);
        //     });
        // });
        //
        // // 删除用户
        // mock.onGet('/person/remove').reply((config) => {
        //     const { name } = config.params;
        //     _Persons = _Persons.filter(u => u.name !== name);
        //     savePersons();
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve([200, {
        //                 code: 200,
        //                 msg: '删除成功',
        //             }]);
        //         }, 50);
        //     });
        // });
        //
        // // 批量删除用户
        // mock.onGet('/person/batchremove').reply((config) => {
        //     let { names } = config.params;
        //     names = names.split(',');
        //     _Persons = _Persons.filter(u => !names.includes(u.name));
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             resolve([200, {
        //                 code: 200,
        //                 msg: '删除成功',
        //             }]);
        //         }, 50);
        //     });
        // });
        //
        // // 编辑用户
        // mock.onGet('/person/edit').reply((config) => {
        //   const {  name, group,department,department2,avatar, state } = config.params;
        //         _Persons.some((u) => {
        //             if (u.name === name) {
        //                 u.name = name;
        //                 u.group = group,
        //                 u.department = department,
        //                 u.department2 = department2,
        //                 u.avatar = avatar,
        //                 u.state = state;
        //             }
        //         });
        //         return new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 resolve([200, {
        //                     code: 200,
        //                     msg: '编辑成功',
        //                 }]);
        //             }, 50);
        //         });
        // });
        //
        // // 新增用户
        // mock.onGet('/person/add').reply((config) => {
        //         const {  name, group,department,department2,avatar, state } = config.params;
        //         _Persons.push({
        //           name,
        //           group,
        //           department,
        //           department2,
        //           avatar,
        //           state,
        //         });
        //         return new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 resolve([200, {
        //                     code: 200,
        //                     msg: '新增成功',
        //                 }]);
        //             }, 50);
        //         });
        // });
        //
        // // 改变这个用户的状态
        // mock.onGet('/person/changestate').reply((config)=>{
        //   let { currentState,currentName } = config.params;
        //   _Persons.some((u) => {
        //     if (u.name === currentName&&u.state==true) {
        //       u.state=false;
        //     }
        //     else if(u.name === currentName&&u.state==false){
        //       u.state=true;
        //     }
        //   });
        //   return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //       resolve([200, {
        //         code: 200,
        //         msg: '更改成功',
        //       }]);
        //     }, 50);
        //   });
        // });
    },
};
