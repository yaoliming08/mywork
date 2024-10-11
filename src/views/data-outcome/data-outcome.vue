<template>
    <div class="outcome-box">
        <img src="@/assets/img/bg/outcome.png" alt="">
    </div>

    <Bottom />
</template>

<script setup>

import Bottom from "@/components/bottom.vue";
import { getDtresAndQuota, authCheck } from "@/api/login";

import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

</script>

<style lang="scss" scoped>

.outcome-box{
    display: flex;
    justify-content: center;
    position: relative;
    img{
        width: 100%;
    }

}

</style>