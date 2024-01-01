<template>
  <div class="novel_read page_novel_reading">
    <div class="container">
      <el-row>
        <el-col :xs="6" :sm="6" :lg="6">
          <div class="novel_chapters">
            <div class="novel_chapters_title">小说目录</div>
            <div v-for="(item,index) in list">
              <div @click="changeChapter(index)" class="novel_chapters_list_item" :class="{'active':currentChapterIndex === index}">
                <span>第{{ index +  1 }}章</span>
                <span class="chapter_name">{{ item.chapter_name }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :lg="18">
          <div class="novel_content">
            <div class="content_title">
              {{ list[currentChapterIndex].chapter_name }}
            </div>
            <div class="fontSize_set">
              字体大小
              <el-input size="small" style="width: 50px" v-model="fontSize" />
            </div>
            <pre
                class="novel_content_html"
                v-html="list[currentChapterIndex].chapter_content"
                :style="{
                  fontSize: fontSize + 'px'
                }"
            >
            </pre>
            <div class="chapter_button">
              <el-button :disabled="currentChapterIndex <= 0" @click="changeChapter('prev')">上一章</el-button>
              <el-button :disabled="currentChapterIndex >= list.length -1" @click="changeChapter('next')">下一章</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import mixin from "@/mixins/page";

  export default {
    mixins:[mixin],
    data(){
      return {
        field: "novel_reading_id",
        url_get_list: "~/api/novel_chapters/get_list?",
        query: {
          "novel_reading_id": 0,
        },
        list:[],
        currentChapterIndex: 0,
        fontSize: 16
      }
    },
    methods:{
      changeChapter(operate){
        switch (operate){
          case "prev":{
            this.currentChapterIndex--
            break;
          }
          case "next":{
            this.currentChapterIndex++
            break;
          }
          default:{
            this.currentChapterIndex = operate
          }
        }
      }
    }
  }

</script>


<style scoped>
  .novel_read{
    padding-top: 168px;
  }
  .novel_chapters{
    padding: 10px;
  }
  .novel_chapters_title{
    font-size: 22px;
    font-weight: bold;
  }
  .novel_chapters_list_item{
    display: flex;
    flex-direction: row;
    margin-top: 5px;
  }
  .active{
    color: #2accfa;
  }
  .novel_chapters_list_item:hover{
    color: #2accfa;
    cursor: pointer;
  }
  .chapter_name{
    margin-left: 5px;
  }
  .novel_content{
    padding: 10px;

  }
  .novel_content_html{
    padding: 20px;
  }
  .content_title{
    font-weight: bold;
    font-size: 24px;
    text-align: center;
  }
  .fontSize_set{
    font-size: 16px;
  }
  .chapter_button{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>