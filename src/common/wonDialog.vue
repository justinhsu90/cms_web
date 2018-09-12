<template>
    <el-dialog :title="title" :visible.sync="dialogVisible">
        <slot name="content"></slot>
        <div slot="footer" class="dialog-footer">
            <el-button v-if="showCancel" @click="dialogVisible = false">{{cancelButtonText}}</el-button>
            <el-button v-if="showConfirm" type="primary" @click="confirm">{{confirmButtonText}}</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: "wonDialog",
    props: {
        title: {
            type: String,
            default: "添加"
        },
        showConfirm: {
            type: Boolean,
            default: true
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        confirmButtonText: {
            type: String,
            default: "确定"
        },
        cancelButtonText: {
            type: String,
            default: "取消"
        },
        row: {},
        name:{}
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    created() {
        this.$on("visible", value => {
            this.value = value;
            if (typeof value == "number") {
                value += "";
            }
            if (value) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        });
    },
    methods: {
        confirm() {
            this.dialogVisible = false;
            let father = this.$findFather(this.name);
            father.$emit("selectSku", [this.row, this.value]);
        }
    }
};
</script>
<style lang="sass">

</style>


