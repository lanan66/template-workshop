<template>
	<div>
			<el-form-item v-if="$check_register_field('add','store_name','/seller/view')" label="店铺名称" prop="store_name">
				<el-input id="store_name" v-model="form['store_name']" placeholder="请输入店铺名称"></el-input>
				</el-form-item>
	
	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		props:{

			form:{
				type: Object,
				default: function(){
					return {
							"store_name":  '' ,
						}
				}
			},

		},
		data() {
			return {
				field: "seller_id",
				url_add: "~/api/seller/add?",
				url_set: "~/api/seller/set?",
				url_upload: "~/api/seller/upload?",

					rules: {
					"store_name": [     ],
				}

			}
		},
		methods: {

	
	
	

		},
		created() {
			}
	}
</script>
