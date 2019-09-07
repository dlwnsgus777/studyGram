module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    mcmaVersion: 2019
  },
  extends: ["plugin:vue/essential"]
};
