<template>
    <div class="index">
        <div class="banner-div">
            <el-carousel height="642px" arrow="never">
                <el-carousel-item v-for="item in carouselData" :key="item.id">
                    <el-image 
                        class="banner"
                        :src="item.imgUrl"
                        @click="jumpPage(item.url)" 
                    />
                </el-carousel-item>
            </el-carousel>
        </div>
        <product-content />
        <solution-content />
        <project-list />
        <div class="copy-right-div">
            <div class="copy-right-title">雷火测试中心</div>
            <div class="copy-right">网易公司版权所有 ©雷火测试中心 Copyright Leihuo. All Rights Reserved</div>
        </div>
    </div>
</template>

<script>
    import productContent from '@/components/Index/ProductContent.vue'
    import solutionContent from '@/components/Index/SolutionContent.vue'
    import projectList from '@/components/Index/ProjectList.vue'
    export default {
        components: {
            productContent,
            solutionContent,
            projectList
        },
        data() {
            return {
                carouselData: [
                    {
                        url: 'http://mtl-index.leihuo.netease.com:30050/mtl_index/page/index',
                        imgUrl: require('@/assets/img/mtl_banner.jpg'),
                        id: '1',
                    }
                ]
            }
        },
        methods:{
            jumpPage(url){
                window.location.href = url;
            }
        },
    }
</script>
    
<style lang="less" scoped>
    .banner-div {
        width: 100%;
        height: 642px;
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
        font-weight: 700;
    }
</style>