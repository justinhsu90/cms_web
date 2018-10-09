export default {
  Math: {
    Mul: function (arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    Div: function (arg1, arg2) {
      var t1 = 0,
        t2 = 0,
        r1, r2;
      try {
        t1 = arg1.toString().split(".")[1].length;
      } catch (e) {}
      try {
        t2 = arg2.toString().split(".")[1].length;
      } catch (e) {}
      r1 = Number(arg1.toString().replace(".", ""));
      r2 = Number(arg2.toString().replace(".", ""));
      return this.Mul((r1 / r2), Math.pow(10, t2 - t1));
    },
    Add: function (a, b) {
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
      return e = Math.pow(10, Math.max(c, d)), (a * e + b * e) / e;
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
      return e = Math.pow(10, Math.max(c, d)), (a * e - b * e) / e;
    }
  }
}
