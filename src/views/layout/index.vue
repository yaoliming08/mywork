<template>
    <div class="layout-box">
        <layoutHed/>
        <appMain/>
    </div>
</template>

<script setup>

import layoutHed from '../layout/component/layout-hed.vue';
import appMain from '../layout/component/app-main.vue';



</script>

<style lang="scss" scoped>
.layout-box{
    background-color: #FFFF;
    color: #000000;
    font-size: 18px;
    height: 100vh;
    padding-top: 70px;
}

</style>