<template>
    <commonHed />
    <view class="ai-table">

        <image class="bg-img" mode="widthFix" src="@/assets/img/bg3.png" :style="{ 'width': '750rpx' }" />


        <view class="table-line" :class="{ 'isCheck': isCheck === '1' }" @click="checkTab('1')">

            <image v-if="isCheck == '1'" class="img" mode="widthFix" src="@/assets/img/bg4.png"
                :style="{ 'left': 0 }" />
            <text class="text">税务收入</text>
        </view>


        <view class="table-line" :class="{ 'isCheck': isCheck === '2' }" @click="checkTab('2')">
            <image v-if="isCheck == '2'" class="img reversalImg" mode="widthFix" src="@/assets/img/bg4.png"
                :style="{ 'right': 0 }" />
            <text class="text"> 流水采集</text>
        </view>
    </view>
    <view class="ai-table-box">

        <view v-if="isCheck == '1'">

            <u-form labelPosition="left" :model="leftData" :rules="leftData.rules" ref="leftFrom">
                <u-form-item borderBottom prop="userName" label="姓名" labelWidth="90">
                    <u-input v-model="leftData.userName" placeholder="请输入" border="none"
                        placeholderClass="input-line"></u-input>
                </u-form-item>

                <u-form-item prop="idCard" borderBottom label="身份证号" labelWidth="90">
                    <u-input v-model="leftData.idCard" placeholder="请输入" border="none"
                        placeholderClass="input-line"></u-input>
                </u-form-item>

                <u-form-item prop="areaCode" borderBottom label="区域" labelWidth="90" @click="leftShow = true">
                    <u-input v-model="leftData.areaCode" placeholder="请选择" border="none" 
                        placeholderClass="input-line"></u-input>
                </u-form-item>



            </u-form>

            <text class="deal-box">不知道怎么用，查看<text class="deal" @click="goDeal">《操作指南》</text></text>

            <view class="code-box">
                <image class="code-img" mode="widthFix" src="@/assets/img/icon4.png" />
            </view>

            <view class="bottom-line-btn">
                <u-button text="获取二维码" color="#83B4FA" @click="getCode"></u-button>
            </view>


        </view>

        <view v-if="isCheck == '2'">

            <u-form labelPosition="left" :model="dataObj" :rules="dataObj.rules" ref="loginFrom">
                <u-form-item borderBottom prop="bankName" label="银行" labelWidth="90" @click="show = true">
                    <u-input v-model="dataObj.bankName" placeholder="请选择" border="none" disabled
                        placeholderClass="input-line"></u-input>
                </u-form-item>

                <u-form-item prop="userName" borderBottom label="姓名" labelWidth="90">
                    <u-input v-model="dataObj.userName" placeholder="请输入" border="none"
                        placeholderClass="input-line"></u-input>
                </u-form-item>

                <u-form-item prop="idCard" borderBottom label="身份证号" labelWidth="90">
                    <u-input v-model="dataObj.idCard" placeholder="请输入" border="none"
                        placeholderClass="input-line"></u-input>
                </u-form-item>
                <u-form-item prop="em" borderBottom label="发送邮箱" labelWidth="90">
                    <u-input v-model="dataObj.emie" placeholder="152236546@qq.com" border="none" disabled
                        placeholderClass="input-line"></u-input>
                </u-form-item>
                <u-form-item prop="extractCode" borderBottom label="提取码" labelWidth="90">
                    <u-input v-model="dataObj.extractCode" placeholder="请输入" border="none"
                        placeholderClass="input-line"></u-input>
                </u-form-item>



            </u-form>

            <text class="deal-box">不知道怎么用，查看<text class="deal" @click="goDeal">《操作指南》</text></text>



            <view class="bottom-line-btn">
                <u-button text="提交" color="#83B4FA" @click="submitLS"></u-button>
            </view>


        </view>
        <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="show = false"></u-picker>
        <u-picker :show="leftShow" :columns="leftColumns" @confirm="leftConfirm" @cancel="leftShow = false"></u-picker>

    </view>

</template>

<script setup lang="ts">
import commonHed from '@/components/common-hed.vue'
import { ref, reactive } from 'vue'
import { submit, getCodeImg } from '@/request/common'

const isCheck = ref('1')
const show = ref(false)
const leftShow = ref(false)
const leftFrom = ref(null)

const checkTab = (value: string) => {
    isCheck.value = value
}

const columns = reactive([['支付宝', '微信', '工商银行', '农业银行', '建设银行', '交通银行', '招商银行']])
const leftColumns = reactive([['江苏', '广东']])

const leftData = reactive({
    idCard: '',
    userName: '',
    areaCode: '',
    rules: {
        'userName': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
        },
        'areaCode': {
            type: 'string',
            required: true,
            message: '请选择区域',
            trigger: ['blur', 'change']
        },
        'idCard': {
            type: 'string',
            required: true,
            message: '请填写身份证号',
            trigger: ['blur', 'change']
        },

    }

})

const dataObj = reactive({
    showSex: false,
    bankName: '',
    emie: '',
    idCard: '',
    userName: '',
    passWord: '',
    extractCode: '',

    rules: {
        'userName': {
            type: 'string',
            required: true,
            message: '请填写用户名',
            trigger: ['blur', 'change']
        },
        'areaCode': {
            type: 'string',
            required: true,
            message: '请填写密码',
            trigger: ['blur', 'change']
        },
        'idCard': {
            type: 'string',
            required: true,
            message: '请填写密码',
            trigger: ['blur', 'change']
        },

    }
})



const getCode = async () => {

    leftFrom.value.validate().then((res: boolean) => {
        getImgCode()





    }).catch((errors: any) => {


    })


}


const getImgCode = async () => {
    let data = await getCodeImg({
        "areaCode": leftData.areaCode,
        "idCard": leftData.idCard,
        "userName": leftData.userName,
    })

    console.log(data, 2222222)
}




const confirm = (e: any) => {
    console.log('confirm', e);
    dataObj.bankName = e.value[0]
    show.value = false;
};

const leftConfirm = (e: any) => {
    console.log('confirm', e);
    leftData.areaCode = e.value[0]
    leftShow.value = false;
};






const submitLS = () => {

    let requestObj = {
        bankName: dataObj.bankName,
        extractCode: dataObj.extractCode,
        idCard: dataObj.idCard,
        userName: dataObj.userName,




    }

    submit(requestObj)

}



const goDeal = () => {
    let id = 0
    if (isCheck.value == '0') {
        id = 0

    } else {
        id = 1
        if (dataObj.bankName == '支付宝') {
            id = 2
        } else if (dataObj.bankName == '微信') {
            id = 3
        } else if (dataObj.bankName == '工商银行') {
            id = 1
        } else if (dataObj.bankName == '农业银行') {
            id = 5
        } else if (dataObj.bankName == '建设银行') {
            id = 4
        } else if (dataObj.bankName == '交通银行') {
            id = 1
        } else if (dataObj.bankName == '招商银行') {
            id = 6
        }

    }


    uni.navigateTo({
        url: `/pages/instructions/index?id=${id}`,
    })
}



</script>

<style lang="scss" scoped>
.ai-table {

    display: flex;
    border-top-left-radius: 50rpx;
    border-top-right-radius: 50rpx;
    overflow: hidden;
    position: absolute;
    top: 180rpx;

    .bg-img {
        position: absolute;
    }


    .table-line {

        width: 50vw;
        height: 150rpx;
        text-align: center;
        line-height: 150rpx;
        color: #666666;
        font-weight: 400;
        background-color: transparent;
        font-size: 36rpx;
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;
        color: #666666;

        .img {
            position: absolute;
            width: 420rpx;
            height: 150rpx !important;
            z-index: 5;

        }

        .text {
            position: absolute;
            z-index: 10;

        }

        .reversalImg {
            right: 0;
            transform: scaleX(-1);
            filter: FlipH;
            -ms-filter: "FlipH";
        }

    }

    .isCheck {
        color: #333333;
        font-weight: 500;
        opacity: 1;
    }






}

.ai-table-box {
    margin-top: 40rpx;
    padding: 0 35rpx;

    .deal-box {
        color: #999999;
        font-size: 26rpx;

        .deal {
            color: #56AEED;
        }
    }

    .bottom-line-btn {
        border-radius: 30rpx;
        overflow: hidden;
        margin-top: 20rpx;
    }

    .code-box {
        display: flex;
        justify-content: center;
        padding: 50rpx 0;

        .code-img {
            width: 230rpx;

        }
    }
}
</style>


<style>
.u-form-item {
    background-color: #F6F6F6;
    padding-left: 30rpx !important;
    border-radius: 10rpx;
    margin-bottom: 20rpx;

}
</style>