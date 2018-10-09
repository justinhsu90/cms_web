<template>
    <div id="receivableEdit">
        <div style="padding:20px">
            <div class="heade">
                <i class="el-icon-arrow-left"></i>
                <a href="javascript:void(0)" @click="goBack">返回</a>
            </div>
            <br>
            <h2>查看费用帳款
            </h2>
            <br>
            <!-- <el-form ref="form" :model="formData" label-position="top">
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-form-item label="Report ID">
                            <el-input v-model="formData.reportId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="年">
                            <el-input v-model="formData.year" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="月">
                            <el-input v-model="formData.month" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="生成時間">
                            <el-date-picker disabled  type="datetime" v-model="formData.generatedTime"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="生成人">
                            <el-input v-model="formData.generatedBy" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form> -->
            <table cellspacing="0" cellpadding="0">
                <caption>
                    <h3 class="mt">
                        {{year}}年{{month}}月费用应收帳款表
                    </h3>
                    <h5 class="tr">
                        生成时间{{generatedTime | formatToTime}}
                    </h5>
                </caption>
                <thead>
                    <tr>
                        <th colspan="5">客戶資料</th>
                        <th colspan="3">收入</th>
                        <th colspan="4">變動成本</th>
                        <th colspan="3">固定成本</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>客工商</td>
                        <td>平台</td>
                        <td>賬號</td>
                        <td>國家</td>
                        <td>幣別</td>
                        <td>銷售額</td>
                        <td>退貨退款</td>
                        <td>應收</td>
                        <td>成交費</td>
                        <td>運費</td>
                        <td>倉儲費</td>
                        <td>總金額</td>
                        <td>規費</td>
                        <td>廣告費</td>
                        <td>總金額</td>
                    </tr>
                    <tr v-for="(v,i) in data" :key="i">
                        <td>{{v.erpClientId | formToEmpty}}</td>
                        <td>{{v.platform | formToEmpty}}</td>
                        <td>{{v.account | formToEmpty}}</td>
                        <td>{{v.country | formToEmpty}}</td>
                        <td>{{v.currency | formToEmpty}}</td>
                        <template v-if='v.financialType == "應收"'>
                            <td></td>
                            <td></td>
                            <td>{{v.amount}}</td>
                        </template>
                        <template v-else-if="v.financialType == '銷售額'">
                            <td>{{v.amount}}</td>
                            <td></td>
                            <td></td>
                        </template>
                        <template v-else>
                            <td></td>
                            <td>{{v.amount}}</td>
                            <td></td>
                        </template>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: "receivableReportEdit",
    data() {
        return {
            // formData: {
            //     generatedBy: "",
            //     generatedTime: "",
            //     month: "",
            //     reportId: "",
            //     year: ""
            // }
            data: [],
            year:'',
            month:'',
            generatedTime:''
        };
    },
    filters: {
        formatToTime(val) {
            return moment(val).format("YYYY-MM-DD HH:mm:ss");
        },
        formToEmpty(val){
            return val ? val : '-';
        }
    },
    created() {
        let id = JSON.parse(this.$route.query.id);
        axios({
            url: "/accountreceivable/report",
            method: "post",
            data: {
                token: this.token,
                reportid: id
            }
        }).then(res => {
            this.data = _.cloneDeep(res);
            this.year = this.data[0].year;    
            this.month = this.data[0].month;    
            this.generatedTime = this.data[0].generatedTime;    
        });
    },
    methods: {
        goBack() {
            this.$router.push("/receivableReport");
        }
    }
};
</script>
<style lang="scss" scoped>
#receivableEdit {
    .heade {
        color: #45a2ff;
        & a {
            color: #45a2ff;
            font-size: 16px;
        }
    }
}
table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
}
th {
    padding: 4px;
    text-align: center;
    color: #62717e;
    border-right: 1px solid #ebeef5;
}
td {
    padding: 0px;
    border-top: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    text-align: center;
    background: white;
    color: #62717e;
    font-size: 14px;
}
caption{
    border-top: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    height: 60px;

}
.tr{
    text-align: right;
}
.mt{
    margin-top:10px;
}
</style>