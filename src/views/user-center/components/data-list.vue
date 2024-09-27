<template>
  <div class="data-list" v-if="!data.isDetail">
    <div class="hed-search">
      <div style="display: flex">
        <el-form-item label="需求名称">
          <el-input v-model="formData.requireName" />
        </el-form-item>
        <el-button style="margin-left: 20px" type="primary" @click="getDataList"
          >查询</el-button
        >
      </div>

      <el-button style="margin-left: 20px" type="primary" @click="createNeed"
        >创建新需求</el-button
      >
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column label="需求名称" prop="requireName" />
      <el-table-column label="需求编号" prop="requireCode" />
      <el-table-column label="创建时间" prop="demandTime" />

      <el-table-column label="状态">
        <template #default="scope">
      {{ getStateName(scope.row.approvalFlag) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div @click="viewDetail(scope.row)" style="color: #409DFF;cursor: pointer;">查看详情</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-else class="detail-box">
    <el-button class="back-btn" style=""  type="primary" @click="goBack" 
    >返回</el-button>

    <el-descriptions :column="2" border>
      <el-descriptions-item
        v-for="item in data.detailList"
        :key="item.id"
        width="100px"
      >
        <template #label>
          <div>
            {{ item.label }}
          </div>
        </template>
        <div v-if="item.codeList">
          {{ item.codeList[ data.currentDetail[item.id]] }}
        </div>
        <div v-else>
          {{ data.currentDetail[item.id] }}
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <el-table
      :data="data.currentDetail.dtshareResDemandDetails"
      border
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column label="资源编码" prop="resGroup" />

      <el-table-column label="资源名称">
        <template #default="scope">
          {{ getCodeName(scope.row.resGroup) }}
        </template>
      </el-table-column>

      <el-table-column label="API key" prop="svrAppkey"  width="200px"/>

      <el-table-column label="授权时间">
        <template #default="scope">
          {{ data.currentDetail.approvalTime }}
        </template>
      </el-table-column>

      <el-table-column label="审批状态">
        <template #default="scope">
          {{ getStateName(scope.row.approvalFlag) }}
        </template>
      </el-table-column>

      <el-table-column label="对接文档">
        <template #default="scope">
         <span  style="cursor: pointer;" :style="{ color: scope.row.approvalFlag == '1' ? 'red' : '#AAAAAA' }"    @click="downUrl(scope.row)">下载</span>
        </template>
      </el-table-column>


    </el-table>

    <div class="bottom-box" v-if="data.currentDetail.approvalFlag == 1 || data.currentDetail.approvalFlag == 3">
      <div class="bottom-line">
        <text class="label-text">数据提供方公钥：</text>
        <text style="overflow-wrap: break-word; width: 550px">
          {{ data.currentDetail.spdtSecretPubkey }}
        </text>
      </div>
      <div class="bottom-line">
        <text class="label-text">需求公钥：</text>
        <el-button style="margin-left: 20px" type="primary" @click="exChange" v-if="!data.currentDetail.usegeSecretPubkey"
        >点击交换密钥</el-button>
        <text v-else> {{  data.currentDetail.usegeSecretPubkey}}</text>
      </div>
      <div  class="bottom-line">
        <text class="label-text">对接人信息：</text>
        <text class="value-text"> {{ data.currentDetail.joinName  || '--'}}</text>
      </div>
      <div  class="bottom-line">
        <text class="label-text">对接人电话：</text>
        <text class="value-text"> {{ data.currentDetail.joinPhone || '--'}}</text>
      </div>
      <div  class="bottom-line">
        <text class="label-text">审批说明：</text>
        <text class="value-text"> {{ data.currentDetail.remark || '--'}}</text>
      </div>
    </div>
  </div>

  <applyBox
    v-if="data.dialogVisible"
    :key="data.dialogVisible"
    :dialogVisible="data.dialogVisible"
    @searchData="getDataList"
    @setData="setData"
  />
</template>

<script setup>
import { ref, reactive } from "vue";
import { getAuthList, gerCodeList, getDtresAndQuota  ,authSubmit ,authCheck} from "@/api/login";
import { ElMessage, ElMessageBox } from 'element-plus'



import applyBox from "@/components/home/apply.vue";


const tableData = ref([]);
const formData = reactive({
  requireName: "",
});

const data = reactive({
  dialogVisible: false,
  isDetail: false,
  currentDetail: {},
  resGroupList: [],
  detailList: [
    {
      label: "审批状态",
      id: "approvalFlag",
      codeList: {
          0: "拒绝",
          1: "通过",
          2: "审批中",
          3: "部分通过",
        },
    },
    {
      label: "需求名称",
      id: "requireName",
    },
    {
      label: "需求编号",
      id: "requireCode",
    },

    {
      label: "联系人",
      id: "contactName",
    },
    {
      label: "联系电话",
      id: "contactPhone",
    },
    {
      label: "需求描述",
      id: "requireDesc",
    },
  ],
});

const setData = function (value) {
  data[value.key] = value.value;
};


const downUrl = function(item){
  console.log(item)
  if(!item.serviceDocUrl)return

  window.open(item.serviceDocUrl, '_blank');
}

const getCodeName = function (codeId) {
  return data.resGroupList.filter((item) => item.resGroup == codeId)[0].resName;
};

const getStateName = function(state){
 return [{name:'拒绝',id:'0'},{name:'通过',id:'1'},{name:'审批中',id:'2'},{name:'部分通过',id:'3'}].filter(item => item.id == state)[0]?.name


}

const createNeed =  async function () {


  let isOk = await authCheck();


if(isOk == 1){
  data.dialogVisible = true;
}


if(isOk == 3){
  ElMessage({
      message: "请先进行企业认证",
      type: "warning",
    });
    return;
}

if(isOk == 4){
  ElMessage({
      message: "企业未通过审核,请通过审核后提交",
      type: "warning",
    });
    return;
}


if(isOk == 2){
  ElMessageBox.confirm(
    "当前用户已经有正在审核中的需求，是否继续创建新需求？",
    { confirmButtonText: "确定", cancelButtonText: "取消" }
  )
    .then(() => {
      data.dialogVisible = true;
    })
    .catch(() => {
      // catch error
    });
}










};

const getDataList = async function (params) {
  let resDate = await getAuthList(formData);
  tableData.value = resDate;
  console.log(resDate);
};

const getDtresAndQuotaList = async function () {
  let resData = await getDtresAndQuota();
  data.resGroupList = resData;
  console.log(resData, "资源信息");
};

getDtresAndQuotaList();

const viewDetail = function (item) {
  data.currentDetail = item;
  data.isDetail = true;
};


const exChange = function(){

  ElMessageBox.prompt('请输入你的密钥', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      authSubmit({
        id:data.currentDetail.id,
        usegeSecretPubkey:value
      })

      data.currentDetail.usegeSecretPubkey = value
      ElMessage({
        type: 'success',
        message: `提交成功`,
      })
    })
    .catch(() => {

    })

}

const goBack = function (){
  data.isDetail = false

}

getDataList();
</script>

<style lang="scss" scoped>
.data-list {
  padding: 20px 40px;
  .hed-search {
    display: flex;
    justify-content: space-between;
  }
}

.detail-box{
  position: relative;
  .back-btn{
    position: absolute;
    right: -100px;

  }
}

.bottom-box {
  font-size: 12px;
  padding-left: 50px;
  padding-top: 30px;
  .bottom-line {
    display: flex;
    margin-bottom: 5px;
    .label-text{
      width: 150px;

    }
  }
}
</style>
