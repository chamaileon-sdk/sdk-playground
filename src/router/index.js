import Vue from 'vue';
import VueRouter from 'vue-router';

//Dashboard
import Dashboard from '../views/Dashboard';
import Plugins from '../components/Dashboard/Plugins';
import Sdk from '../components/Dashboard/Sdk';

//Email editor
import EmailEditor from '../views/EmailEditor.vue';
import Header from '../components/EmailEditor/Header';
import Elements from '../components/EmailEditor/Elements';
import BlockLibraries from '../components/EmailEditor/BlockLibraries';
import TextInsert from '../components/EmailEditor/TextInsert';
import Addons from '../components/EmailEditor/Addons';
import Settings from '../components/EmailEditor/Settings';

//Thumbnail
import Thumbnail from '../views/Thumbnail.vue';
import ThumbnailSettings from '../components/Thumbnail/ThumbnailSettings';

//Preview
import Preview from '../views/Preview.vue';
import PreviewButtons from '../components/Preview/PreviewButtons.vue';

//Variable Editor
import VariableEditor from '../views/VariableEditor';
import VEHeader from '../components/VariableEditor/Header';
import VEFooter from '../components/VariableEditor/Footer';
import VETextI from '../components/VariableEditor/TextInsert';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        redirect: 'sdk',
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
    path: '/emailthumbnail',
    component: Thumbnail,
    children: [
      {
        path: '/',
        name: 'EmailThumbnail',
        redirect: 'settings',
      },
      {
        path: 'settings',
        name: 'ThumbnailSettings',
        component: ThumbnailSettings,
      },
    ],
  },
  {
    path: '/emailpreview',
    component: Preview,
    children: [
      {
        path: '/',
        name: 'EmailPreview',
        redirect: 'header',
      },
      {
        path: 'header',
        name: 'PreviewHeader',
        component: PreviewButtons,
      },
    ],
  },
  {
    path: '/varibleeditor',
    component: VariableEditor,
    children: [
      {
        path: '/',
        name: 'VariableEditor',
        redirect: 'header',
      },
      {
        path: 'header',
        name: 'VaraibleEditorHeader',
        component: VEHeader,
      },
      {
        path: 'footer',
        name: 'VaraibleEditorFooter',
        component: VEFooter,
      },
      {
        path: 'textinsert',
        name: 'VaraibleEditorTextInsert',
        component: VETextI,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
