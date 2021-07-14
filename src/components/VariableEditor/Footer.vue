<template>
  <div>
    <h1>Footer</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic id possimus a
      maxime quo voluptas commodi natus libero soluta provident laudantium, amet
      fugit aliquid consequuntur voluptatem obcaecati fugiat dolorum dolores.
    </p>
    <OptionWrapper>
      <FooterPreview />
    </OptionWrapper>

    <h3>Buttons</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vero
      odit eos reprehenderit itaque aspernatur debitis, nesciunt exercitationem
      libero placeat non ipsum impedit quisquam optio tenetur quas molestiae
      ipsa eveniet!
    </p>
    <OptionWrapper>
      <v-row>
        <v-col cols="6">
          <template>
            <v-row align="center" class="ma-0 justify-begin">
              <v-btn depressed color="success" @click="addVEFooterLeftButton">
                <v-icon left>
                  mdi-plus
                </v-icon>
                New Button
              </v-btn>
            </v-row>
          </template>
          <div
            v-if="footerButtons.left.length > 0"
            class="mt-8"
            style="max-height: 400px; overflow-y: auto;"
          >
            <draggable v-model="footerButtons.left">
              <v-card
                class="ma-0 pa-0 d-flex align-center"
                outlined
                elevation="0"
                tile
                v-for="item in footerButtons.left"
                :key="item.id"
              >
                <v-list-item-icon class="align-self-center ma-0 ml-6">
                  <v-icon>mdi-menu</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-row class="px-6">
                    <v-col cols="6" align-self="center">
                      <v-text-field
                        dense
                        :value="item.id"
                        hide-details="true"
                        label="ID"
                        outlined
                        @change="
                          updateVEFooterLeftButton({
                            id: item.id,
                            newID: $event,
                          })
                        "
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" align-self="center">
                      <v-btn
                        depressed
                        color="red white--text"
                        width="100%"
                        @click="deleteVEFooterLeftButton(item.id)"
                      >
                        <v-icon left>
                          mdi-close
                        </v-icon>
                        delete
                      </v-btn>
                    </v-col>

                    <v-col cols="6" align-self="center">
                      <v-text-field
                        dense
                        :value="item.label"
                        hide-details="true"
                        label="Label"
                        outlined
                        @change="
                          updateVEFooterLeftButton({
                            id: item.id,
                            label: $event,
                          })
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" align-self="center">
                      <v-text-field
                        dense
                        :value="item.icon"
                        @change="
                          updateVEFooterLeftButton({
                            id: item.id,
                            icon: $event,
                          })
                        "
                        hide-details="true"
                        label="Icon"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-card>
            </draggable>
          </div>
        </v-col>
        <v-col cols="6">
          <template>
            <v-row align="center" class="ma-0 justify-end">
              <v-btn depressed color="success" @click="addVEFooterRightButton">
                <v-icon left>
                  mdi-plus
                </v-icon>
                New Button
              </v-btn>
            </v-row>
          </template>
          <div
            v-if="footerButtons.right.length > 0"
            class="mt-8"
            style="max-height: 400px; overflow-y: auto;"
          >
            <draggable v-model="footerButtons.right">
              <v-card
                class="ma-0 pa-0 d-flex align-center"
                outlined
                elevation="0"
                tile
                v-for="item in footerButtons.right"
                :key="item.id"
              >
                <v-list-item-icon class="align-self-center ma-0 ml-6">
                  <v-icon>mdi-menu</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-row class="px-6">
                    <v-col cols="6" align-self="center">
                      <v-text-field
                        dense
                        :value="item.id"
                        hide-details="true"
                        label="ID"
                        outlined
                        @change="
                          updateVEFooterRightButton({
                            id: item.id,
                            newID: $event,
                          })
                        "
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" align-self="center">
                      <v-btn
                        depressed
                        color="red white--text"
                        width="100%"
                        @click="deleteVEFooterRightButton(item.id)"
                      >
                        <v-icon left>
                          mdi-close
                        </v-icon>
                        delete
                      </v-btn>
                    </v-col>

                    <v-col cols="6" align-self="center">
                      <v-text-field
                        dense
                        :value="item.label"
                        hide-details="true"
                        label="Label"
                        outlined
                        @change="
                          updateVEFooterRightButton({
                            id: item.id,
                            label: $event,
                          })
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" align-self="center">
                      <v-text-field
                        dense
                        :value="item.icon"
                        @change="
                          updateVEFooterRightButton({
                            id: item.id,
                            icon: $event,
                          })
                        "
                        hide-details="true"
                        label="Icon"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-card>
            </draggable>
          </div>
        </v-col>
      </v-row>
    </OptionWrapper>

    <v-btn @click="OpenEditor">teszt</v-btn>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import OptionWrapper from '../optionWrapper.vue';
import FooterPreview from './FooterPreview.vue';

export default {
  methods: {
    ...mapMutations([
      'addVEFooterLeftButton',
      'deleteVEFooterLeftButton',
      'updateVEFooterLeftOrder',
      'updateVEFooterLeftButton',

      'addVEFooterRightButton',
      'deleteVEFooterRightButton',
      'updateVEFooterRightOrder',
      'updateVEFooterRightButton',
    ]),
    OpenEditor() {
      this.$store.state.sdk.editVariables({
        document: {
          title: 'dummyTitle',
          body: {
            eid: 'root',
            type: 'body',
            children: [
              {
                eid: 'Dq5CSvpNa',
                type: 'fullwidth',
                children: [
                  {
                    eid: 'gfA7YpoWg7',
                    type: 'image',
                    attrs: {
                      mini: false,
                      sizeType: 'FIXED',
                      link: '',
                      lockDimensions: { width: null, height: null },
                      altText: '',
                      fullWidthOnMobile: false,
                      align: 'center',
                    },
                    style: {
                      'max-height': '300px',
                      'max-width': '300px',
                      src: { reference: 'logo' },
                      width: '300px',
                      'background-color': '',
                      'background-repeat': 'no-repeat',
                      'background-position': 'center center',
                      'background-image': 'url()',
                      'border-radius': '0px',
                      'border-left': '0px solid #000000',
                      'border-bottom': '0px solid #000000',
                      'border-right': '0px solid #000000',
                      'border-top': '0px solid #000000',
                      'margin-left': '0px',
                      'margin-bottom': '0px',
                      'margin-right': '0px',
                      'margin-top': '0px',
                      'padding-left': '0px',
                      'padding-bottom': '0px',
                      'padding-right': '0px',
                      'padding-top': '0px',
                    },
                  },
                  {
                    eid: '-SXz_F7tL',
                    type: 'text',
                    attrs: { text: { reference: 'heroText' } },
                    style: {
                      'background-color': '',
                      'background-repeat': 'no-repeat',
                      'background-position': 'center center',
                      'background-image': 'url()',
                      'padding-left': '0px',
                      'padding-bottom': '0px',
                      'padding-right': '0px',
                      'padding-top': '30px',
                      'line-height': '25px',
                      'letter-spacing': 'normal',
                      color: '#131313',
                      'font-size': '18px',
                      'font-family': 'arial',
                      a: { 'text-decoration': 'underline', color: '#00c0e7' },
                      h3: {
                        'line-height': '27px',
                        color: '#000000',
                        'font-size': '22px',
                        'font-family': 'Georgia',
                        'letter-spacing': 'normal',
                      },
                      h2: {
                        'line-height': '34px',
                        color: '#000000',
                        'font-size': '26px',
                        'font-family': 'Georgia',
                        'letter-spacing': 'normal',
                      },
                      h1: {
                        'line-height': '40px',
                        color: '#000000',
                        'font-size': '33px',
                        'font-family': 'Georgia',
                        'letter-spacing': 'normal',
                      },
                    },
                  },
                  {
                    eid: 'KuGZrh6yR4',
                    type: 'button',
                    attrs: {
                      text: { reference: 'buttonText' },
                      sizeType: 'FIT_TO_TEXT',
                      href: { reference: 'buttonLink' },
                      fullWidthOnMobile: true,
                      align: 'center',
                    },
                    style: {
                      'line-height': '25px',
                      color: '#ffffff',
                      'font-size': '18px',
                      'font-family': 'Arial',
                      'letter-spacing': 'normal',
                      'background-color': { reference: 'primaryColor' },
                      'background-repeat': 'no-repeat',
                      'background-position': 'center center',
                      'background-image': 'url()',
                      'border-radius': '35px',
                      'border-left': '0px solid #000000',
                      'border-bottom': '0px solid #000000',
                      'border-right': '0px solid #000000',
                      'border-top': '0px solid #000000',
                      'margin-left': '0px',
                      'margin-bottom': '0px',
                      'margin-right': '0px',
                      'margin-top': '30px',
                      'padding-left': '15px',
                      'padding-bottom': '15px',
                      'padding-right': '15px',
                      'padding-top': '15px',
                    },
                  },
                ],
                attrs: {
                  hideOnMobile: false,
                  hideOnDesktop: false,
                  lock: false,
                  marker: '',
                },
                style: {
                  'background-color': '',
                  'background-repeat': 'no-repeat',
                  'background-position': 'center center',
                  'background-image': 'url()',
                  'content-background-color': '#FFFFFF',
                  'content-background-repeat': 'no-repeat',
                  'content-background-position': 'center center',
                  'content-background-image': 'url()',
                  'content-border-radius': '20px',
                  'content-border-left': '0px solid #000000',
                  'content-border-bottom': '0px solid #000000',
                  'content-border-right': '0px solid #000000',
                  'content-border-top': '0px solid #000000',
                  'content-margin-left': '0px',
                  'content-margin-bottom': '30px',
                  'content-margin-right': '0px',
                  'content-margin-top': '30px',
                  'content-padding-left': '30px',
                  'content-padding-bottom': '30px',
                  'content-padding-right': '30px',
                  'content-padding-top': '30px',
                  'content-width': null,
                  'body-width': 600,
                },
                customData: {},
              },
            ],
            attrs: {
              usedColors: [
                '#595959',
                '#000000',
                '#cccccc',
                '#cc0000',
                '#FCFCFC',
                '#5555ff',
                '#FDFDFD',
                '#FBFBFB',
                '#999999',
                '#f2f2f2',
                '#ffffff',
              ],
            },
            style: {
              'background-color': { reference: 'primaryColor' },
              'background-position': 'center center',
              'background-repeat': 'no-repeat',
              'body-width': 600,
            },
            version: '2.0.0',
          },
          variables: [
            {
              type: 'color',
              name: 'primaryColor',
              value: '#00bee6',
              editable: false,
            },
            {
              type: 'image',
              name: 'logo',
              value:
                'https://chamaileon.io/wp-content/uploads/2020/02/Chamaileon-Logo-e1582208205164.png',
            },
            {
              type: 'text',
              name: 'heroText',
              value:
                '<h1>Hello %%firstname%%</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
            },
            { type: 'text', name: 'buttonText', value: 'Confirm Registration' },
            { type: 'link', name: 'buttonLink', value: 'https://example.com' },
          ],
        },
        ...this.getVEConfigObj,
        hooks: {},
      });
    },
  },
  computed: {
    ...mapGetters(['footerButtons', 'getVEConfigObj']),
  },
  components: {
    OptionWrapper,
    FooterPreview,
    draggable,
  },
};
</script>

<style></style>
