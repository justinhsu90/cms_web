export const float = {
  required: true,
  allowZero: false,
  allowEqual: false,
  max: 100000000,
  positive: true,
  negative: false,
  min: -100000000,
  fixed: 2,
  validator: function(rule, value, callback) {
    value += "";
    if (!value) {
      return rule.required ? callback(new Error("此项必填")) : callback();
    }

    if (!isNaN(Number(value)) && parseFloat(value) == 0) {
      if (rule.allowZero) {
        return callback();
      } else {
        return callback(new Error("不允许为 0"));
      }
    }
    if (!isNaN(Number(value)) && parseFloat(value) < 0) {
      if (rule.negative) {
        if (/^-\d+(\.\d{1,})?$/.test(value) && value < rule.max) {
          if (
            value.indexOf(".") == -1 ||
            value.length - value.indexOf(".") <= rule.fixed + 1
          ) {
            return callback();
          }
        }
        callback(
          new Error(
            "大于 " +
              rule.min.toLocaleString() +
              " 并最多保留 " +
              rule.fixed +
              " 位小数"
          )
        );
      } else {
        return callback(new Error("应该是正数"));
      }
    }
    if (!isNaN(Number(value)) && parseFloat(value) > 0) {
      if (rule.positive) {
        if (rule.allowEqual) {
          if (/^\d+(\.\d{1,})?$/.test(value) && value <= rule.max) {
            if (
              value.indexOf(".") == -1 ||
              value.length - value.indexOf(".") <= rule.fixed + 1
            ) {
              return callback();
            }
          }
          callback(
            new Error(
              "小于等于 " +
                rule.max.toLocaleString() +
                " 并最多保留 " +
                rule.fixed +
                " 位小数"
            )
          );
        } else {
          if (/^\d+(\.\d{1,})?$/.test(value) && value < rule.max) {
            if (
              value.indexOf(".") == -1 ||
              value.length - value.indexOf(".") <= rule.fixed + 1
            ) {
              return callback();
            }
          }
          callback(
            new Error(
              "小于 " +
                rule.max.toLocaleString() +
                " 并最多保留 " +
                rule.fixed +
                " 位小数"
            )
          );
        }
      } else {
        return callback(new Error("应该是负数"));
      }
    }
    return callback(new Error("应该是数字"));
  }
};
