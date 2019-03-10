<template>
<div>
  <el-popover ref="popover" transition="" popper-class="won-popover-chooser" :width="width" @show="handleChooser" :placement="placement">
      <component v-bind="this.$attrs" ref="chooser" :is="chooser" v-if="chooserShow" @select="$refs['popover'].doClose(),$emit('select',$event)">
      </component>
      <slot slot="reference"><span></span></slot> <!--默认span 不可清空-->
  </el-popover>
</div>
</template>
<script>
export default {
  inheritAttrs: false,
  mixins: [],
  props: {
    placement: {
      default: "right-end"
    },
    chooser: {},
    width: {
      default: "700"
    }
  },

  data() {
    return {
      chooserShow: false
    };
  },

  computed: {},

  watch: {},

  created() {},
  mounted() {
    this.popover = this.$refs.popover;
  },
  methods: {
    refreshView() {
      this.$refs.popover.updatePopper();
    },
    handleChooser() {
      this.chooserShow = true;
    }
  }
};
</script>
<style lang="scss">
</style>
