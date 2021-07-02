<template>
  <div>
    <h1 class="mb-6">Content</h1>
    <v-card class="mb-6" flat>
      <v-row>
        <v-col
          cols="1"
          class="py-0"
          v-for="(element, index) in contentElements"
          :key="index"
        >
          <v-card class="text-center">
            <v-responsive :aspect-ratio="1">
              <v-btn
                :color="
                  elementsArr.content[element.type]
                    ? `#00C0E7`
                    : `grey lighten-4`
                "
                elevation="0"
                height="100%"
                width="100%"
                @click="
                  toggleElement({ type: 'content', element: element.type })
                "
              >
                <v-card
                  width="80"
                  flat
                  color="transparent"
                  :class="
                    elementsArr.content[element.type] ? `white--text` : ``
                  "
                >
                  <v-icon x-large>
                    {{ element.icon }}
                  </v-icon>
                  <div class="element-break-word">
                    {{ element.type }}
                  </div>
                </v-card>
              </v-btn>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <h1 class="mb-6">Structure</h1>
    <v-card class="mb-6" flat>
      <v-row>
        <v-col
          cols="1"
          class="py-0"
          v-for="(element, index) in structureElements"
          :key="index"
        >
          <v-card class="text-center">
            <v-responsive :aspect-ratio="1">
              <v-btn
                :color="
                  elementsArr.structure[element.type]
                    ? `#00C0E7`
                    : `grey lighten-4`
                "
                elevation="0"
                height="100%"
                width="100%"
                @click="
                  toggleElement({ type: 'structure', element: element.type })
                "
              >
                <v-card
                  width="80"
                  flat
                  color="transparent"
                  :class="
                    elementsArr.structure[element.type] ? `white--text` : ``
                  "
                >
                  <v-icon x-large>
                    {{ element.icon }}
                  </v-icon>
                  <div class="element-break-word">
                    {{ element.type }}
                  </div>
                </v-card>
              </v-btn>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <h1 class="mb-6">Advanced</h1>
    <v-card class="mb-6" flat>
      <v-row>
        <v-col
          cols="1"
          class="py-0"
          v-for="(element, index) in advancedElements"
          :key="index"
        >
          <v-card class="text-center">
            <v-responsive :aspect-ratio="1">
              <v-btn
                :color="
                  elementsArr.advanced[element.type]
                    ? `#00C0E7`
                    : `grey lighten-4`
                "
                elevation="0"
                height="100%"
                width="100%"
                @click="
                  toggleElement({ type: 'advanced', element: element.type })
                "
              >
                <v-card
                  width="80"
                  flat
                  color="transparent"
                  :class="
                    elementsArr.advanced[element.type] ? `white--text` : ``
                  "
                >
                  <v-icon x-large>
                    {{ element.icon }}
                  </v-icon>
                  <div class="element-break-word">
                    {{ element.type }}
                  </div>
                </v-card>
              </v-btn>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      elementsArr: 'getElements',
    }),
  },
  methods: {
    ...mapMutations(['toggleElement']),
  },
  data() {
    return {
      contentElements: [
        {
          type: 'text',
          icon: 'mdi-format-text',
        },
        {
          type: 'image',
          icon: 'mdi-image',
        },
        {
          type: 'button',
          icon: 'mdi-card',
        },
        {
          type: 'divider',
          icon: 'mdi-arrow-split-horizontal',
        },
        {
          type: 'social',
          icon: 'mdi-account-multiple',
        },
        {
          type: 'code',
          icon: 'mdi-code-tags',
        },
      ],
      structureElements: [
        {
          type: 'fullWidth',
          icon: 'mdi-window-maximize',
        },
        /*{
          type: 'column',
          icon: 'view_column',
        },*/
        {
          type: 'box',
          icon: 'mdi-checkbox-blank-outline',
        },
        {
          type: 'multiColumn',
          icon: 'mdi-view-column',
        },
      ],
      advancedElements: [
        {
          type: 'loop',
          icon: 'mdi-refresh',
        },
        {
          type: 'conditional',
          icon: 'mdi-call-split',
        },
        {
          type: 'dynamicImage',
          icon: 'mdi-folder-multiple-image',
        },
      ],
    };
  },
};
</script>

<style>
.element-break-word {
  word-wrap: break-word;
}
</style>
