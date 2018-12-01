<template>
    <py-row class="tac container">
        <py-col :span="24" class="header">
            <py-col  class="logo">
                <img class="logoUrl" :src="logoUrl" /><span class="txt">品友抽奖</span>
            </py-col>
            <py-col :span="12">
                <py-menu :default-active="$route.path" mode="horizontal" @open="handleopen" @close="handleclose" @select="handleselect"
                         unique-opened router background-color="#324157"
                         text-color="#bfcbd9"
                         active-text-color="#20a0ff">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <py-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.menuName}}</template>
                            <py-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.menuName}}</py-menu-item>
                        </py-submenu>
                        <py-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</py-menu-item>
                    </template>
                </py-menu>
            </py-col>
            <py-col :span="2" class="userinfo">
                <py-dropdown trigger="hover">
                    <span class="py-dropdown-link userinfo-inner"><i class="fa fa-user-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <py-dropdown-menu slot="dropdown">
                        <py-dropdown-item divided @click.native="logout">退出登录</py-dropdown-item>
                    </py-dropdown-menu>
                </py-dropdown>
            </py-col>
        </py-col>
        <py-col :span="24" class="main">
            <div class="content-container bg-purple-light">
                <py-col :span="24" class="breadcrumb-container">
                    <!--<strong class="title"></strong>-->
                </py-col>
                <py-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>

                </py-col>
            </div>
        </py-col>
    </py-row>
</template>

<script>
    import { logout } from '../api/api';
    import logoUrl from '../assets/logo.svg';
    export default {
        data() {
            return {
              logoUrl:logoUrl,
            };
        },
        computed: {
        },
        methods: {
            // 退出登录
            logout() {
                let _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    // type: 'warning'
                }).then(() => {
                    requestLogout();
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                });
            },
            handleopen() {
                // console.log('handleopen');
            },
            handleclose() {
                // console.log('handleclose');
            },
            handleselect(a, b) {
            },
        }
    }
</script>

<style scoped>
    .container{
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header{
            height: 60px;
            line-height: 60px;
            background: #324157;
            color:black;
            width:100%;
            .py-menu{
                .py-menu-item.is-active{
                    border-bottom: 5px solid #20a0ff;
                }
            }
            .py-menu-demo i{
                font-size:16px;
            }
            .logo {
                width:220px;
                height:60px;
                font-size: 22px;
                padding-left:20px;
                padding-right:20px;
                img.logoUrl {
                    width:30px;height:60px;line-height:60px;margin-right:4px;
                    float:left;
                    -webkit-animation:circle 10s infinite ease-in-out;
                    @-webkit-keyframes circle{
                        0%{ transform:rotateY(0deg); }
                        80%{ transform:rotateY(0deg); }
                        100%{ transform:rotateY(-360deg); }
                    }
                }
                .txt {
                    color:#fff;
                    height:60px;
                    line-height:60px;
                    display:inline-block;
                    float:left;
                }
            }
            .userinfo{
                text-align: right;
                float: right;
                color:#fff;
                .userinfo-inner {
                    cursor: pointer;
                    i{
                        color:#fff;
                        font-size:20px;
                    }
                }
            }
        }
    }
    .main {
        overflow: hidden;
        display: flex;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
        aside {
            .py-menu{
                height:100%;
                width:100%;
                /*background-color: #e9e9e9;*/
            }
        }
        .content-container{
            overflow-y: auto;
            width:100%;
            background-color: #f0f0f0;
        }
    }
</style>
