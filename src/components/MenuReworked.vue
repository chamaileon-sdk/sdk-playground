<template>
  <v-navigation-drawer permanent app color="primary">
    <v-card height="100%" width="300">
      <scrollactive>
        <v-list>
          <template v-for="(m, ind) in Menu">
            <v-list-item :key="ind" :to="{ path: m.to, hash: '' }">
              <v-list-item-icon>
                <v-icon>mdi-{{ m.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ m.title }}</v-list-item-title>
            </v-list-item>

            <template v-if="isActive(m.to)">
              <v-list-item
                class="pl-14 navLink scrollactive-item"
                :class="addActiveClass(c.to)"
                v-for="c in m.children"
                :key="c.to"
                link
                :href="c.to"
              >
                <v-list-item-icon>
                  <v-icon>mdi-{{ c.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{ c.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </template>
        </v-list>
      </scrollactive>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {
    isActive(path) {
      return '/' + path === this.$route.path;
    },
    addActiveClass(hash) {
      if (window.location.hash === hash) return 'v-list-item--active';
      return '';
    },
  },

  data: () => ({
    elements: [],
    Menu: [
      {
        title: 'SDK',
        icon: 'at',
        to: 'sdk',
        children: [],
      },
      {
        title: 'Email Editor',
        icon: 'email-edit-outline',
        to: 'emaileditor',
        children: [
          { title: 'Header', icon: 'border-top-variant', to: '#header' },
          { title: 'Elements', icon: 'card-plus-outline', to: '#elements' },
          {
            title: 'Block Libraries',
            icon: 'database-edit-outline',
            to: '#block-libraries',
          },
          { title: 'Text Insert', icon: 'format-text', to: '#text-insert' },
          {
            title: 'Addons',
            icon: 'puzzle-outline',
            to: '#addons',
          },
          { title: 'Settings', icon: 'cog-outline', to: '#settings' },
        ],
      },
    ],
  }),
};
</script>

<style></style>
