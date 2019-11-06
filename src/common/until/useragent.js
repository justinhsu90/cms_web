
let isMobile = false;
//判断用户终端类型
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  //判断是ios用户的时候执行某种操作
  isMobile = true;
} else if (/(Android)/i.test(navigator.userAgent)) {
  //判断是安卓用户的时候执行某种操作
  isMobile = true;
} else {
  //其他类型的时候执行某种操作
  isMobile = false;
}

export const mobile = isMobile;
