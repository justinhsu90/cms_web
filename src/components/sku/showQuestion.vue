<template>
  <div>
    <el-form
      :model="form"
      label-suffix="："
      label-position="left"
      label-width="300px"
      :rules="formRules"
    >
      <el-form-item
        label="Do you ever purchase with manufacturers/traders from China, Hong Kong or Taiwan?"
        prop="numberOne"
      >
        <el-radio
          v-model="form.numberOne"
          label="1"
        >YES</el-radio>
        <el-radio
          v-model="form.numberOne"
          label="2"
        >NO</el-radio>
      </el-form-item>
      <el-form-item
        v-if="form.numberOne == 1"
        label="Do you contact manufacturers/traders by yourself?"
        prop="numberTwo"
      >
        <el-radio
          v-model="form.numberTwo"
          label="1"
        >YES</el-radio>
        <el-radio
          v-model="form.numberTwo"
          label="2"
        >NO</el-radio>
      </el-form-item>
      <el-form-item
        label="Estimated purchasing amount for each pruchasing (USD)"
        prop="numberThree"
      >
        <el-input
          class="w50"
          v-model="form.numberThree"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="How many times would you purchase in one year?"
        prop="numberFour"
      >
        <el-select v-model="form.numberFour">
          <el-option
            v-for="(item, index) in 101"
            :key="index"
            :label="index"
            :value="index"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formRules: {
        numberOne: {
          required: true,
          message: "required"
        },
        numberTwo: {
          required: true,
          message: "required"
        },
        numberThree: {
          required: true,
          message: "required"
        },
        numberFour: {
          required: true,
          message: "required"
        }
      },
      form: {
        numberOne: "1",
        numberTwo: "1",
        numberThree: "",
        numberFour: ""
      }
    };
  }
};
</script>

<style>
</style>
