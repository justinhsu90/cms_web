<template>
  <div>
    <div class="title">xxxxxx</div>
    <el-form
      ref="form"
      :model="form"
      label-suffix="："
      label-position="left"
      label-width="300px"
      :rules="formRules"
    >
      <el-form-item
        label="Do you ever purchase with manufacturers/traders from China, Hong Kong or Taiwan?"
        prop="answerOne"
      >
        <el-radio
          v-model="form.answer1"
          label="1"
        >YES</el-radio>
        <el-radio
          v-model="form.answer1"
          label="2"
        >NO</el-radio>
      </el-form-item>
      <el-form-item
        v-if="form.answer1 == 1"
        label="Do you contact manufacturers/traders by yourself?"
        prop="answerTwo"
      >
        <el-radio
          v-model="form.answer2"
          label="1"
        >YES</el-radio>
        <el-radio
          v-model="form.answer2"
          label="2"
        >NO</el-radio>
      </el-form-item>
      <el-form-item
        label="Estimated purchasing amount for each pruchasing (USD)"
        prop="answerThree"
      >
        <el-input
          class="w50"
          v-model="form.answer3"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="How many times would you purchase in one year?"
        prop="answer4"
      >
        <el-select
          v-model="form.answer4"
          placeholder="times"
        >
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
        answer1: {
          required: true,
          message: "required"
        },
        answer2: {
          required: true,
          message: "required"
        },
        answer3: {
          required: true,
          message: "required"
        },
        answer4: {
          required: true,
          message: "required"
        }
      },
      form: {
        answer1: "1",
        answer2: "1",
        answer3: "",
        answer4: ""
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
              url: "/productselection/questionnaire",
              method: "post",
              data: this.getValue()
            }).then(
              data => {
                if (data) {
                  res();
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

<style lang="scss" scoped>
.title {
  text-align: center;
  color: #666;
  margin-bottom: 20px;
}
</style>
