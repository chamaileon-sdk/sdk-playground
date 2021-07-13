import Vue from 'vue';
import VueRouter from 'vue-router';

//Dashboard
import Dashboard from '../views/Dashboard';

//Email editor
import EmailEditor from '../views/EmailEditor.vue';

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
    redirect: 'sdk',
  },
  {
    path: '/sdk',
    component: Dashboard,
  },
  {
    path: '/emaileditor',
    component: EmailEditor,
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
  mode: 'history',
  routes,
  scrollBehavior: function(to) {
    if (to.hash) {
      // return { selector: to.hash };
      return null;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
