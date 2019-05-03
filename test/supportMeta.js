module.exports = [
  {
    key: 'label',
    type: 'string', // input
    desc: '字符串',
    value: '标题',
  },
  {
    key: 'modelName',
    type: 'string',
    desc: 'modelName',
    value: 'name',
  },
  {
    key: 'controlWidth',
    type: 'number', // number
    desc: '数字',
    value: 150,
  },
  {
    key: 'disabled',
    type: 'boolean', // switch
    desc: '布尔值',
    value: false,
  },
  {
    key: 'size',
    type: 'enum', // select
    desc: '尺寸',
    value: 'small',
    enumData: [
      {
        name: '小',
        value: 'small',
      },
      {
        name: '中',
        value: 'middle',
      },
      {
        name: '大',
        value: 'large',
      },
    ],
  },
  {
    key: 'rules',
    type: 'validate', // select
    desc: '校验规则',
    ruleList: [
      {
        name: 'required',
        type: 'boolean',
        desc: '是否必输',
        value: false,
        message: '该项必须输入',
      },
      {
        name: 'min',
        type: 'number',
        desc: '最小长度',
        value: 5,
        message: '最小长度为5',
      },
      {
        name: 'max',
        type: 'number',
        desc: '最大长度',
        value: 10,
        message: '最大长度为10',
      },
    ],
  },
  {
    key: 'fetch',
    type: 'fetch', // select
    desc: '校验规则',
    data: [
      {
        name: 'url',
        type: 'string',
        desc: '请求地址',
        value: '/api/v1/user',
      },
      {
        name: 'name',
        type: 'string',
        desc: '参数1',
        value: 'Lucy',
      },
      {
        name: 'sex',
        type: 'string',
        desc: '参数2',
        value: 'boy',
      },
    ],
  },
];
