<template>
    <div class="compatibility-index">
        <div class="banner-div">
            <img :src="carouselData[0].imgUrl" style="height: 100%; width: 100%">
            <el-button class="application-btn" @click="jumpPage(carouselData[0].url)">前往申请</el-button>
            <el-button 
                class="record-btn" 
                @click="jumpPage('/mtl_test_platform/page/expertServices/serviceOrdersList')"
            >
                查看记录
            </el-button>
        </div>
        <service-advantages />
        <div class="copy-right-div">
            <div class="copy-right-title">雷火测试中心</div>
            <div class="copy-right">网易公司版权所有 ©雷火测试中心 Copyright Leihuo. All Rights Reserved</div>
        </div>
    </div>
</template>

<script>
    import serviceAdvantages from '@/components/Common/ServiceAdvantages.vue'
    export default {
        components: {
            serviceAdvantages
        },
        data() {
            return {
                carouselData: [
                    {
                        url: '/mtl_test_platform/page/expertServices/compatibility',
                        imgUrl: require('@/assets/img/banner_expertCompatibility.png')
                    }
                ]
            }
        },
        props:{
            
        },
        created(){
        },
        mounted(){
            
        },
        computed:{
            
        },
        watch:{
        },
        methods:{
            jumpPage(url) {
                window.location.href = url;
            }
        },
    }
</script>
    
<style lang="less" scoped>
    .compatibility-index {
        margin-top: 64px;
    }
    .banner-div {
        width: 100%;
        height: 447px;
        position: relative;
    }
    .application-btn {
        position: absolute;
        left: 18%;
        top: 80%;
        height: 28px;
        width: 110px;
        padding: 4px 0;
        text-align: center;
        border-radius: 20px;
        background: #fff;
        border: none;
        color: #6177FF;
        font-size: 14px;
        line-height: 20px;
    }
    .record-btn {
        position: absolute;
        left: calc(18% + 120px);
        top: 80%;
        height: 28px;
        width: 110px;
        padding: 4px 0;
        text-align: center;
        border-radius: 20px;
        border: 1px solid #ffffff;
        color: #ffffff;
        font-size: 14px;
        line-height: 20px;
        background: #6177FF;
    }
    .copy-right-div {
        width: 100%;
        margin: 40px 0;
        color: #999999;
        font-size: 14px;
        text-align: center;
    }
     .copy-right{
        margin-top: 18px;
    }
    .copy-right-title{
        font-weight: 700
    }
</style>