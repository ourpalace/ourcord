const { description } = require('../../package');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ourcord',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "Ourcord is a new and alternative discord library for JS that focuses on speed and simplicity while retaining low level functions of the discord API.",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  markdown: {
    lineNumbers: true
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  theme: 'yuu',
  themeConfig: {
    // ...menuConfig,
    repo: 'https://github.com/ourcord/ourcord',
    editLinks: true,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    // displayAllHeaders: true,
    // sidebar: 'auto',
    smoothScroll: true,
    sidebarDepth: 2,
    nav: [
      {
        text: 'Globals',
        link: '/globals'
      }
    ],
    // sidebar: [
    //   {
    //     'title': 'Globals',
    //     path: '/globals',
    //     collapsable: false,
    //   },
      
    // ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: {
    "vuepress-plugin-auto-sidebar": {}
  },
}
