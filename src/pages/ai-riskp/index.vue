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
                    <up-input v-model="leftData.idCard" placeholder="请输入" border="none"
                        placeholderClass="input-line"></up-input>
                </u-form-item>

                <u-form-item prop="areaCode" borderBottom label="区域" labelWidth="90" @click="leftShow = true">
                    <u-input v-model="leftData.areaCode" placeholder="请选择" border="none" disabled
                        placeholderClass="input-line"></u-input>
                </u-form-item>
            </u-form>
            <text class="deal-box">不知道怎么用，查看<text class="deal" @click="goDeal">《操作指南》</text></text>
            <view class="code-box">
                <view class="img-box" v-if="leftData.SCANNED">
                    <text class="img-tag" v-if="leftData.msg == 'NOT_SCAN'">身份认证中</text>
                    <text class="img-tag" v-if="leftData.msg == 'FINISH'">验证成功</text>
                    <text class="img-tag" v-if="leftData.msg == 'SUCCESS'">验证成功</text>
                    <image class="code-img" mode="widthFix" src="@/assets/img/icon6.png" />
                </view>
                <image v-else-if="leftData.codeImgUrl" class="code-img" mode="widthFix" :src="leftData.codeImgUrl" />

                <image v-else class="code-img" mode="widthFix" src="@/assets/img/icon4.png" />
            </view>

            <view class="bottom-line-btn">
                <u-button text="获取二维码" color="#83B4FA" @click="getCode"></u-button>
            </view>
        </view>
        <view v-if="isCheck == '2'">
            <u-form labelPosition="left" :model="dataObj" :rules="dataObj.rules" ref="rightForm">
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
                    <u-input v-model="dataObj.emie" placeholder="18356092014@163.com" border="none" disabled
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
    <view v-if="isCheck == '1' && codeSuccess"
        :style="{ 'backgroundColor': '#F5F7FA', 'padding': '30rpx 0', 'margin-top': '20rpx' }">
        <view class="ai-bottom">
            <view>
                <image :style="{ 'width': '24rpx', 'margin-right': '15rpx' }" mode="widthFix"
                    src="@/assets/img/icon5.png" />
                <text class="report-title">AI-RISKP报告</text>
            </view>
            <view class="download-btn" @click="downloadReport">下载报告</view>

        </view>
    </view>
</template>

<script setup lang="ts">
import commonHed from '@/components/common-hed.vue'
import { ref, reactive } from 'vue'
import { submit, getCodeImg, getImgState, downLoad } from '@/request/common'
const isCheck = ref('1')
const show = ref(false)
const leftShow = ref(false)
const leftFrom = ref(null)
const rightForm = ref(null)
const codeSuccess = ref(false)
const AICount = ref(180)
console.log('改动提交')

const checkTab = (value: string) => {
    isCheck.value = value
}

const columns = reactive([['支付宝', '微信', '工商银行', '农业银行', '建设银行', '交通银行', '招商银行']])
const leftColumns = reactive([['江苏', '广东']])

const leftData = reactive({
    SCANNED: false,
    msg: '',
    idCard: '',
    userName: '',
    areaCode: '',
    codeImgUrl: '',
    qrUuid: '',
    rules: {
        'userName': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
        },
        'idCard': [{
            type: 'string',
            required: true,
            message: '请填写身份证号',
            trigger: ['blur', 'change']
        }, {
            // 自定义验证函数
            validator: (rule, value, callback) => {
                return uni.$u.test.idCard(value)
            },
            message: '身份证不正确',
            // 触发器可以同时用blur和change
            trigger: ['blur'],
        }]


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
        'bankName': {
            type: 'string',
            required: true,
            message: '请选择银行',
            trigger: ['blur', 'change']
        },
        'userName': {
            type: 'string',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
        },
        'idCard': [{
            type: 'string',
            required: true,
            message: '请填写身份证号',
            trigger: ['blur', 'change']
        },{
            // 自定义验证函数
            validator: (rule, value, callback) => {
                return uni.$u.test.idCard(value)
            },
            message: '身份证不正确',
            // 触发器可以同时用blur和change
            trigger: ['blur'],
        }],
        'extractCode': {
            type: 'string',
            required: true,
            message: '请填写提取码',
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

let timeStates: any
const getImgCode = async () => {
    let data = await getCodeImg({
        "areaCode": leftData.areaCode,
        "idCard": leftData.idCard,
        "userName": leftData.userName,
    })

    leftData.codeImgUrl = data.data.qrImage
    leftData.qrUuid = data.data.qrUuid
    let count = 0
    timeStates = setInterval(() => {
        count++
        getCodeState()
        if (count > 100) {
            clearInterval(timeStates)
        }
    }, 3000); // 肖金授信户数占比图
}

const getCodeState = async () => {
    let data = await getImgState({
        uuid: leftData.qrUuid
    })

    leftData.msg = data.msg

    if (data.msg !== 'NOT_SCAN' && data.msg !== 'SCANNED') {
        let msg = data.message
        clearInterval(timeStates)
        if (data.msg == 'FINISH') {
            msg = '验证通过", 停止轮询'
        } else if (data.msg == 'OVERDUE') {
            msg = '二维码已过期，请刷新二维码'
        } else if (data.msg == 'OVERDUE') {
            msg = '二维码失效，请刷新二维码", 停止轮询'
        } else if (data.msg == 'SUCCESS') {
            codeSuccess.value = true

            let timeCount = setInterval(() => {
                AICount.value = AICount.value - 5
                console.log('完成时间加5')
                if (AICount.value < 0) {
                    clearInterval(timeCount)
                }

            }, 5000)




            msg = '已成功正在生成AI-RISKP报告'
        }

        uni.showToast({
            title: msg,
            icon: 'none',
        })

    } else {
        if (data.msg == 'SCANNED') {

            leftData.SCANNED = true

        }

    }

    console.log('调用获取状态接口')

}


const downloadReport = () => {


    if (AICount.value < 0) {
        console.log('点击下载报告', `https://miniprogram.lixuepeng.cn/prod-api/taxInfo/exportReport?serialNo=202403=${leftData.qrUuid}`)
        // let filePath = uni.env.USER_DATA_PATH+'/'+ decodeURIComponent(getFileNameByPath(attachLink))
        uni.downloadFile({
            url: `https://miniprogram.lixuepeng.cn/prod-api/taxInfo/exportReport?serialNo=202403=${leftData.qrUuid}`, // 文件地址
            success: (res) => {
                console.log(res, 11111111111)
                if (res.statusCode === 200) {
                    console.log('下载成功');


                    uni.getFileSystemManager().saveFile({
                        tempFilePath: res.tempFilePath, // 临时文件路径
                        filePath: uni.env.USER_DATA_PATH + "/" + `税务收入报告${Date.now()}.xlsx`, // fileName 需要
                        success: (saveRes) => {
                            console.log('保存成功', saveRes, saveRes.savedFilePath);

                            uni.openDocument({
                                filePath: saveRes.savedFilePath,
                                showMenu: true, //是否可以分享
                                fileType: 'xlsx',
                                success: (res) => {
                                    uni.hideLoading()
                                    console.log(res, 1111111111);
                                },
                                fail: (e) => {
                                    console.log(e, 887)
                                    uni.showToast({
                                        title: '打开失败',
                                        icon: "error"
                                    })
                                }
                            })





                        },
                        fail: (saveErr) => {
                            console.log('保存失败', saveErr);
                        }
                    });
                } else {
                    console.log('下载失败');
                }
            },
            fail: (err) => {
                console.log('下载失败', err);
            }
        });





    } else {
        uni.showToast({
            title: `正在生成报告请再等待${AICount.value}秒`,
            icon: 'none',
        })
    }
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

    if (leftData.qrUuid) {
        rightForm.value.validate().then((res: boolean) => {
            let requestObj = {
                bankName: dataObj.bankName,
                extractCode: dataObj.extractCode,
                idCard: dataObj.idCard,
                userName: dataObj.userName,
                serialNo: leftData.qrUuid
            }

            submit(requestObj)
        }).catch((errors: any) => {


        })


    } else {

        uni.showToast({
            title: `先完成税务收入`,
            icon: 'none',
        })

    }









}


const goDeal = () => {
    let id = 0
    if (isCheck.value == '1') {
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
        url: `/sunPack/instructions/index?id=${id}`,
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
    // height: 90vh;
    // overflow-y: scroll;

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

        .img-box {
            position: relative;

            .img-tag {
                position: absolute;
                color: #FFFFFF;
                top: 44%;
                font-size: 28rpx;
                z-index: 30;
                left: 70rpx;
            }

        }
    }
}

.ai-bottom {
    display: flex;
    justify-content: space-between;
    background-color: #FFFFFF;
    padding: 20rpx 35rpx;
    align-items: center;

    .report-title {
        font-family: Source Han Sans CN;
        font-weight: bold;
        font-size: 28rpx;
        color: #333333;

    }

    .download-btn {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-size: 24rpx;
        color: #1D76F6;
        background: #ECF4FF;
        border-radius: 6rpx;
        padding: 8rpx 12rpx;

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