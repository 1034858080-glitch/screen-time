<template>
    <div class="indexmain">
        <h2>首页</h2>
        <p><van-button type="primary" @click="goDetail('/apple')">苹果</van-button></p>
        <p><van-button type="primary" @click="goDetail('/xiaomi')">小米</van-button></p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goDetail = (url) => {
    router.push(url)
}
</script>
<style scoped>
.indexmain {
    text-align: center;
    background-color: #fff;
    color: #333;
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

p {
    margin-top: 25px;
}
</style>