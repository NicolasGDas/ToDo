const routes = [
  // {
  //   path: '/new',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Inicio.vue') },
  //     { path: 'user', component: () => import('pages/User.vue') },
  //     { path: 'Task', component: () => import('pages/Index.vue') },
  //   ],
  // },
  {
    path: '/',
    component: () => import('layouts/NewLayout.vue'),
    children: [
      {path: '',component:()=>import('pages/Inicio.vue')},
      { path: 'User', component: () => import('pages/User.vue') },
      { path: 'Tasks', component: () => import('pages/Index.vue') },
    ],
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
