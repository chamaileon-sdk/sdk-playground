<template>
  <div>
    <h1>Elements</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
      praesentium, ad architecto beatae provident, pariatur doloremque
      exercitationem quidem soluta, est magnam nemo similique. Fugit sunt atque
      iste est maxime cum!
    </p>

    <h3>Content</h3>
    <OptionWrapper>
      <v-row class="ma-0 pa-0 mx-n3">
        <v-col
          class="my-0 py-0"
          cols="2"
          v-for="(element, index) in contentElements"
          :key="index"
          @click="toggleElement({ type: 'content', element: element.type })"
        >
          <v-btn
            depressed
            class="pa-0 d-flex"
            height="100%"
            width="100%"
            :color="elementsArr.content[element.type] ? 'primary' : 'white'"
          >
            <v-responsive :aspect-ratio="1">
              <div
                class="d-flex flex-column justify-space-around"
                style="height: 100%;"
              >
                <div>
                  <v-icon x-large>
                    {{ element.icon }}
                  </v-icon>
                  <div v-if="element.alt">
                    {{ element.alt }}
                  </div>
                  <div v-else class="element-break-word">
                    {{ element.type }}
                  </div>
                </div>
              </div>
            </v-responsive>
          </v-btn>
        </v-col>
      </v-row>
    </OptionWrapper>

    <h3>Structure</h3>
    <OptionWrapper>
      <v-row class="ma-0 pa-0 mx-n3">
        <v-col
          class="my-0 py-0"
          cols="2"
          v-for="(element, index) in structureElements"
          :key="index"
          @click="toggleElement({ type: 'structure', element: element.type })"
        >
          <v-btn
            depressed
            class="pa-0 d-flex"
            height="100%"
            width="100%"
            :color="elementsArr.structure[element.type] ? 'primary' : 'white'"
          >
            <v-responsive :aspect-ratio="1">
              <div
                class="d-flex flex-column justify-space-around"
                style="height: 100%;"
              >
                <div>
                  <v-icon x-large>
                    {{ element.icon }}
                  </v-icon>
                  <div v-if="element.alt">
                    {{ element.alt }}
                  </div>
                  <div v-else class="element-break-word">
                    {{ element.type }}
                  </div>
                </div>
              </div>
            </v-responsive>
          </v-btn>
        </v-col>
      </v-row>
    </OptionWrapper>

    <h3>Advanced</h3>
    <OptionWrapper>
      <v-row class="ma-0 pa-0 mx-n3">
        <v-col
          class="my-0 py-0"
          cols="2"
          v-for="(element, index) in advancedElements"
          :key="index"
          @click="toggleElement({ type: 'advanced', element: element.type })"
        >
          <v-btn
            depressed
            class="pa-0 d-flex"
            height="100%"
            width="100%"
            :color="elementsArr.advanced[element.type] ? 'primary' : 'white'"
          >
            <v-responsive :aspect-ratio="1">
              <div
                class="d-flex flex-column justify-space-around"
                style="height: 100%;"
              >
                <div>
                  <v-icon x-large>
                    {{ element.icon }}
                  </v-icon>
                  <div v-if="element.alt">
                    {{ element.alt }}
                  </div>
                  <div v-else class="element-break-word">
                    {{ element.type }}
                  </div>
                </div>
              </div>
            </v-responsive>
          </v-btn>
        </v-col>
      </v-row>
    </OptionWrapper>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import OptionWrapper from '../optionWrapper.vue';

export default {
  components: {
    OptionWrapper,
  },
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
          alt: 'columns',
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
          alt: 'cond',
          type: 'conditional',
          icon: 'mdi-call-split',
        },
        {
          alt: 'dyn img',
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
  word-break: break-word;
}
</style>
