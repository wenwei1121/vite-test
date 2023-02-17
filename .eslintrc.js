module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 'eslint-config-prettier',
    'plugin:vue/vue3-recommended', // 使用插件支持vue3 base, essential, strongly-recommended
    './.eslintrc-auto-import.json', // 自動引入
    // //1.继承.prettierrc.js文件规则  2.开启rules的 "prettier/prettier": "error"  3.eslint fix的同时执行prettier格式化
    // 'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser',
  },
  plugins: ['vue'],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    quotes: ['error', 'single', 'avoid-escape'],
    semi: ['error', 'never'],
    'no-empty': 'error',
    'no-multi-spaces': 'error',
    'no-useless-return': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multiple-empty-lines': 'error',
    'no-var': 'error',
    eqeqeq: 'error',
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'arrow-spacing': 'error',
    'array-bracket-spacing': 'error',
    camelcase: 'warn',
    // 取消关闭标签不能自闭合的限制设置
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/comment-directive': 0,
  },
}
