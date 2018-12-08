import asyncComponent from '@/common/until/asyncComponent'
export default [  {
  name: 'replacement',
  path: '/replacement',
  component: asyncComponent('wowcherReplacement/replacementList'),
  meta: {
    keepAlive: true
  }
},
{
  name: 'replacementAdd',
  path: '/replacementAdd',
  component: asyncComponent('wowcherReplacement/replacementAdd'),
  meta: {
    sign: 'replacement'
  }
},
{
  name: 'replacementCheck',
  path: '/replacementCheck',
  component: asyncComponent('wowcherReplacement/replacementCheck'),
  meta: {
    sign: 'replacement'
  }
},
{
  name: 'replacementEdit',
  path: '/replacementEdit',
  component: asyncComponent('wowcherReplacement/replacementEdit'),
  meta: {
    sign: 'replacement'
  }
},
]
