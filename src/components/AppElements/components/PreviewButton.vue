<template>
	<transition name="slide-fade">
        <div class="stickyDiv" v-if="!this.previewButtonVisible">
            <div class="previewBtn">
                <v-btn
                    depressed
                    class="grey lighten-3 pa-3 custom-btn primary--text"
                    width="100%"
                    height="100%"
                    min-width="0"
                    @click="emitClick"
                >
                    <div
                    class="
                        d-flex
                        flex-wrap flex-column
                        grey--text
                        text--darken-2
                    "
                    style="width: 100px"
                    >
                    <v-icon >mdi-eye</v-icon>
                    <span>{{this.buttonText}}</span>
                    </div>
                </v-btn>
            </div>
        </div>
	</transition>
</template>

<script>
export default {

	props: {
		buttonText: String,
		previewButtonVisible: Boolean,
	},

	methods: {
		emitClick() {
			this.$emit("previewClick");
		},
	},
};
</script>


<style scoped>

.stickyDiv {
  text-align: center;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 5;
  height: 63px;
  line-height: 50px;
  margin-top: 0px;
  padding-top: 5px;
  width: 50%;
  left: 19.127%;
  border-bottom: 2px solid rgb(238, 238, 238);
}

.previewBtn {
  width: 35vw;
  margin: auto;
  height: 50px;
}

.previewBtn:hover {
  background-color: rgba(240, 238, 238, 0.619);
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-50px);
}

</style>