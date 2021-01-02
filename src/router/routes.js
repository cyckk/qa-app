const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('pages/Login.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/addUser',
        component: () => import('pages/RegisterUser.vue'),
        meta: {
          //   requiresAuth: true,
          authorize: ['admin'],
        },
      },
      {
        path: '/report/:id',
        name: 'Report',
        component: () => import('pages/Report.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/reportView/:id',
        name: 'ReportView',
        component: () => import('pages/Report.vue'),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: '/form/:id?',
        name: 'Form',
        component: () => import('pages/FormPage.vue'),
        meta: {
          authorize: ['admin', 'add', 'edit'],
        },
      },
      {
        path: '/reports',
        component: () => import('pages/Home.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/pdf/:id',
        name: 'Pdf',
        component: () => import('components/Vue2pdf.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('pages/Users.vue'),
        meta: {
          authorize: ['admin'],
        },
      },
      {
        path: '/user/:id',
        name: 'EditUser',
        component: () => import('pages/EditUser.vue'),
        meta: {
          requiresAuth: true,
          authorize: ['admin'],
        },
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/addRole',
        name: 'Roles',
        component: () => import('components/AddEditRole.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/userDetails/:id',
        name: 'User',
        component: () => import('components/UserDetails.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/dashboardConfig/:id',
        name: 'DashboardConfig',
        component: () => import('pages/DashboardConfig.vue'),
        meta: {
          authorize: ['admin'],
        },
      },
      {
        path: '/settings',
        component: () => import('components/ChangePassword.vue'),
        meta: {
          requiresAuth: true,
        },
      },
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
