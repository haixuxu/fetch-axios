// import meta from './input';
const meta = require('./supportMeta');
module.exports = {
  selectId: 'input',
  templateData: {
    containers: [
      {
        widgets: [
          {
            id: 'input',
            wrapper: 'input',
            data: meta,
          },
        ],
        id: 'bb',
      },
    ],
    templateType: 'form',
    templateSelectorVisible: false,
  },
};
