import Vue from 'vue';
import VueRouter from 'vue-router';

//Dashboard
import Dashboard from '../views/Dashboard';
import Plugins from '../components/Dashboard/Plugins';
import Sdk from '../components/Dashboard/Plugins';

//Email editor
import EmailEditor from '../views/EmailEditor.vue';
import Header from '../components/EmailEditor/Header';
import Elements from '../components/EmailEditor/Elements';
import BlockLibraries from '../components/EmailEditor/BlockLibraries';
import TextInsert from '../components/EmailEditor/TextInsert';
import Addons from '../components/EmailEditor/Addons';
import Settings from '../components/EmailEditor/Settings';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        redirect: 'plugins',
      },
      {
        path: 'plugins',
        name: 'Plugin Config',
        component: Plugins,
      },
      {
        path: 'sdk',
        name: 'SDK Config',
        component: Sdk,
      },
    ],
  },
  {
    path: '/emaileditor',
    component: EmailEditor,
    children: [
      {
        path: '/',
        name: 'Home',
        redirect: 'header',
      },
      {
        path: 'header',
        name: 'Header',
        component: Header,
      },
      {
        path: 'elements',
        name: 'Elements',
        component: Elements,
      },
      {
        path: 'blocklibraries',
        name: 'BlockLibraries',
        component: BlockLibraries,
      },
      {
        path: 'textinsert',
        name: 'TextInsert',
        component: TextInsert,
      },
      {
        path: 'addons',
        name: 'Addons',
        component: Addons,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
