<template>
    <div class="tool-header" :class=" isDarkStyle ? 'dark-style' : ''">
        <water-mark v-if="userInfo" :input-text="userInfo"></water-mark>
        <div class="header-content">
            <!-- MTL logo -->
            <div @click="jumpToIndex" style="cursor: pointer;">
                <img
                    class="img" 
                    :src="isDarkStyle ? urlDark: urlLight" 
                />
            </div>
            <!-- 导航栏 -->
            <header-menu :is-dark-style="isDarkStyle" />
            <!-- 工具列 -->
            <div class="tool-bar">
                <div v-if="path != '/mtl_test_platform/page/index'" class="tool-item">
                    <project-select class="project-select-component" />
                </div>
                <!-- 登录用户名 -->
                <div @click="showDropdownMenu">
                    <el-dropdown
                        v-if="userInfo" 
                        class="login-user"
                        trigger="click" 
                        @command="removeCookieUser" 
                    >
                        <span class="el-dropdown-link" id="dropdown">
                            {{ userInfo }}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout" @click="removeCookieUser()">登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <div 
                        v-else
                        class="login-div"
                    ></div>
                </div>
            </div>
        </div>
        <div class="header-background-div" :class="isShowBackground ? 'show-background' : ''"></div>
        <sub-menu />
    </div>
</template>

<script>
    import $ from 'jquery'
    import headerMenu from '@/components/ToolHeader/HeaderMenu.vue'
    import subMenu from '@/components/ToolHeader/SubMenu.vue'
    import ProjectSelect from "@/components/ToolHeader/ProjectSelect.vue"
    import waterMark from 'waterMark'
    export default {
        components: {
            headerMenu,
            subMenu,
            ProjectSelect,
            waterMark
        },
        data() {    
			return {
                urlDark:'http://mtl.leihuo.netease.com:8000/site_media/ttd_logo_dark.png',
                urlLight:'http://mtl.leihuo.netease.com:8000/site_media/ttd_logo_light.png',
                isShowBackground: false,
			}
        },
        computed:{
            path(){
                return this.$route.path;
            },
            userInfo () {
                return this.$store.state.currentUserEmail.substring(0, this.$store.state.currentUserEmail.indexOf('@'));
            },
            isHover () {
                return this.$store.state.isHover;
            },
            isDarkStyle () {
                return this.$route.path === '/mtl_test_platform/page/index' ? false : true;
            }
        },
        watch:{
            $route() {
                this.isShowBackground = false;
            }
        },
        created(){
            //获取用户信息
            this.$store.dispatch('getUserEmail');
            // 获取用户权限
            this.$store.dispatch('getUserAuth');
        },
        mounted() {
            // 监听滚动事件
            this.dealWithScroll();
        },
        beforeDestroy() {
            $('.el-main').scroll(() => { return false });
        },
        methods: {
            // 监听滚动事件
            dealWithScroll() {
                $('.el-main').scroll(() => {
                    let isIndex = this.$route.path === '/mtl_test_platform/page/index';
                    if (isIndex) {
                        if ($('.el-main').scrollTop() > 100) {
                            this.isShowBackground = true;
                        } else {
                            this.isShowBackground = false;
                        }
                    }
                })
            },

            // 跳转到首页
            jumpToIndex() {
                this.$router.push({ path: '/mtl_test_platform/page/index' });
            },

            //登出清cookie
            removeCookieUser() {
                let exp = new Date();
                exp.setTime(exp.getTime() - 1);
                let name = 'QAWEB_SESS';
                document.cookie=`${name}=null;expires=${exp.toGMTString()};path=/;domain=.leihuo.netease.com}`;
                let url = window.location.href;
                window.location.href = url;
            },

            showDropdownMenu() {
                let dropdown = document.getElementById('dropdown');
                dropdown.click();
            },

            jumpToWorkstation() {
                this.$router.push({ path: '/mtl_test_platform/page/workstation/myMission' });
            },

            jumpToWorkTime(){
                this.$router.push({ path: '/mtl_test_platform/page/workTimeCounter' });
            },

            jumpToDocumentCenter() {
                this.$router.push({ path: '/mtl_test_platform/page/documentCenter' });
            },
		},
    }
</script>

<style lang="less" scoped>
    .tool-header{
        margin: 0 auto;
        position: absolute;
        top: 0;
        z-index: 100;
        width: 100%;
        line-height: 64px;
        height: 64px;
        display: flex;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        justify-content: center;
    }
    .dark-style {
        background: #fff;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1);
    }
    .img{
        height:40px;
        vertical-align:middle; 
        margin-left: 40px; 
        text-align: center;
    }
    .header-content {
        position: relative;
        z-index: 1;
        width: 100%;
        display: flex;
    }
    .header-background-div {
        position: absolute;
        top: 0;
        left: 0;
        height: 0px;
        width: 100%;
        background: #112180;
    }
    .show-background {
        height: 64px;
    }
    .logo-div {
        cursor: pointer;
        margin: 12px 40px;
        height: 40px;
        width: 164px;
    }
    .logo-img {
        height: 40px;
        width: 126px;
    }
    .tool-bar {
        display: flex;
        align-items: center;
        position: relative;
        color: #fff;
    }
    .tool-item {
        margin-left: 40px;
        cursor: pointer;
    }
    .tool-item:hover {
        color: #03E2EF;
    }
    .dark-style .tool-item:hover {
        color: #156EEF;
    }
    .dark-style .tool-bar {
        color: #333333;
    }
    .login-user {
        padding: 20px 50px;
        color: #fff;
        cursor: pointer;
    }
    .dark-style .login-user {
        color: #333333;
    }
    .login-div {
        background-image: url('~@/assets/img/login.png');
        height: 25px;
        width: 25px;
        cursor: pointer;
    }
    .dark-style .login-div {
        background-image: url('~@/assets/img/login_dark.png');
    }
    .project-select-component {
        display: inline-block;
        margin-right: 2rem;
    }
</style>