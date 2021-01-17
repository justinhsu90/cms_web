export default {
  Math: {
    Mul: function (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {
        console.log(e);
      }
      try {
        m += s2.split(".")[1].length;
      } catch (e) {
        console.log(e);
      }
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    Div: function (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1,
        r2;
      try {
        t1 = arg1.toString().split(".")[1].length;
      } catch (e) {
        console.log(e);
      }
      try {
        t2 = arg2.toString().split(".")[1].length;
      } catch (e) {
        console.log(e);
      }
      r1 = Number(arg1.toString().replace(".", ""));
      r2 = Number(arg2.toString().replace(".", ""));
      return this.Mul(r1 / r2, Math.pow(10, t2 - t1));
    },
    Add: function add(arg1, arg2) {
      (arg1 = arg1.toString()), (arg2 = arg2.toString()); // 将传入的数据转化为字符串
      var arg1Arr = arg1.split("."), // 将小数的数据从小数点的位置拆开
        arg2Arr = arg2.split("."),
        d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", // 获取第一个数的小数点的长度
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : ""; // 获取第二个数的小数点的长度
      var maxLen = Math.max(d1.length, d2.length); // 获取小数点长度较大的值
      var m = Math.pow(10, maxLen); // 这里表示10的小数点长度次方 也就是说如果小数点长度为2 m的值就是100 如果小数点长度是3 m的值就是1000如果不懂请自行查找api
      var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen)); // 将小数转化为整数后相加在除掉两个数乘过的倍数然后去小数点较长的长度的小数位数
      var d = arguments[2]; // 第三个参数用户可以自行决定是否要传递 用来定义要保留的小数长度
      return typeof d === "number" ? Number(result.toFixed(d)) : result;
    },
    sub: function (a, b) {
      var c, d, e;
      try {
        c = a.toString().split(".")[1].length;
      } catch (f) {
        c = 0;
      }
      try {
        d = b.toString().split(".")[1].length;
      } catch (f) {
        d = 0;
      }
      return (e = Math.pow(10, Math.max(c, d))), (a * e - b * e) / e;
    }
  }
};
