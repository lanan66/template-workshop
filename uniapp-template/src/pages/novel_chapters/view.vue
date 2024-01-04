<template>
	<view>
		<uni-forms :modelValue="form">

			<uni-forms-item label="小说章节" name="chapter_name">
				<uni-easyinput type="text" v-model="form['chapter_name']" />
			</uni-forms-item>

			<uni-forms-item label="排序" name="sort">
				<uni-easyinput type="number" v-model="form['sort']" />
			</uni-forms-item>

			<uni-forms-item label="章节内容" name="chapter_content">
				<uni-easyinput type="textarea" v-model="form['chapter_content']" />
			</uni-forms-item>
		</uni-forms>
		<view class="form_button">
			<button size="mini" type="primary" @click="submit()" class="primary_btn">提交</button>
			<button size="mini" @click="cancel()">取消</button>
		</view>
	</view>
</template>

<script>
	import mixin from "@/libs/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "novel_chapters_id",
				url_add: "~/api/novel_chapters/add?",
				url_set: "~/api/novel_chapters/set?",
				url_get_obj: "~/api/novel_chapters/get_obj?",
				query: {
					novel_chapters_id: 0
				},
				form: {
					"chapter_name": '', // 章节名称
					"sort": '', // 排序
					"chapter_content": '', // 章节内容
				},
			}
		},
		onLoad(e) {
			console.log(e)
			if(e.novel_reading_id){
				this.form.novel_reading_id = e.novel_reading_id
			}else{
				this.form.novel_chapters_id = e.novel_chapters_id
			}
		},
		methods: {

		}
	}
</script>

<style>
	.form_button {
		padding-bottom: 15px;
		display: flex;
	}
</style>