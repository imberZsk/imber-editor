/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "tailwindcss/nesting": {}, // 嵌套功能
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;

/* 
Autoprefixer 是一个 PostCSS 插件，它会根据你的 CSS 规则自动添加浏览器前缀，从而确保你的样式在不同浏览器上的兼容性。

例如，display: flex; Autoprefixer 会根据浏览器支持情况，自动将其转换为：
display: -webkit-box; // 老版本的 Safari 和 Chrome
display: -ms-flexbox; // IE 10
display: flex; // 标准

例如，你可以在 postcss.config.js 中这样配置 Autoprefixer，以指定支持的浏览器版本：
autoprefixer: {
  overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'], // 自定义浏览器支持范围
},
*/
