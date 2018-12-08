import asyncComponent from '@/common/until/asyncComponent'
export default [{
    name: 'excelUpload',
    path: '/excelUpload',
    component: asyncComponent('excelUpload/excelUploadList'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'addUpload',
    path: '/addUpload',
    component: asyncComponent('excelUpload/excelUploadFile'),
    meta: {
      sign: 'excelUpload'
    }
  },
]
