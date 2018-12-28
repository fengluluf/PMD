<template>
    <div class="banner-list-container">
        <div class="banner-list-header">
            <ul>
                <li>
                    <el-button type="primary" size="small" @click="addBannerHandler">添加图片</el-button>
                </li>
            </ul>
        </div>
        <div class="banner-list-main">
            <el-table :data="tableData" border style="width: 100%" size="small">
                <el-table-column  align="center" type="index" label="序号" width="60"></el-table-column>
                <el-table-column  align="center" prop="id" label="ID" width="160"></el-table-column>
                <el-table-column  align="center" prop="name" label="标题" width=""></el-table-column>
                <el-table-column  align="center" prop="typeStr" label="类型" width=""></el-table-column>
                <el-table-column  align="center" label="图片" width="200px">
                  <template slot-scope="scope">
                      <img :src="scope.row.imageUrl" class="img-content">
                  </template>
                </el-table-column>
                <el-table-column  align="center" prop="link" label="链接" width=""></el-table-column>
                <el-table-column  align="center" prop="createTime" label="时间" width="200"></el-table-column>
                <el-table-column  align="center"  width="180" label="基本操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="updateItemHandler(scope.row,scope.$index)">修改</el-button>
                        <el-button type="text" size="small" @click="isShowBanner(scope.row,1)" v-if="scope.row.status == 1">隐藏</el-button>
                        <el-button type="text" size="small" @click="isShowBanner(scope.row,2)" v-else-if="scope.row.status == 2">显示</el-button>
                        <el-button type="text " size="small" @click="deleteItemHandler(scope.row)" class="text-danger">删除</el-button>
                    </template>   
                </el-table-column>
            </el-table>
        </div>
        <div class="banner-list-footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pager.currentPage"
                :page-size="pager.pageSize"
                layout="prev, pager, next, jumper"
                :total="pager.total">
            </el-pagination>
        </div>
        <el-dialog
            title="添加图片"
            :visible.sync="dialogAddBanner"
            width="500px"
            :before-close="handleClose">
            <div class="banner-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">标题</span>
                        <el-input
                            type="text"
                            size="small"
                            placeholder="请输入内容"
                            v-model="banner.name">
                          </el-input>
                    </li>
                    <li>
                        <span class="content-title">图片</span>
                        <div>
                          <el-upload
                            ref="upload"
                            class="upload-wrapper"
                            action="http://118.144.88.221:8040/uploadImageServlet/"
                            :http-request="bannerUpload"
                            :file-list="banner.fileList"
                            :limit='1'
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </div>
                    </li>
                    <li>
                        <span class="content-title">类型</span>
                        <el-select filterable size="small" v-model="banner.type" placeholder="请选择">
                          <el-option v-for="(item,index) in bannerTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </li>
                    <li>
                        <span class="content-title">链接</span>
                        <el-input
                            type="text"
                            size="small"
                            placeholder="请输入内容"
                            v-model="banner.link">
                        </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">返回</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改轮播图"
            :visible.sync="dialogUpdateBanner"
            width="500px"
            :before-close="handleClose">
            <div class="banner-content-dialog">
                <ul>
                    <li>
                        <span class="content-title">标题</span>
                        <el-input
                            type="text"
                            size="small"
                            placeholder="请输入内容"
                            v-model="modifyBanner.name">
                          </el-input>
                    </li>
                    <li>
                        <span class="content-title">图片</span>
                        <div>
                          <el-upload
                            ref="upload"
                            class="upload-wrapper"
                            action="http://118.144.88.221:8040/uploadImageServlet/"
                            :http-request="bannerModifyUpload"
                            :file-list="modifyBanner.fileList"
                            :limit='1'
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </div>
                    </li>
                    <li>
                        <span class="content-title">类型</span>
                        <el-select filterable size="small" v-model="modifyBanner.type" placeholder="请选择">
                          <el-option v-for="(item,index) in bannerTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </li>
                    <li>
                        <span class="content-title">链接</span>
                        <el-input
                            type="text"
                            size="small"
                            placeholder="请输入内容"
                            v-model="modifyBanner.link">
                        </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendUpdateData()">提交</el-button>
                <el-button size="small" type="default" @click="cancelData()">返回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
var userId = sessionStorage.getItem("userId");
import PageData from "../../api/contentManage/bannerManage.js"
import {formatDate} from '../../util/base.js';
import $ from 'jquery'

export default {
  name: "newsList",
  data() {
    return {
      searchData: {
        commentDate: "",
        type: ""
      },
      dialogAddBanner: false,
      dialogUpdateBanner: false,
      tableData: [],
      pager: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      typeOptions: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "新闻",
          value: 0
        },
        {
          label: "军事",
          value: 1
        }
      ],
      banner: {
        name: '',
        img: '',
        type:1,
        link: '/newsDetials?id=',
        fileList: []
      },
      modifyBanner: {},
      bannerTypeOptions: [
        {
          label: '新闻',
          value: 1
        },
        // {
        //   label: '活动',
        //   value: 2
        // },
      ],
    };
  },
  created() {
    this.getTableData();
  },
  filters: {
    formatDate(time) {
        if(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    }
  },
  methods: {
    getTableData() {
      var _this = this;
      var data = {
        userId: userId,
        search: "",
        pageNo: this.pager.currentPage,
        pageSize: this.pager.pageSize
      };
      PageData.getList(data).then(function(d) {
        if (d.resultCode == 200) {
          _this.tableData = d.resultJson.pageContent;
          _this.pager.pageNo = d.resultJson.pageNum;
          _this.pager.totalPage = d.resultJson.totalPage;
          _this.pager.total = d.resultJson.count;
          _this.tableData.map((item)=>{
            var typeObj = _this.bannerTypeOptions.find((typeItem)=>{
              return typeItem.value == item.type
            })
            item.typeStr = typeObj && typeObj.label ? typeObj.label : item.type;
          })
        } else {
          _this.$message({
            type: "warning",
            message: d.resultMessage
          });
        }
      });
    },
    //pageSize 改变时会触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //当前页变动时触发
    handleCurrentChange(val) {
      this.pager.currentPage = val;
      this.getTableData();
    },
    //关闭详情弹窗
    handleClose() {
      this.dialogAddBanner = false;
      this.dialogUpdateBanner = false;
      this.banner = {
        name: '',
        img: '',
        type: 1,
        link: '/newsDetials?id=',
        fileList: []
      };
      this.modifyBanner = {};
    },
    //点击删除
    deleteItemHandler(row) {
        var _this = this;
        var data = {};
        var data = {
            userId: userId,
            ids: row.id
        };
        this.$confirm("请确认是否删除信息?", "友情提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(() => {
            PageData.deleteOne(data).then(d => {
                if (d.resultCode == 200) {
                    _this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                _this.getTableData();
                } else {
                    _this.$message({
                        type: "warning",
                        message: "删除失败，请稍后重试。"
                        // message: d.resultMessage
                    });
                }
            }).catch(()=>{
                _this.$message({
                    type: "warning",
                    message: "删除失败，请稍后重试。"
                });
            });
        })
        .catch(() => {});
    },
    addBannerHandler() {
      this.dialogAddBanner = true;
    },
    sendUpdateData() {
      var data = {};
      data.id = this.modifyBanner.id;
      data.name = this.modifyBanner.name;
      data.type = this.modifyBanner.type;
      data.imageUrl = this.modifyBanner.imageUrl;
      data.link = this.modifyBanner.link;
      data.status = 2;
      data.userId = userId;
      PageData.updateItem(data).then(d => {
          if (d.resultCode == 200) {
              this.$message({
                  message: "banner修改成功",
                  type: "success"
              });
              setTimeout(()=> {
                this.dialogUpdateBanner = false;
                this.getTableData();
              },1500)
          } else {
              this.$message({
                  type: "warning",
                  message: "banner修改失败，请稍后重试。"
                  // message: d.resultMessage
              });
          }
      }).catch(()=>{
          this.$message({
              type: "warning",
              message: "banner修改失败，请稍后重试。"
          });
      });
    },
    sendData() {
      var data = {};
      data.name = this.banner.name;
      data.type = this.banner.type;
      data.imageUrl = this.banner.imageUrl;
      data.link = this.banner.link;
      data.status = 2;
      data.userId = userId;
      PageData.insertItem(data).then(d => {
          if (d.resultCode == 200) {
              this.$message({
                  message: "banner创建成功",
                  type: "success"
              });
              setTimeout(()=>{
                this.dialogAddBanner = false;
                this.getTableData();
              },1500)
              
          } else {
              this.$message({
                  type: "warning",
                  message: "banner创建失败，请稍后重试。"
                  // message: d.resultMessage
              });
          }
      }).catch(()=>{
          this.$message({
              type: "warning",
              message: "banner创建失败，请稍后重试。"
          });
      });
    },
    cancelData() {
      this.dialogAddBanner = false;
      this.dialogUpdateBanner = false;
    },
    bannerUpload(content){
      var _this = this;
      var fd = new FormData();
      var img = content.file
      if(img){
          fd.append("userId", userId);
          fd.append("upfile", img);
      }else{
          return;
      }
      $.ajax({
          url: content.action,
          type: "POST",
          processData: false,
          contentType: false,
          data: fd,
          success: function(d) {
              var d = JSON.parse(d);
              if(d.resultCode == 200){
                content.onSuccess('上传成功');
                _this.banner.imageUrl = d.resultJson[0];
              }else{
                content.onError('上传失败')
                  _this.$message({
                      type: "warning",
                      message: d.resultMessage
                  });
              }
          },
          error:function(err){
              _this.$message({
                  type: "warning",
                  message: '网络错误'
              });
          }
      });
    },
    bannerModifyUpload(content){
      var _this = this;
      var fd = new FormData();
      var img = content.file
      if(img){
          fd.append("userId", userId);
          fd.append("upfile", img);
      }else{
          return;
      }
      $.ajax({
          url: content.action,
          type: "POST",
          processData: false,//不处理发送的数据，因为data值是FormData对象，不需要对数据做处理  
          contentType: false,//不设置Content-type请求头  
          data: fd,
          success: function(d) {
              var d = JSON.parse(d);
              if(d.resultCode == 200){
                content.onSuccess('上传成功');
                _this.modifyBanner.imageUrl = d.resultJson[0];
                  // _this.activityData.actImg = d.resultJson[0]
              }else{
                content.onError('上传失败')
                  _this.$message({
                      type: "warning",
                      message: d.resultMessage
                  });
              }
          },
          error:function(err){
              _this.$message({
                  type: "warning",
                  message: '网络错误'
              });
          }
      });
    },
    updateItemHandler(row,idx) {
      this.modifyBanner = row;
      this.dialogUpdateBanner = true;
      if(row.imageUrl) {
        this.modifyBanner.fileList = [];
        var img = {};
        img.url = row.imageUrl;
        this.modifyBanner.fileList.push(img);
      }
    },
    getShowBannerTable() {
        var newTable = [];
        this.tableData.map((item)=>{
            if(item.status == 1) {
                newTable.push(true)
            }
        })
        return newTable.length;
    },
    isShowBanner(row,status){
      var len = this.getShowBannerTable();
      
      if(len >= 5 && status == 2) {
          this.$message({
            type: "warning",
            message: 'banner最多显示5项'
          });
          return;
      }
      var data = {};
      data.createTime = row.createTime;
      data.id = row.id;
      data.name = row.name;
      data.type = row.type;
      data.imageUrl = row.imageUrl;
      data.link = row.link;
      data.userId = userId;
      if(status == 1) {
          data.status = 2
      } else {
          data.status = 1
      }      
      PageData.updateItem(data).then(d => {
            if (d.resultCode == 200) {
                this.getTableData();
            } else {
                this.$message({
                    type: "warning",
                    message: "失败，请稍后重试。"
                });
            }
        });
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style>
.banner-list-container .banner-list-header ul {
  list-style: none;
  overflow: auto;
}
.banner-list-container .banner-list-main {
  padding-top: 20px;
}
.banner-list-container .banner-list-footer {
  text-align: right;
  padding-top: 30px;
}
.banner-list-header ul li {
  float: left;
  padding-right: 20px;
}
.banner-list-header ul li .el-input {
  display: inline-block !important;
  width: 200px !important;
}
.news-detail-dialog {
  /* overflow: scroll; */
}
.banner-list-container .newsTitle {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}
.banner-list-container .newsAuthor {
  height: 40px;
  line-height: 40px;
}
.banner-list-container .newsContent {
  height: 40px;
  line-height: 40px;
}
.banner-list-container .el-dialog .el-dialog__body {
  overflow-y: auto !important;
  max-height: 300px;
  height: auto;
}
.banner-list-container .el-dialog__footer{
  text-align: center;
}
.banner-list-container .text-danger{
  color: #F56C6C;
}
.banner-list-container .img-content{
  width: 80%;
}
.banner-content-dialog ul li {
    display: flex;
    padding-bottom: 15px;
    align-items: center;
}
.banner-content-dialog .content-title {
    width: 60px;
}
</style>
