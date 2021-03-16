let imageIsExist = async url => {
  return new Promise(resolve => {
    let img = new Image();
    img.onload = () => {
      resolve(true);
      img = null;
    };
    img.onerror = () => {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};
export default {
  methods: {},
  directives: {
    errorImg: {
      // 指令的定义
      inserted: async function (el, binding) {
        let imgURL = binding.value; //获取图片地址
        if (imgURL) {
          let exist = await imageIsExist(imgURL);
          if (exist) {
            el.setAttribute("src", imgURL);
          }
        }
      }
    }
  }
};
