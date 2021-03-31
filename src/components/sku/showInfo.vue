<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-suffix="："
      label-position="left"
      label-width="180px"
      :rules="formRules"
    >
      <el-form-item
        label="CustomerName"
        prop="customerName"
      >
        <el-input v-model="form.customerName"></el-input>
      </el-form-item>
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
      >
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item
        label="Whatsapp"
        prop="whatsapp"
      >
        <el-input v-model="form.whatsapp"></el-input>
      </el-form-item>
      <el-form-item
        label="CompanyName"
        prop="companyName"
      >
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        customerName: "",
        email: "",
        password: "",
        whatsapp: "",
        companyName: ""
      }
    };
  },
  created() {
    this.formRules = {
      customerName: {
        required: true,
        message: "required"
      },
      email: {
        required: true,
        message: "email required",
        type: "email"
      },
      password: {
        required: true,
        message: "required"
      },
      whatsapp: {
        required: true,
        message: "required"
      }
    };
  },
  methods: {
    getValue() {
      return {
        ...this.form
      };
    },
    async submit() {
      let p = new Promise((res, rej) => {
        this.$refs["form"].validate(vaild => {
          if (vaild) {
            axios({
              url: "/productselection/customerinfo",
              method: "post",
              data: this.getValue()
            }).then(
              data => {
                if (data) {
                  res(data);
                } else {
                  rej();
                }
              },
              () => {
                rej();
              }
            );
          } else {
            rej();
          }
        });
      });
      return p;
    }
  }
};
</script>

<style>
</style>
