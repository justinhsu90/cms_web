import asyncComponent from '@/common/until/asyncComponent'
export default [{
    name: 'scriptExecution',
    path: '/scriptExecutionList',
    component: asyncComponent('scriptExecution/scriptExecutionList'),
  },
  {
    name: 'scriptExecutionAdd',
    path: '/scriptExecutionAdd',
    component: asyncComponent('scriptExecution/scriptExecutionAdd'),
    meta: {
      sign: 'scriptExecutionList'
    }
  },
]
