import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import NewView from '@/views/NewView.vue'
import FileSelect from '@/components/new/FileSelect.vue'
import DetailSetting from '@/components/new/DetailSetting.vue'
import DetailSettingVer2 from '@/components/new/DetailSettingVer2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/new',
      name: 'new',
      component: NewView,
      children: [
        {
          path: 'file_select',
          name: 'fileSelect',
          component: FileSelect,
        },
        {
          path: 'detail_setting',
          name: 'detailSetting',
          component: DetailSetting,
        },
        {
          path: 'detail_setting_ver2',
          name: 'DetailSettingVer2',
          component: DetailSettingVer2,
        },
      ],
    },
  ],
})

export default router
