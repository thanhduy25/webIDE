const data = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          {
            name: 'Editor.js',
            type: 'file',
            content: '//Editor.js',
          },
          {
            name: 'FileTree.js',
            type: 'file',
            content: '//FileTree.js',
          },
        ],
      },
      {
        name: 'App.js',
        type: 'file',
        content: '//App.js',
      },
      {
        name: 'index.js',
        type: 'file',
        content: '//index.js',
      },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      {
        name: 'index.html',
        type: 'file',
        content: '//index.html',
      },
    ],
  },
  {
    name: 'package.json',
    type: 'file',
    content: '//package.json',
  },
];

export default data;
