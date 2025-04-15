import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'employee',
    title: 'Employee',
    type: 'item',
    icon: 'users',
    url: 'members',
    role: ['Basic']
  }
  // {
  //   id: 'customers',
  //   title: 'Customers',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'customers',
  //   role: ['Basic']
  // },
  // {
  //   id: 'meters',
  //   title: 'Meters',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'meters',
  //   role: ['Basic']
  // },
  // {
  //   id: 'accounts',
  //   title: 'Accounts',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'accounts',
  //   role: ['Basic']
  // }
]
