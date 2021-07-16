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
              class="pa-10 ma-0 rounded-lg"
              @mouseenter="item.reveal = true"
              @mouseleave="item.reveal = false"
              min-height="233px"
            >
              <v-row class="pa-0 ma-0">
                <v-col cols="4" class=" d-flex align-start">
                  <v-icon color="primary" size="80">mdi-{{ item.icon }}</v-icon>
                </v-col>

                <v-col class="pa-0 ma-0">
                  <v-card-title class="pl-0">{{ item.title }} </v-card-title>

                  <v-card-text class="pa-0">{{ item.description }}</v-card-text>
                </v-col>
              </v-row>

              <v-row class="pa-0 ma-0">
                <v-expand-transition>
                  <v-card
                    elevation="0"
                    height="100%"
                    v-if="item.reveal"
                    class="white rounded-lg transition-fast-in-fast-out v-card--reveal d-flex align-center"
                  >
                    <v-row class="pa-0 ma-0">
                      <v-col
                        class="pa-12 d-flex flex-column justify-space-around"
                      >
                        <v-btn
                          class="my-2 mx-8 rounded-pill py-6"
                          depressed
                          color="primary"
                          :to="item.to"
                        >
                          <v-icon class="mr-2">mdi-palette-outline</v-icon>
                          Customizer
                        </v-btn>

                        <v-btn
                          class="my-2 mx-8 rounded-pill py-6"
                          depressed
                          color="grey lighten-3"
                          :href="item.docs"
                          target="_blank"
                        >
                          <v-icon class="mr-2">mdi-book-outline</v-icon>
                          Docs
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-expand-transition>
              </v-row>
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
          to: 'emailthumbnail',
          docs: 'https://chamaileon.io/sdk/docs/email-thumbnail/',
        },
        {
          title: 'Email Preview',
          icon: 'email-search-outline',
          description:
            'If you already have a document exported from the editor, this plugin allows you to create a preview for it.',
          reveal: false,
          to: 'emailpreview',
          docs: 'https://chamaileon.io/sdk/docs/email-preview/',
        },
        {
          title: 'Email Editor',
          icon: 'email-edit-outline',
          description:
            'You can simply customize the editor by passing a config object to the initializer function.',
          reveal: false,
          to: 'emaileditor',
          docs: 'https://chamaileon.io/sdk/docs/email-editor/',
        },
        {
          title: 'Variable Editor',
          icon: 'iframe-variable-outline',
          description:
            'If you already have a document with defined variables exported from the editor, you can open an editor to edit the variables.',
          reveal: false,
          to: 'variableeditor',
          docs: 'https://chamaileon.io/sdk/docs/email-variable-editor/',
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
