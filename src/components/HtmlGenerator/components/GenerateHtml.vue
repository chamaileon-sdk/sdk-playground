<template>
	<v-app>
		<h1>Generate HTML</h1>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo vitae
			deserunt ea atque recusandae! Ipsam incidunt suscipit error voluptas
			blanditiis laboriosam, consequuntur accusamus ratione facere ex tempore
			fugit optio non.
		</p>
		<OptionWrapper>
			<v-row
				align="center"
				justify="space-between"
				class="ma-0 mb-8"
			>
				<p>Size: {{ size }}</p>
				<div>
					<v-btn
						class="mr-7"
						depressed
						color="success"
						@click="copyCodeToClipboard"
					>
						<v-icon left>
							mdi-clipboard-file-outline
						</v-icon>
						Copy to Clipboard
					</v-btn>
					<v-btn
						depressed
						color="success"
						@click="generateHtml"
					>
						<v-icon v-show="!fetching" left>
							mdi-plus
						</v-icon>
						<v-progress-circular
							v-show="fetching"
							color="white"
							:indeterminate="true"
							:value="0"
							size="20"
							width="3"
							class="mr-3"
						/>
						Generate
					</v-btn>
				</div>
			</v-row>

			<v-card flat class="pa-4">
				<v-textarea
					height="456px"
					readonly
					class="customScroll pa-0"
					background-color="white"
					color="primary"
					outlined
					no-resize
					hide-details="true"
					placeholder="Insert HTML here..."
					:value="html"
				/>
			</v-card>
		</OptionWrapper>
	</v-app>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";

import { mapGetters } from "vuex";

export default {
	components: {
		OptionWrapper,
	},

	computed: {
		...mapGetters({
			fetching: "getHTMLFetchStatus",
			html: "getHtmlDocument",
			size: "getSize",
		}),
	},

	methods: {
		generateHtml() {
			this.$store.dispatch("fetchHtml");
		},

		copyCodeToClipboard() {
			const str = document.querySelector("textarea").value;

			const el = document.createElement("textarea");
			el.value = str;
			el.setAttribute("readonly", "");
			el.style.position = "absolute";
			el.style.left = "-9999px";
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		},
	},
};
</script>

<style>
textarea {
	overflow-x: hidden;
	overflow-y: scroll;
	scrollbar-width: thin;
	padding: 0 !important;
	margin: 8px 0 !important;
	margin-right: 8px !important;
}

textarea::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
textarea::-webkit-scrollbar-thumb {
	background: #e0e0e0;
	border-radius: 99999px;
}
textarea::-webkit-scrollbar-thumb:hover {
	background: #bdbdbd;
}
textarea::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}
</style>
