<template>
  <v-app>
    <v-container style="max-height: 80vh; overflow-y: auto">
      <v-row>
        <v-col
          class="ma-0"
          cols="4"
          v-for="(item, ind) in items"
          :key="ind"
          link
          :to="item.title.toLowerCase().replaceAll(' ', '')"
        >
          <div>
            <v-card
              class="pa-10 ma-0"
              min-height="233px"
              @mouseenter="item.reveal = true"
              @mouseleave="item.reveal = false"
            >
              <v-row class="ma-0">
                <v-col cols="3" class=" d-flex align-start pa-0 ">
                  <v-icon color="primary" size="80">mdi-{{ item.icon }}</v-icon>
                </v-col>

                <v-col class="pa-0 ml-6">
                  <v-card-title class="pa-0 mb-3">{{
                    item.title
                  }}</v-card-title>

                  <v-card-text class="pa-0">{{ item.description }}</v-card-text>
                </v-col>
              </v-row>

              <v-expand-transition>
                <v-card
                  elevation="0"
                  v-if="item.reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 50%;"
                >
                  <v-btn depressed color="primary">
                    Primary
                  </v-btn>
                  <v-btn depressed color="error">
                    Error
                  </v-btn>
                </v-card>
              </v-expand-transition>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      reveal: false,
      items: [
        {
          title: 'Email Thumbnail',
          icon: 'image-outline',
          description:
            'Generates a thumbnail from an existing document. Allows you to set the size and scale, and attach the thumbnail to an HTML element',
          reveal: false,
        },
        {
          title: 'Email Preview',
          icon: 'email-search-outline',
          description:
            'If you already have a document exported from the editor, this plugin allows you to create a preview for it.',
          reveal: false,
        },
        {
          title: 'Email Editor',
          icon: 'email-edit-outline',
          description:
            'You can simply customize the editor by passing a config object to the initializer function.',
          reveal: false,
        },
        {
          title: 'Email Variable Editor',
          icon: 'iframe-variable-outline',
          description:
            'If you already have a document with defined variables exported from the editor, you can open an editor to edit the variables.',
          reveal: false,
        },
      ],
    };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #e0e0e0;
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: inset 7px 10px 12px 0px #f0f0f0;
}

.v-card--reveal {
  left: 0;
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
