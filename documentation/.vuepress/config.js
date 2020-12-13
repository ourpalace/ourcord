const { sidebarTree } = require('../docs/config');

module.exports = {
  contentLoading: true,
  dest: 'public',
  title: 'ourcord',
  description: 'Ourcord is a new and alternative discord library for js that focuses on speed and simplicity while retaining low level functions of the discord API',
  locales: {
    '/': {
      title: 'ourcord',
      description: 'Ourcord is a new and alternative discord library for js that focuses on speed and simplicity while retaining low level functions of the discord API'
    }
  },
  themeConfig: {
    sidebarDepth: 4,
    locales: {
      '/': {
        nav: [
          {
            text: 'Home',
            link: '/'
          }
        ],
        // Add the generated sidebar
        sidebar: {
          ...sidebarTree('Home')
        }
      }
    }
  }
};