<template>
    <div>

        <el-form
            ref="form"
            :model="form"
            label-position="top"
        >
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label="packageId">
                        <el-input v-model="form.packageId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="custom">
                        <el-input v-model="form.custom"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="serviceCode">
                        <el-input v-model="form.serviceCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="remark">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="weight">
                        <el-input v-model="form.weight"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="city">
                        <el-input v-model="form.shipToAddress.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="contact">
                        <el-input v-model="form.shipToAddress.contact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="country">
                        <el-input v-model="form.shipToAddress.country"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="phone">
                        <el-input v-model="form.shipToAddress.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="postcode">
                        <el-input v-model="form.shipToAddress.postcode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="province">
                        <el-input v-model="form.shipToAddress.province"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="street1">
                        <el-input v-model="form.shipToAddress.street1"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="pr6 pl6 pt10">
                <table
                    cellspacing="0"
                    cellpadding="0"
                >
                    <colgroup>
                        <col width="80">
                        <col width="100">
                        <col width="100">
                        <col width="80">
                        <col width="80">
                        <col width="80">
                        <col width="80">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>declareNameCn</th>
                            <th>SKU </th>
                            <th>產品名稱</th>
                            <th>數量</th>
                            <th>declareNameEn</th>
                            <th>declareValue</th>
                            <th>重量</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(v,i) in form.skus"
                            :key="i"
                        >
                            <td>
                                <el-form-item>
                                    <el-input v-model="v.declareNameCn"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item>
                                    <el-input v-model="v.sku"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item>
                                    <el-input v-model="v.productName"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item>
                                    <el-input v-model="v.quantity"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item>
                                    <el-input v-model="v.declareNameEn"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item>
                                    <el-input v-model="v.declareValue"></el-input>
                                </el-form-item>
                            </td>
                            <td>
                                <el-form-item>
                                    <el-input v-model="v.weight"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    props:['row'],
    data() {
        let form = _.cloneDeep(this.row);
        return {
            form
        };
    },
    methods: {
        goBack() {
            this.$router.push("single");
        }
    }
};
</script>

<style lang="scss" scoped>
/deep/ .el-button--text {
    color: #606266;
}
/deep/ .el-form-item {
    margin-bottom: 5px;
}
/deep/ .el-form-item__label {
    padding: 0px;
}
table {
    table-layout: fixed;
    width: 100%;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    .btnh {
        padding: 4px 0px;
        color: #62717e;
    }
    .cell {
        padding: 0px;
    }
    /deep/ .el-form-item {
        overflow: hidden;
        margin: 0px;
    }
    /deep/ .el-form-item__content {
        line-height: 0px;
    }
    /deep/ .is-error input {
        background: #f56c6c;
        border-radius: 0%;
    }
    /deep/ .el-input__inner {
        border: none;
        height: 35px;
        text-align: center;
        color: #62717e;
        font-size: 14px;
    }
    th {
        padding: 4px;
        background: #edf1f5;
        text-align: center;
        color: #62717e;
        // border-right: 1px solid #ebeef5;
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
}
</style>
