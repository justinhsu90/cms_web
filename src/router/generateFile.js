import asyncComponent from '@/common/until/asyncComponent'
export default [{
  name: 'generateFile',
  path: '/generateFile',
  component: asyncComponent('generateFile/generateFileList'),
}, ]
