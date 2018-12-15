module.exports = {
    root: true,
  
    env: {
      node: true
    },
  
    extends: ["plugin:vue/essential", "@vue/prettier"],
  
    rules: {
      "no-console": "off",
      "no-debugger": "off",
      "vue/html-indent": "warning"
    },
  
    globals: {
      Vue: true,
      axios: true,
      _: true,
      C:true
    },
  
    parserOptions: {
      parser: "babel-eslint"
    }
  };
  