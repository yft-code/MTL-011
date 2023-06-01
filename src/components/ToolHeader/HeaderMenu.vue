<template>
    <div class="header-menu" :class="isDarkStyle ? 'dark-style' : ''"> 
        <div 
            class="menu-item handle-sub-menu"
            :class="subMenuInfo.currentType === 'product' ? 'cur-menu-item' : ''"
            @mouseenter="setSubMenu('product')"
        >
            <span>产品服务</span>
        </div>
        <div 
            v-if="isAdmin || isContact || !isTester"
            class="menu-item handle-sub-menu"
            :class="[
                subMenuInfo.currentType === 'service' ? 'cur-menu-item' : '',
                $route.path === '/mtl_test_platform/page/expertServices' ? 'active-menu' : ''
            ]"
            @mouseenter="setSubMenu('service')"
        >
            <span>专家服务</span>
        </div>
        <div 
            v-if="isAdmin || isTester"
            class="menu-item"
            :class="$route.path.indexOf('/mtl_test_platform/page/workstation') !== -1 ? 'is-active': ''"
            @click="jumpToWorkstation"
        >
            <span>工作站</span>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        props: {
            isDarkStyle: {
                type: Boolean
            }
        },
        computed:{
            ...mapState(["isHover", "isShowSubMenu", "subMenuInfo", "isTester", "isAdmin", "isContact"]),
            isWorkstation() {
                return this.$route.path === '/mtl_test_platform/page/workstation';
            }
        },
        methods: {
            // 设置子菜单显示状态
            setSubMenu(type) {
                let subMenuInfo = {
                    product: false,
                    service: false,
                    currentType: type
                };
                subMenuInfo[type] = true;
                this.$store.commit('setSubMenuInfo', subMenuInfo);
            },

            jumpToWorkstation() {
                this.$router.push({ path: '/mtl_test_platform/page/workstation/myMission'});
            }
        },
    }
</script>
<style lang="less" scoped>
    .header-menu {
        display: flex;
        align-items: center;
        flex: 1;
        color: #fff;
        margin-left: 45px;
        box-shadow: none !important;
    }
    .dark-style {
        color: #333333;
    }
    .menu-item {
        font-size: 16px;
        cursor: pointer;
        padding: 0 25px;
        font-weight: 700;
    }
    .menu-item:hover, .cur-menu-item {
        color: #03E2EF;
    }
    .dark-style 
    .menu-item:hover, 
    .dark-style 
    .cur-menu-item {
        color: #156EEF;
    }
    .active-menu {
        color: #156EEF;
        font-weight: 700;
        border-bottom: 2px solid #156EEF;
    }
    .is-active{
        border-bottom: 2px solid #4876f2;
        color: #303133;
    }
</style>