<template>
    <div class="activity-release">
        <div class="activity-release-container">
            <div class="ar-name fh">
                <div class="rowTitle">
                    <span>活动名称</span>
                </div>
                <el-input v-model="activityData.actName" placeholder="请输入内容" class="rowCon" @change="checkEmpty('actName')"></el-input>
                <div class="errorBox">{{errorMsg.actName}}</div>
            </div>
            <div class="ar-img">
                <div class="rowTitle">
                    <span>活动海报</span>
                </div>
                <!-- <form action='http://10.4.72.133:8040/uploadImageServlet' method="post" enctype="multipart/form-data" class="rowCon" >
                    <input type="file" name="imageFile" @change="fileImage">
                    <input type="hidden" name="userId" :value="USERID">
                    <input type="submit" value="提交图片">
                </form> -->
                <el-button type="primary" id="upJS" @click="uploadimg" size="mini">选择图片</el-button>
                <input type="file" id="upfile" value="选择图片" @change="chooseImg">
                <el-button type="primary" id="upJS" @click="uploadimg" size="mini">上传图片</el-button>
                <div class="errorBox">{{errorMsg.actImg}}</div>
            </div>
            <div class="fh">
                <div class="rowTitle"></div>
                <div class="file-image"><img src="../../assets/images/avatar-default.png" alt="" id='imagebg'></div>
            </div>
            <div class="ar-time fh">
                <div class="rowTitle">
                    <span>活动时间</span>
                </div>
                <el-date-picker
                    v-model="activityData.actStartTime"
                    type="datetime"
                    placeholder="选择日期时间" @change="checkEmpty('actTime')" value-format="timestamp">
                </el-date-picker>---
                <el-date-picker
                    v-model="activityData.actEndTime"
                    type="datetime"
                    placeholder="选择日期时间" @change="checkEmpty('actTime')" value-format="timestamp">
                </el-date-picker>
                <div class="errorBox">{{errorMsg.actTime}}</div>        
            </div>
            <div class="ar-place fh">
                <div class="rowTitle">
                    <span>活动地点</span>
                </div>
                <el-input v-model="activityData.actPlace" placeholder="请输入内容" class="rowCon" @change="checkEmpty('actPlace')"></el-input>   
                <div class="errorBox">{{errorMsg.actPlace}}</div>             
            </div>
            <div class="ar-con">
                <div class="rowTitle">
                    <span>活动简介</span>
                </div>
                <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="activityData.actCon" class="rowCon" @change="checkEmpty('actCon')"></el-input>
                <div class="errorBox">{{errorMsg.actCon}}</div>
            </div>
            <!-- <div class="">
                <div class="rowTitle">
                    <span>权限</span>
                </div>
                <el-select v-model="activityData.authVal" placeholder="请选择" size="small">
                    <el-option
                        v-for="item in perOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="select-person" v-show="activityData.authVal == 2">
                    <a @click="selectPersonHandler" class="select-person-title">请选择委员</a>
                </div>
                <div class="select-person" v-show="activityData.authVal == 2 && showPersonal">
                    <el-select v-model="person" placeholder="请选择" size="small">
                        <el-option
                            v-for="item in personOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div> -->
            <div class="ar-permission fh">
                <div class="rowTitle">
                    <span>权限</span>
                </div>
                <!-- <el-select v-model="activityData.actPer" placeholder="请选择" size="small" @change="checkEmpty('actPer')">
                    <el-option
                        v-for="item in perOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>    -->
                <el-select v-model="activityData.actPer" placeholder="请选择" size="small" @change="showPersonal = false">
                    <el-option
                        v-for="item in perOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="select-person" v-show="activityData.actPer == 2">
                    <a @click="selectPersonHandler" class="select-person-title">请选择委员</a>
                </div>
                <div class="select-person" v-show="activityData.actPer == 2 && showPersonal">
                    <el-select v-model="activityData.person" placeholder="请选择" size="small">
                        <el-option
                            v-for="item in personOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="errorBox">{{errorMsg.actPer}}</div>        
            </div>
            <div class="ar-btn">
                <el-button type="primary" size="small" @click="release">发表</el-button>
                <el-button type="default" size="small" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import pageData from "../../api/activityRelease/activityRelease.js"
import "../../assets/style/font-icon/iconfont.css"
import $ from 'jquery'

export default {
    name: "activityRelease",
    data() {
        return {
            errorMsg:{
                actName:'',
                actTime:"",
                actPlace:"",
                actCon:"",
                actPer:"",
                actImg:"",
            },
            activityData:{
                actName:'',//活动名称
                actStartTime:"",//活动时间
                actEndTime:"",
                actPlace:"",//活动地点
                actCon:"",//活动简介
                actPer:"",//活动权限
                actImg:"",
                person:'',
            },
            perOptions: [
                {
                label: "公开",
                value: "1"
                },
                {
                label: "不公开",
                value: "2"
                }
            ],
            imgFile:'',
            personOptions: [],
            showPersonal: false
        };
    },
    created() {
        this.USERID=sessionStorage.getItem("userId")
        this.personOptions = [
            {label:"人",value:1},
            {label:"人2",value:2},
        ]
    },
    methods: {
        //校验是否为空
        checkEmpty(val){
            this.errorMsg[val] = '';
            if(this.activityData[val] === '') {
                this.errorMsg[val] = '此项不能为空';
                return false;
            }else{
                return true;
            }
        },
        //点击发表
        release(){
            var _this = this;
            var data = {
                userId:sessionStorage.getItem("userId"),
                title: this.activityData.actName,
                content: this.activityData.actCon,
                banner: this.activityData.actImg,
                begintime: this.activityData.actStartTime,
                endtime: this.activityData.actEndTime,
                address: this.activityData.actPlace,
            }
            if(!this.activityData.actImg){
                this.errorMsg.actImg = ""
                // data.banner = this.activityData.actImg;
                if(this.checkEmpty('actName') && this.checkEmpty('actStartTime') && this.checkEmpty('actEndTime') && this.checkEmpty('actPlace') && this.checkEmpty('actCon')){
                    pageData.releaseAct(data).then(function (d) {
                        if(d.resultCode == 200) {
                            _this.$message({
                                message: '活动发布成功',
                                type: 'success'
                            });
                        }else{
                            _this.$message({
                                type: "warning",
                                message: d.resultMessage
                            });
                        }
                    })
                }
            }else{
                this.errorMsg.actImg = "请先上传图片"
                return;
            }
        },
        //点击取消
        cancel(){
            this.activityData = {
                actName:'',
                actStartTime:"",
                actEndTime:"",
                actPlace:"",
                actCon:"",
                actPer:"",
                actImg:"",
            }
        },
        //选择图片
        chooseImg(){
            this.errorMsg.actImg = "";
            this.imgFile = $("#upfile").get(0).files[0]
            $('#imagebg').attr('src',getObjectURL(this.imgFile));
            //不同浏览器下的路径不同
            function getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            }
        },
        //上传图片
        // fileImage(e){
        //     var that=this;
        //     var file = e.target.files[0];
        //     var imgSize=file.size/1024;
        //     var reader = new FileReader();
        //     reader.readAsDataURL(file);
        //     reader.onloadend=function(){ 
        //         that.activityData.actImg = reader.result  
        //         that.checkEmpty('actImg')   
        //     }
            
        // },
        uploadimg(){
            var _this = this;
            this.errorMsg.actImg = "";
            var fd = new FormData();
            var img = $("#upfile").get(0).files[0]
            if(img){
                fd.append("userId", sessionStorage.getItem("userId"));
                fd.append("upfile", img);
            }else{
                this.errorMsg.actImg = "请先选择图片";
                return;
            }
            $.ajax({
                url: "http://118.144.88.221:8040/uploadImageServlet",
                type: "POST",
                processData: false,//不处理发送的数据，因为data值是FormData对象，不需要对数据做处理  
                contentType: false,//不设置Content-type请求头  
                data: fd,
                success: function(d) {
                    var d = JSON.parse(d);
                    if(d.resultCode == 200){
                        _this.activityData.actImg = d.resultJson[0]
                    }else{
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
        // 请选择委员
        selectPersonHandler() {
            this.showPersonal = !this.showPersonal;
        }
    },
};
</script>

<style scoped>
.activity-release{
    height:100%;
    position: relative;
}
.activity-release .activity-release-container {
  border: 1px solid #e9eef3;
  padding: 0 20px;
  /* height: 100%; */
}
.activity-release .ar-btn{
    position: absolute;
    bottom:20px;
    right:20px;
}
.activity-release .fh{
    height:auto;
    line-height: 65px;
    display: flex;
}
.activity-release .el-input{
    width:auto;
}
.activity-release .el-textarea{
    width:300px;
    vertical-align: middle
}
.activity-release .rowTitle{
    display: inline-block;
    width:120px;
}
.activity-release .rowCon{
    display: inline-block;
    /* width:120px; */
}
.activity-release .errorBox{
    display: inline-block;
    color:red
}
.activity-release .ar-img{
    position: relative;
}
.activity-release .showImg{
    height:auto
}
.activity-release .file-image{
    margin-top:15px;
    display: inline-block;
    border: 1px solid #999;
    height: 130px;
}
.activity-release .file-image #imagebg{
    height:130px;
}
.activity-release #upfile{
    opacity: 0;
    position: absolute;
    left:125px;
    width:80px;
}
.ar-permission .select-person {
    display: inline-block;
    padding-left: 20px;
}
.ar-permission .select-person-title {
    color: #409EFF;
    cursor: pointer;
}
.ar-permission .select-person-title:hover {
    color: #248df9;
    cursor: pointer;
}
</style>
