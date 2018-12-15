export default {
  render(h) {
    console.log();
    return h("div", {
      scopedSlots: {
        default: () => {
          return h("span", "adasd");
        }
      }
    });
  }
};
