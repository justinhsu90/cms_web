export default {
  methods: {
    copy(vm, value, e) {
      var tempDom = document.createElement("input");
      tempDom.type = "text";
      tempDom.value = value;
      e.target.appendChild(tempDom);
      tempDom.select();
      var therange = null;
      try {
        if (tempDom.createTextRange) therange = tempDom.createTextRange();
        therange = therange ? therange : document;
        if (therange.execCommand("Copy")) {
          vm.$message.success("复制成功");
        } else {
          vm.$message.error("复制失败，请重试");
        }
      } catch (n) {
        vm.$message.error("复制失败，请重试");
      }
      tempDom.parentNode.removeChild(tempDom);
    }
  }
};
