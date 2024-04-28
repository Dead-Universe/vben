import { FormSchema } from '@/components/Form';

const validatorNumber = async (value: number, number: number) => {
  if (value < number) {
    return Promise.reject('值不能小于' + number);
  }
  return Promise.resolve();
};

const word2VecSettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'maxIter',
    component: 'InputNumber',
    label: '最大迭代次数',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'maxSentenceLength',
    component: 'InputNumber',
    label: '最大句子长度',
    helpMessage: '句子长度大于此值将被截断(以单词为单位)',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'minCount',
    component: 'InputNumber',
    label: '最小词频',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'numPartitions',
    component: 'InputNumber',
    label: '分区数',
    helpMessage: '训练时的分区数',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 1),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'stepSize',
    component: 'InputNumber',
    label: '步长',
    helpMessage: '每次迭代的步长',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 1),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'vectorSize',
    component: 'InputNumber',
    label: '词向量维度',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'windowSize',
    component: 'InputNumber',
    label: '窗口大小',
    defaultValue: 5,
    helpMessage: '上下文窗口大小',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
];

const countVectorizerSettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'binary',
    component: 'Switch',
    defaultValue: false,
    label: '二值化',
    helpMessage:
      '二值化开关用以控制输出向量的值。如果设置为True，在应用最小TF过滤器后所有非零计数都会设置为1。这对于建模二值化事件而不是整数计数的离散概率模型非常有用',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'maxDF',
    component: 'InputNumber',
    label: '最大文档频率',
    defaultValue: Number.MAX_SAFE_INTEGER,
    helpMessage:
      '指定一个术语可能出现的不同文档的最大数量，以便包含在词汇表中。一个出现次数超过阈值的术语将被忽略。如果这是一个大于等于1的整数，则它指定了该术语可能出现的文档的最大数量；如果这是一个在[0,1)区间内的双精度数，则它指定了该术语可能出现的文档的最大比例。',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'minDF',
    component: 'InputNumber',
    label: '最小文档频率',
    defaultValue: 1,
    helpMessage:
      '指定一个术语可能出现的不同文档的最小数量，以便包含在词汇表中。一个出现次数低于阈值的术语将被忽略。如果这是一个大于等于1的整数，则它指定了该术语可能出现的文档的最小数量；如果这是一个在[0,1)区间内的双精度数，则它指定了该术语可能出现的文档的最小比例。',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'minTF',
    component: 'InputNumber',
    label: '最小词频',
    defaultValue: 1,
    helpMessage:
      '过滤文档中的罕见词汇。对于每个文档，频率/计数小于给定阈值的术语将被忽略。如果这是一个大于等于1的整数，则它指定了一个计数（术语必须在文档中出现的次数）；如果这是一个在[0,1)区间的双精度数，则它指定了一个比例（占文档的令牌总数）。注意，该参数仅在CountVectorizerModel的转换中使用，并不影响拟合。',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'vocabSize',
    component: 'InputNumber',
    label: '词汇表的最大大小',
    defaultValue: 1 << 18,
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
];

const featureHasherSettings: FormSchema[] = [
  {
    field: 'categoricalCols',
    component: 'Input',
    label: '分类列列表',
    helpMessage: '将数值列视为分类列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'inputCols',
    component: 'Input',
    label: '输入列列表',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'numFeatures',
    component: 'InputNumber',
    label: '特征数量',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 1),
        trigger: 'blur',
      },
    ],
  },
];

const binarizerSettings: FormSchema[] = [
  {
    field: 'inputCols',
    component: 'Input',
    label: '输入列列表',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCols',
    component: 'Input',
    label: '输出列列表',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'thresholds',
    component: 'Input',
    label: '阈值列表',
    helpMessage:
      '参数用于提供一组阈值来二值化连续特征。这适用于多列输入。如果处理多列且未设置阈值数组，但已设定阈值，则该阈值将应用于所有列。',
    colProps: {
      span: 24,
    },
  },
];

const PCASettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'k',
    component: 'InputNumber',
    label: '主成分数量',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 1),
        trigger: 'blur',
      },
    ],
  },
];

const imputerSettings: FormSchema[] = [
  {
    field: 'inputCols',
    component: 'Input',
    label: '输入列列表',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCols',
    component: 'Input',
    label: '输出列列表',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'missingValue',
    component: 'Input',
    label: '缺失值占位符',
    helpMessage: '将估算所有缺失值的情况',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'relativeError',
    component: 'InputNumber',
    label: '相对误差',
    helpMessage: '近似分位数算法的相对目标精度',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => {
          if (value < 0 || value > 1) {
            return Promise.reject('值必须在0到1之间');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'strategy',
    component: 'Select',
    label: '缺失值填补策略',
    defaultValue: 'mean',
    componentProps: {
      options: [
        {
          label: '平均值',
          value: 'mean',
        },
        {
          label: '中位数',
          value: 'median',
        },
        {
          label: '最常见值',
          value: 'mode',
        },
      ],
    },
    colProps: {
      span: 24,
    },
  },
];

const normalizerSettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'p',
    component: 'InputNumber',
    label: 'p范数',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
];

const standardScalerSettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'withMean',
    component: 'Switch',
    label: '均值归一化',
    helpMessage: '是否将数据归一化为均值，以平均值为中心数据',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'withStd',
    component: 'Switch',
    label: '标准差归一化',
    helpMessage: '是否将数据归一化为标准差，以标准差为单位数据',
    colProps: {
      span: 24,
    },
  },
];

const minMaxScalerSettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'max',
    component: 'InputNumber',
    label: '最大值',
    helpMessage: '输出特征范围的上限',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'min',
    component: 'InputNumber',
    label: '最小值',
    helpMessage: '输出特征范围的下限',
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
];

const maxAbsScalerSettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
];

const vectorSlicerSettings: FormSchema[] = [
  {
    field: 'inputCol',
    component: 'Input',
    label: '输入列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'indices',
    component: 'Input',
    label: '索引',
    helpMessage: '要提取的特征索引列表，特征不能与名称重叠',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'names',
    component: 'Input',
    label: '名称',
    helpMessage: '要提取的特征名称列表，特征不能与索引重叠',
    colProps: {
      span: 24,
    },
  },
];

const RFormulaSettings: FormSchema[] = [
  {
    field: 'featuresCol',
    component: 'Input',
    label: '特征列列表',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'labelCol',
    component: 'Input',
    label: '标签列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'forceIndexLabel',
    component: 'Switch',
    label: '强制索引标签',
    helpMessage: '强制将标签列视为索引列，无论是数字标签还是字符串标签',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'formula',
    component: 'Input',
    label: '公式',
    helpMessage: 'R模型公式',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'handleInvalid',
    component: 'Select',
    label: '处理无效值',
    defaultValue: 'error',
    helpMessage:
      '指定如何处理无效值。选项有“skip”（筛选出具有无效值的行）、“error”（抛出错误）或“keep”（将无效数据放入索引numLabels处的特殊附加存储桶中）。',
    componentProps: {
      options: [
        {
          label: '错误',
          value: 'error',
        },
        {
          label: '跳过',
          value: 'skip',
        },
        {
          label: '保留',
          value: 'keep',
        },
      ],
    },
  },
];

const VarianceThresholdSelectorSettings: FormSchema[] = [
  {
    field: 'featuresCol',
    component: 'Input',
    label: '特征列列表',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'outputCol',
    component: 'Input',
    label: '输出列',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'threshold',
    component: 'InputNumber',
    label: '方差阈值',
    helpMessage: '特征选择的方差阈值，差异不大于此阈值的特征将被删除',
    defaultValue: 0.0,
    colProps: {
      span: 24,
    },
    rules: [
      {
        validator: async (_, value) => validatorNumber(value, 0),
        trigger: 'blur',
      },
    ],
  },
];

export default {
  word2VecSettings: word2VecSettings,
  countVectorizerSettings: countVectorizerSettings,
  featureHasherSettings: featureHasherSettings,
  binarizerSettings: binarizerSettings,
  PCASettings: PCASettings,
  imputerSettings: imputerSettings,
  normalizerSettings: normalizerSettings,
  standardScalerSettings: standardScalerSettings,
  minMaxScalerSettings: minMaxScalerSettings,
  maxAbsScalerSettings: maxAbsScalerSettings,
  vectorSlicerSettings: vectorSlicerSettings,
  RFormulaSettings: RFormulaSettings,
  VarianceThresholdSelectorSettings: VarianceThresholdSelectorSettings,
};
