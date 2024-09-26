<template>
    <div class="financing-dynamics">
        <div class="financing-title">

            <h3>融资动态</h3>
            <p>CREDIT SUPERMARKET</p>
        </div>
        <div class="financing-box">
            <div>
                <img src="@/assets/img/home/financing01.png" alt="">

            </div>
            <div>
                <img src="@/assets/img/home/financing02.png" alt="">

            </div>

        </div>
       
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.financing-dynamics{
    padding-top: 30px;
    color: #333333;
    .financing-title{
        text-align: center;
        margin-bottom: 50px;
        h3{
            font-size: 28px;
        }
    }
    .financing-box{
        display: flex;
        justify-content: center;
        >div{

            width: 35%;
            margin-right: 20px;
            height: 200px;
            img{
                width: 100%;
            }
   
        }


    }


}

</style>