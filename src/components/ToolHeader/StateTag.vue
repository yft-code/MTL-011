<template>
    <div
        :class="state === 'hot' ? 'hot-state-tag' : 
        state === 'new' ? 'new-state-tag' : ''"
    >
        {{ state === 'hot' ? 'HOT' : state === 'new' ? 'NEW' : '' }}
    </div>
</template>

<script>
    export default {
        props: {
            state: {
                type: String
            }
        }
    }
</script>
<style lang="less" scoped>
    .hot-state-tag {
        height: 14px;
        width: 30px;
        background: linear-gradient(90deg, #FF6F64 7.35%, #FF8661 92.81%);
        border-radius: 2px;
        line-height: 14px;
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        margin-left: 5px;
        color: #fff;
    }
    .new-state-tag {
        height: 14px;
        width: 30px;
        background: linear-gradient(90deg, #57AAA4 1.51%, #008E95 100%);
        border-radius: 2px;
        line-height: 14px;
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        margin-left: 5px;
        color: #fff;
    }
</style>