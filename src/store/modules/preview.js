export default {
  state: () => ({
    idArr: [],
    key: 0,
    settings: {
      buttons: {
        header: [],
      },
    },
  }),
  mutations: {
    addPreviewBtn(state) {
      state.idArr.push(`yourBtn-${state.key}`);

      state.settings.buttons.header.push({
        id: state.idArr[state.idArr.length - 1],
        type: 'button',
        icon: 'at',
        label: '',
        color: '#000000',
        style: 'text',
      });

      state.key++;
    },

    /*
      Payload is expected to be the ID of the object to remove
    */
    removePreviewBtn(state, payload) {
      let array = state.settings.buttons.header;

      let index = array.findIndex(element => element.id === payload);

      if (index === -1) {
        //Handle not existing element... shouldn't happen in this method
      }

      let removedItem = array.splice(index, 1);

      //If the removed item was a dropdown, we have to remove all the
      //IDs of it's children from our array
      if (removedItem.items)
        removedItem.items.forEach(item => {
          state.idArr = state.idArr.filter(id => id !== item.id);
        });

      state.idArr = state.idArr.filter(c => c !== payload);
    },
    updatePreviewBtnOrder(state, payload) {
      state.settings.buttons.header = payload;
    },
    updatePreviewBtn(state, payload) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
        if (c.id === payload.id) {
          if ('newID' in payload) {
            state.idArr = state.idArr.map(c => {
              if (c === payload.id) return payload.newID;

              return c;
            });
            return { ...c, id: payload.newID };
          }

          return { ...c, ...payload };
        }

        return c;
      });
    },

    //Dropdown
    addPreviewDropdown(state) {
      state.settings.buttons.header.push({
        id: `yourBtn-${state.key}`,
        type: 'dropdown',
        icon: 'at',
        label: '',
        color: '#000000',
        style: 'text',
        items: [],
      });

      state.idArr.push(`yourBtn-${state.key}`);
      state.key++;
    },

    removePreviewDropdownBtn(state, payload) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
        if (c.id === payload.id) {
          c.items = c.items.filter(c => c.id !== payload.obj.id);
          state.idArr = state.idArr.filter(c => c !== payload.obj.id);
        }

        return c;
      });
    },

    addPreviewDropdownBtn(state, id) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
        if (c.id === id) {
          c.items.push({
            id: `yourBtn-${state.key}`,
            icon: 'at',
            label: ``,
          });
        }

        return c;
      });

      state.idArr.push(`yourBtn-${state.key}`);
      state.key++;
    },

    updatePreviewDropdownBtn(state, payload) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
        if (c.id === payload.id) {
          c.items = c.items.map(i => {
            if (i.id === payload.obj.id) {
              if ('newID' in payload.obj) {
                state.idArr = state.idArr.map(c => {
                  if (c === payload.obj.id) return payload.obj.newID;

                  return c;
                });

                return { ...i, id: payload.obj.newID };
              }

              return { ...i, ...payload.obj };
            }

            return i;
          });
        }

        return c;
      });
    },
  },
  actions: {},
  getters: {
    getPreviewBtns: state => {
      return state.settings.buttons.header;
    },
  },
};
