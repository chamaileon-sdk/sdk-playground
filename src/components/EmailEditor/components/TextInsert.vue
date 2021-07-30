<template>
	<v-app>
		<h1>Text Insert</h1>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias natus
			expedita ipsa ipsam ea nobis facere tenetur debitis magni, adipisci error,
			illo deleniti sint laborum incidunt distinctio? Quaerat, ratione hic.
		</p>
		<OptionWrapper>
			<TextInsertPreview />
		</OptionWrapper>

		<h3>Your Buttons</h3>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
			tempora hic delectus culpa natus dicta adipisci eius aliquam officiis
			reiciendis? Officia fuga saepe nam? Iure corporis molestias commodi saepe
			ipsum.
		</p>
		<OptionWrapper>
			<template>
				<v-row align="center" justify="end" class="ma-0">
					<AddButton @click="addTextInsertButton"> New Button </AddButton>
				</v-row>
			</template>
			<div
				v-if="btnArr.length > 0"
				class="mt-8 list3 rounded"
				style="max-height: 218px; overflow-y: auto"
			>
				<draggable handle=".dtrigger" v-model="btnArr">
					<div v-for="(item, ind) in btnArr" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:label="item.label"
							@idChange="
								updateTextInsertButton({
									index: ind,
									id: $event,
								})
							"
							@labelChange="
								updateTextInsertButton({
									index: ind,
									label: $event,
								})
							"
							@iconChange="
								updateTextInsertButton({
									index: ind,
									icon: $event,
								})
							"
							@deleteClicked="deleteTextInsertButton(ind)"
						/>
						<v-divider v-show="ind !== btnArr.length - 1"></v-divider>
					</div>
				</draggable>
			</div>
		</OptionWrapper>
	</v-app>
</template>

<script>
import AddButton from "../../AddButton.vue";
import ListItem3 from "../../Lists/components/ListItem3.vue";
import OptionWrapper from "../../optionWrapper.vue";
import TextInsertPreview from "./TextInsert/TextInsertPreview.vue";
import draggable from "vuedraggable";
import { mapMutations } from "vuex";

export default {
	methods: {
		...mapMutations([
			"addTextInsertButton",
			"deleteTextInsertButton",
			"updateTextInsertOrder",
			"updateTextInsertButton",
		]),
	},
	computed: {
		btnArr: {
			get() {
				return this.$store.state.editorConfig.settings.buttons.textInsert;
			},
			set(val) {
				this.updateTextInsertOrder(val);
			},
		},
	},
	components: {
		AddButton,
		OptionWrapper,
		draggable,
		TextInsertPreview,
		ListItem3,
	},
};
</script>

<style></style>
