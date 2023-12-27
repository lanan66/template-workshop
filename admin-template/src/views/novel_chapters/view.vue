<template>
  <el-main class="bg edit_wrap comtabel_e">
    <el-form label-position="right" class="form p_4" label-width="120" v-model="form">
      <el-row class="rows row1">
        <el-col :xs="24" :sm="24" :lg="8" class="el_form_item_warp">
          <el-form-item label="章节名称">
            <el-input v-model="form.chapter_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rows row1">
        <el-col :xs="24" :sm="24" :lg="8" class="el_form_item_warp">
          <el-form-item label="章节排序">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rows row1">
        <el-col :xs="24" :sm="24" :lg="24" class="el_form_editor_warp">
          <el-form-item label="章节内容">
            <quill-editor
                v-model="form.chapter_content">
            </quill-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="rows row1">
        <el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
          <el-form-item>
            <el-button type="primary" @click="submit()">提交</el-button>
            <el-button @click="cancel()">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-main>
</template>

<script>
import mixin from "@/mixins/page";
import el from "element-ui/src/locale/lang/el";

export default {
  mixins: [mixin],
  name: "novel_chapters_view",
  data() {
    return {
      field: "novel_chapters_id",
      url_add: "~/api/novel_chapters/add?",
      url_set: "~/api/novel_chapters/set?",
      url_get_obj: "~/api/novel_chapters/get_obj?",
      query:{
        novel_chapters_id: 0
      },
      form: {
        "chapter_name": '', // 章节名称
        "sort": '', // 排序
        "chapter_content": '', // 章节内容
        "novel_chapters_id": 0
      },
    }
  },
  created() {
    if(this.$route.query.novel_reading_id){
      this.form.novel_reading_id = this.$route.query.novel_reading_id
    }else {
      this.form.novel_chapters_id = this.$route.query.novel_chapters_id
    }
  }
}
</script>

<style scoped>

</style>