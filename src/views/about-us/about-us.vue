<template>
    <div class="about-us">

      <img class="about-bg" src="@/assets/data/dataBG3.png" alt="" />

      <div class="about-us-box">
        <div class="about-title">关于我们</div>
        <div class="about-count">
          <p class="about-text">公共数据运营服务平台运用公共数据为金融机构提供综合解决方案的服务商，旨在为广大金融机构、企业和个人客户提供高质量、高效率的金融服务。作为该领域的先行和推动者，我们一直致力于研发和应用最先进的科技手段，以满足客户的多样化需求。我们的团队     由一群经验丰富、技术精湛的专业人士组成，涵盖了人工智能、金融、科技、市场等多个领域，为客户提供量身定制的金融解决方案。
            涵盖了人工智能、金融、科技、市场等多个领域，为客户提供量身定制的金融解决方案。</p>
          <img class="about-img" src="@/assets/data/dataBG4.png" alt="" />
        </div>
        <div class="about-title">联系我们</div>
        <div class="bottom-img-box">
          <img class="bottom-img" src="@/assets/data/dataBG6.png" alt="" />
        </div>

  

      </div>


    </div>
    <bottom/>
  </template>
  
  <script setup>

  import bottom from '@/components/bottom.vue'
  </script>
  
  <style lang="scss" scoped>
  .about-us {
    .about-bg{
      width: 100%;
      height: 390px;
    }

    .about-us-box{
      .about-title{
        text-align: center;
        font-weight: 600;
        font-size: 34px;
        margin: 30px 0;
        
      }
      .about-count{
        display: flex;
        justify-content: center;
        .about-text{
          width: 600px;
          margin-right: 60px;
          color: #666666;
          font-size: 18px;
          line-height: 30px;
          margin-top: 32px;
        }
        .about-img{
          width: 574px;
          height: 303px;
        }
      }

    }

    .bottom-img-box{
      display: flex;
      justify-content: center;
      .bottom-img{
        width: 1235px;
        padding-top: 20px;

      }
    }

  }
  </style>
  