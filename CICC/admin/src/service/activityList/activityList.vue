<template>
    <div class="activity-list-container">
        <div class="activity-list-header">
            <ul>
                <li>
                    <span>时间</span>
                    <el-date-picker
                        v-model="searchData.activityDate"
                        size="small"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="timestamp">
                    </el-date-picker>
                </li>
                <li>
                    <span>标题</span>
                    <el-input size="small" v-model="searchData.title" placeholder="输入标题关键字"></el-input>
                </li>
                <li>
                    <span>发布人</span>
                    <el-input size="small" v-model="searchData.author" placeholder="请输入作者进行查询"></el-input>
                </li>
                <li>
                    <span>活动状态</span>
                    <el-select filterable size="small" v-model="searchData.activity" placeholder="请选择">
                        <el-option v-for="(item,index) in activityOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </li>
                <!-- <li>
                    <span>审核状态</span>
                    <el-select filterable size="small" v-model="searchData.status" placeholder="请选择">
                        <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </li> -->
                <li>
                    <el-button type="primary" size="small" @click="activitySearchHandler">搜索</el-button>
                </li>
            </ul>
        </div>
        <div class="activity-list-main">
            <el-table :data="tableData" border style="width: 100%" size="small">
                <el-table-column  align="center" type="index" label="序号" width="60"></el-table-column>
                <el-table-column  align="center" prop="id" label="活动ID" width="120"></el-table-column>
                <el-table-column  align="center" prop="title" label="活动标题" width=""></el-table-column>
                <el-table-column  align="center" prop="createTime" label="发布时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.createTime | formatDate}}
                    </template> 
                </el-table-column>
                <el-table-column  align="center" prop="beginDate" label="活动时间" width="180">
                    <template slot-scope="scope">
                        {{scope.row.beginDate}}<span> - </span>{{scope.row.endDate}}
                    </template> 
                </el-table-column>
                <el-table-column  align="center" prop="address" label="活动地点" width=""></el-table-column>
                <el-table-column  align="center" prop="editorName" label="发布者" width="120"></el-table-column>
                <el-table-column  align="center" prop="banner" label="图片" width="100">
                    <template slot-scope="scope">
                      <img :src="scope.row.banner" class="img-content">
                  </template>
                </el-table-column>
                <el-table-column  align="center" prop="activityStatusStr" label="活动状态" width="100"></el-table-column>
                <el-table-column  align="center" prop="content" label="详情" width="80"></el-table-column>
                <el-table-column  align="center" prop="statusStr" label="审核状态" width="80"></el-table-column>
                <!-- <el-table-column  align="center" prop="content" label="内容" width="">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="activityDetailHandler(scope.row)">详情</el-button>
                    </template>   
                </el-table-column> -->
                <el-table-column  align="center"  width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="isTop(scope.row,scope.$index)" v-if="scope.row.istop == 0">取消置顶</el-button>
                        <el-button type="text" size="small" @click="isTop(scope.row,scope.$index)" v-else>置顶</el-button>
                        <el-button type="text" size="small" @click="activityReview(scope.row,scope.$index)">审核</el-button>
                        <!-- <el-button type="text" size="small" @click="activityReview(scope.row,scope.$index)" v-if="scope.row.status == 1">审核</el-button> -->
                        <el-button type="text" size="small" @click="activityDelete(scope.row)">删除</el-button>
                    </template>   
                </el-table-column>
            </el-table>
        </div>
        <div class="activity-list-footer">
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
            title="详情"
            :visible.sync="dialogPreview"
            width="70%"
            :before-close="handleClose">
            <div class="ql-container">
                <div class="activityTitle">
                    {{activityDetail.title}}
                </div>
                <div class="activityAuthor">
                    作者：{{activityDetail.editorName}}
                </div>
                <div class="activityContent">
                    {{activityDetail.content}}
                </div>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogPreview = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogPreview = false">确 定</el-button>
            </span> -->
        </el-dialog>

        <el-dialog
            title="审核"
            :visible.sync="dialogReview"
            width="500px"
            :before-close="handleClose">
            <div class="activity-review-dialog">
                <ul>
                    <li>
                        <span class="review-title">审核</span>
                        <div>
                            <el-radio v-model="review.pass" label="1">通过</el-radio>
                            <el-radio v-model="review.pass" label="2">不通过</el-radio>
                        </div>
                    </li>
                    <li>
                        <span class="review-title">原因</span>
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 6}"
                            placeholder="请输入内容"
                            v-model="review.cause">
                        </el-input>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer text-center">
                <el-button size="small" type="primary" @click="sendReviewData()">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import pageData from "../../api/activityList/activityList.js"
import {formatDate} from '../../util/base.js';

export default {
  name: "activityList",
  data() {
    return {
      searchData: {
        activityDate:"",
        title: "",
        author: "",
        activity:'',
        status:''
      },
      tableData: [ {name: 1}],
      pager: {
          currentPage: 1,
          pageSize: 6,
          total: 0
      },
      dialogPreview: false,
      activityDetail: {}, 
      clickidx:1,
      dataidx:1,
      deleteidx:1,
      dialogReview: false,
      review: {
        pass: '',
        cause:''
      },
      statusOptions: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "未审核",
          value: 1
        },
        {
          label: "已通过",
          value: 2
        },
        {
          label: "未通过",
          value: 3
        }
      ],
      showActivityOptions: [
        {
          label: "未开始",
          value: 4
        },
        {
          label: "进行中",
          value: 5
        },
        {
          label: "已结束",
          value: 6
        }
      ],
      activityOptions: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "未审核",
          value: 1
        },
        {
          label: "已通过",
          value: 2
        },
        {
          label: "未通过",
          value: 3
        },
        {
          label: "未开始",
          value: 4
        },
        {
          label: "进行中",
          value: 5
        },
        {
          label: "已结束",
          value: 6
        }
      ],
    };
  },
  filters: {
    formatDate(time) {
        if(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm");
        }
    }
  },
  created() {
      this.getTableData();
    //   this.tableData = [
    //     {
    //       id: '111',
    //       title: '这是新闻标题111',
    //       date: '2016-05-02',
    //       name: '王小虎',
    //       content: '认真贯彻......'
    //     },
    //   ]
  },
    methods: {
        getTableData() {
            var _this=this;
            if(_this.dataidx==1){
                _this.dataidx=0;
                _this.getTableData();                
                return;
            }
            var data = {
                userId:sessionStorage.getItem("userId"),
                search:'',
                pageNo: this.pager.currentPage,
                pageSize: this.pager.pageSize,
            };
            pageData.getList(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.tableData = d.resultJson.pageContent
                    _this.pager.pageNo = d.resultJson.pageNum;
                    _this.pager.totalPage = d.resultJson.totalPage;
                    _this.pager.total = d.resultJson.count;
                    this.getStatusStr('review');
                    this.getStatusStr('activity');
                }else{
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            })
        },
        getStatusStr(val){
            if(val == 'review') {
                this.tableData.map((item)=>{
                    var statusObj = this.statusOptions.find((statusItem)=>{
                        return statusItem.value == item.status
                    })
                    item.statusStr == statusObj.label ? statusObj.label : item.status;
                })
            }
            if(val == 'activity') {
                this.tableData.map((item)=>{
                    var statusObj = this.showActivityOptions.find((statusItem)=>{
                        return statusItem.value == item.status
                    })
                    item.activityStatusStr == statusObj.label ? statusObj.label : item.status;
                })
            }
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
            this.dialogPreview = false;
            this.dialogReview = false;
        },
        //打开详情
        activityDetailHandler(row) {
            this.activityDetail = row;
            this.dialogPreview = true;
        },
        // 点击审核
        activityReview(row) {
            this.dialogReview = true;
        },
        // 审核提交
        sendReviewData() {
            var data = {};
            data.pass = this.review.pass;
            data.cause = this.review.cause;
            data.userId = sessionStorage.getItem("userId");
            
            if(this.review.pass == 1) {
                PageData.itemReviewPass(data).then(d => {
                    if (d.resultCode == 200) {
                        this.$message({
                            type: "success",
                            message: "审核已提交"
                        },function(){
                            this.dialogReview = false;
                            this.getTableData();
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: "审核失败，请重新提交。"
                        });
                    }
                });
            } else {
                PageData.itemReviewFail(data).then(d => {
                    if (d.resultCode == 200) {
                        this.$message({
                            type: "success",
                            message: "审核已提交"
                        },function(){
                            this.dialogReview = false;
                            this.getTableData();
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: "审核失败，请重新提交。"
                        });
                    }
                });
            }
        },
        //删除活动
        activityDelete(row){
            var _this = this;
            // if(_this.deleteidx==1){
            //     var item = row
            //     _this.deleteidx=0;
            //     _this.activityDelete(item);                
            //     return;
            // }
            // console.log(row)
            var data = 'ids='+row.id;
            var data = {
                userId:sessionStorage.getItem("userId"),
                ids:row.id,
            }
            pageData.deleteOne(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    _this.getTableData();
                }else{
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            })
        },
        //点击搜索
        activitySearchHandler() {
            var _this=this;
            if(_this.clickidx==1){
                _this.clickidx=0;
                _this.activitySearchHandler();                
                return;
            }
            var data = {
                userId:sessionStorage.getItem("userId"),
                title:this.searchData.title,
                editorName:this.searchData.author,
                pageNo: this.pager.currentPage,
                pageSize: this.pager.pageSize,
            };
            if(this.searchData.activityDate){
                data.begintime = this.searchData.activityDate[0];
                data.endtime = this.searchData.activityDate[1]
            }
            if (this.searchData.activity) {
                if(this.searchData.activity == '-1') {
                    data.activity = '';
                } else {
                    data.activity = this.searchData.activity;
                }
            }
            if (this.searchData.status) {
                if(this.searchData.status == '-1') {
                    data.status = '';
                } else {
                    data.status = this.searchData.status;
                }
            }
            pageData.selectList(data).then(function (d) {
                if(d.resultCode == 200) {
                    _this.tableData = d.resultJson.pageContent;
                    _this.pager.pageNo = d.resultJson.pageNum;
                    _this.pager.totalPage = d.resultJson.totalPage;
                    _this.pager.total = d.resultJson.count;
                    this.getStatusStr;
                }else{
                    _this.$message({
                        type: "warning",
                        message: d.resultMessage
                    });
                }
            })
        },
        //是否置顶
        isTop(row,idx){
            //   调用接口，置顶请求完成后，重新请求当页数据
            // var istop = this.tableData[idx].istop;
            // if(istop==0){
            //     this.tableData[idx].istop = 1;
            //     this.getTableData()
            // }else{
            //     this.tableData[idx].istop = 0;
            //     this.getTableData()
            // }

            var data = {};
            data.id = row.id;
            data.userId = sessionStorage.getItem("userId");
            if(top == 0) {
                data.top = 1
            } else {
                data.top = 0
            }      
            PageData.itemTop(data).then(d => {
                if (d.resultCode == 200) {
                    this.getTableData();
                } else {
                    this.$message({
                        type: "warning",
                        message: "置顶失败，请稍后重试。"
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
.activity-list-container .activity-list-header ul {
  list-style: none;
  overflow: auto;
}
.activity-list-container .activity-list-main {
  padding-top: 20px;
}
.activity-list-container .activity-list-footer {
  text-align: right;
  padding-top: 30px;
}
.activity-list-header ul li {
  float: left;
  padding-right: 20px;
}
.activity-list-header ul li > .el-input {
  display: inline-block!important;
  width: 200px!important;
}
.activity-list-container .el-dialog .el-dialog__body{
    overflow-y: auto!important;
    height:250px;
}
.activity-list-container .activityTitle{
    height:40px;
    line-height: 40px;
    font-size: 18px;
}
.activity-list-container .activityAuthor{
    height:40px;
    line-height: 40px;
}
.activity-list-container .activityContent{
    /* height:140px; */
    /* line-height: 40px; */
}
.activity-review-dialog ul li {
    display: flex;
    padding-bottom: 15px;
}
.activity-review-dialog .review-title {
    width: 60px;
}
.activity-list-container .img-content{
  width: 80%;
}
</style>
