<template>
  <div>
    <h1>Elements</h1>
    <v-card class="mx-auto" max-width="300" tile>
      <v-row no-gutters class="elem-icon categoryWrapper justify-space-around">
        <v-col
          cols="6"
          v-for="(element, index) in contentElements"
          :key="index"
          class="pa-3 highlight-elem"
        >
          <div
            :class="`text-center shadowed element-icon-${element.type}`"
            :drag-object="element.type"
            draggable="true"
            @dragstart.stop="dragStartBasicElem"
            @dragend.stop="dragEnd"
          >
            <v-container fill-height fluid>
              <v-row align="center" justify="center" no-gutters>
                <v-col>
                  <v-icon x-large>
                    {{ element.icon }}
                  </v-icon>
                  <div class="element-break-word">
                    {{ element.type }}
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted() {
    console.log(this.elementsArr);
  },
  computed: {
    ...mapGetters({
      elementsArr: 'getElements',
    }),
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
          icon: 'mdi-people',
        },
        {
          type: 'code',
          icon: 'mdi-code',
        },
      ],
    };
  },
};
</script>

<style></style>
