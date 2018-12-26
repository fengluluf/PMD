<template>
    <div class="news-pub">
        <div class="news-pub-container">
            <div class="pub-header">
                新闻发布
                <div class="pub-action">
                    <a>草稿箱</a> | <router-link to="/newsList">返回新闻列表</router-link>
                </div>
            </div>
            <div class="pub-main">
                <!-- <div class="news-pub-title">
                    <quill-pubor 
                        v-model="content"
                        ref="myQuillpubor"
                        :options="puborOption"
                        @blur="onpuborBlur($event)"
                        @focus="onpuborFocus($event)"
                        @ready="onpuborReady($event)">
                    </quill-pubor>
                </div> -->
                <div class="pub-titcon">
                    <div class="pub-title">
                        <input placeholder="请输入标题" type="text" class="newsInput" v-model="newsTitle">
                        <span class="el-icon-circle-close" @click="clearTitle"></span>
                    </div>
                    <div class="pub-con">
                        <textarea placeholder="请输入正文......" class="newsCon" v-model="newsCon" rows="20"></textarea>
                    </div>
                </div>
                <div class="pub-auth">
                    <span>权限</span>
                    <el-select v-model="authVal" placeholder="请选择" size="small" @change="showPersonal = false">
                        <el-option
                            v-for="item in authOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <div class="select-person" v-show="authVal == 2">
                        <a @click="selectPersonHandler" class="select-person-title">请选择委员</a>
                    </div>
                    <div class="select-person" v-show="authVal == 2 && showPersonal">
                        <el-select v-model="person" placeholder="请选择" size="small">
                            <el-option
                                v-for="item in personOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div> -->
                </div>
                <div class="news-pub-action">
                    <div class="left-action">
                        <el-button type="primary" size="small" @click="newsPublishHandler">发表</el-button>
                        <el-button size="small" @click="newsCancelHandler">取消</el-button>
                    </div>  
                    <div class="right-action">
                        <el-button type="primary" size="small" @click="newsPreviewHandler">预览</el-button>
                        <el-button size="small" @click="newsSaveHandler">保存</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="预览"
            :visible.sync="dialogPreview"
            width="70%"
            :before-close="handleClose">
            <div class="news-detail-dialog">
                <div class="news-title">
                    {{newsTitle}}
                </div>
                <div class="news-content">
                    {{newsCon}}
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button size="small" @click="dialogPreview = false">取 消</el-button> -->
                <el-button size="small" type="primary" @click="dialogPreview = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import PageData from "../../api/news/newsPub.js"
import "../../assets/style/font-icon/iconfont.css"

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"]
];

export default {
  name: "newsPub",
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          //   ImageExtend: {
          //     loading: true,
          //     name: "img",
          //     action: 'updateUrl',//服务器上传图片路径
          //     response: res => {
          //       return res.info;
          //     }
          //   },
          //   toolbar: {
          //     container: container,
          //     handlers: {
          //       image: function() {
          //         QuillWatch.emit(this.quill.id);
          //       }
          //     }
          //   },
          toolbar: toolbarOptions,
        }
      },
      authOptions: [
        {
          label: "公开",
          value: "1"
        },
        // {
        //   label: "指定人员可见",
        //   value: "2"
        // }
      ],
      authVal: "",
      dialogPreview: false,
      newsTitle:'',//新闻标题
      newsCon:"",//新闻主体
      showPersonal: false,
      person:'',
      personOptions: [],
    };
  },
  created() {
    // PageData.personList().then(d=>{
    //     if(d.resultCode == 200) {
    //         this.personOptions = [
    //             {label:"人",value:1},
    //             {label:"人2",value:2},
    //         ]
    //     } else {
    //         this.$message({
    //             type: "waring",
    //             message: "获取人员失败"
    //         });
    //     }
    // }).catch(()=>{
    //     this.$message({
    //         type: "waring",
    //         message: "获取人员失败"
    //     });
    // })
  },
  methods: {
    onEditorBlur(quill) {},
    onEditorFocus(quill) {},
    onEditorReady(quill) {},
    // 发表
    newsPublishHandler() {
      // 这是编辑器的文本html内容
      var htmlContent = this.content;
      // 发请求
      var data = {};
      data.params = {};
      data.params.title = this.newsTitle;
      data.params.content = this.newsCon;
      data.params = JSON.stringify(data.params);
      data.userId = sessionStorage.getItem("userId"),
      PageData.sendNews(data).then(d => {
        if(d.resultCode == 200){
            this.$message({
                type: "success",
                message: d.resultMessage
            });
            this.newsTitle = '';
            this.newsCon = '';
        }else{
            this.$message({
                type: "warning",
                message: d.resultMessage
            });
        }
    });
    },
    // 取消
    newsCancelHandler() {},
    // 预览
    newsPreviewHandler() {
      this.dialogPreview = true;
    },
    // 保存
    newsSaveHandler() {},
    handleClose() {
        this.dialogPreview = false;
    },
    //清除新闻标题
    clearTitle(){
        this.newsTitle = '';
    },
    // 请选择委员
    selectPersonHandler() {
        this.showPersonal = !this.showPersonal;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.news-pub .news-pub-container {
  border: 1px solid #e9eef3;
}
.news-pub-container .pub-header {
  font-size: 14px;
  padding: 12px;
  background: #e9eef3;
  overflow: auto;
}
.news-pub-container .pub-header .pub-action {
  float: right;
}
.pub-header .pub-action > a {
  cursor: pointer;
}
.pub-header .pub-action > a:hover {
  color: #409eff;
}
.news-pub-container .pub-main {
  padding: 12px;
}
.news-pub-container .pub-main .pub-auth {
  padding: 15px 10px;
  font-size: 14px;
}
.pub-main .news-pub-action {
  padding-top: 20px;
  overflow: auto;
}
.pub-main .news-pub-action .left-action {
  float: left;
}
.pub-main .news-pub-action .right-action {
  float: right;
}
.pub-main .pub-title{
    height: 40px;
    line-height: 40px;
    padding:0 10px;
    border-bottom:1px solid #c8c8c8;
    position: relative;
}
.pub-main .pub-title input{
    border:none;
    width:100%;
    height:35px;
    outline: none;
    font-size: 18px;
    font-weight: bold
}
.pub-main .pub-title input::-webkit-input-placeholder{
    font-size: 18px;
    font-weight: bold
}
.pub-main .pub-title .el-icon-circle-close{
    position:absolute;
    height:40px;
    line-height:40px;
    top :0;
    right:20px;
    font-size:24px;
    color:#999;
}
.pub-main .pub-con .newsCon{
    margin-top: 15px;
    /* border:none; */
    width:100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    font-family: Arial,Tahoma,"Microsoft Yahei","Hiragino Sans GB","Helvetica Neue",Simsun,sans-serif;;
    font-size: 14px;
    box-sizing: border-box;
}
.news-detail-dialog > div {
    padding-bottom: 15px;
}
.news-detail-dialog .news-title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}
.pub-auth .select-person {
    display: inline-block;
    padding-left: 20px;
}
.pub-auth .select-person-title {
    color: #409EFF;
    cursor: pointer;
}
.pub-auth .select-person-title:hover {
    color: #248df9;
    cursor: pointer;
}
</style>
