<template>
    <div id="testProjectSelect">
        <self-cascader 
            placeholder="选择项目组"
            valueKey="value" 
            :selectValue.sync="currentProjectCode"
            :options="projectClassifyArr"
            @change="changeProject"
        />
    </div>
</template>
<script>
    import { getExpertGroup, getAuthByTable } from "@/api/toolHeader.js"
    import SelfCascader from '@/components/Common/SelfCascader.vue'
    export default {
        data() {
            return {
                currentProjectCode: "",
                //项目组别选项
                projectClassifyArr: [],
                compatibilityArr:[
                    "compatibilityTestReport", 
                    "compatibilityPCTestReport", 
                    "problemDeviceDetail",
                    "questionDetail", 
                    "weaknetTestReport", 
                    "performanceTestReport"
                    ],
                projectType:[
                    "testReport", 
                    "questionDetail", 
                    "deviceDetail"
                    ],
            }
        },
        components: {
            SelfCascader
        },
        created() {
            this.getProject();
        },
        methods: {
            setProject(val) {
                this.currentProjectCode = val;
            },

            //获取项目组数据
            getProject() {
                getExpertGroup(res => {
                    this.projectClassifyArr = res.data;
                    if (this.projectClassifyArr.length == 0) {
                        this.$store.commit("setNoProject", true);
                    } else {
                        let oldProject = this.$route.query.project;
                        let projectCode = oldProject;
                        let projectList = this.$publicJS.getCascacaderChoosed(this.projectClassifyArr, projectCode);
                        if (projectList.label == "") {
                            // 如果网址上project无效，则替换为数组中第一个项目组的值
                            projectCode = this.projectClassifyArr[0].children[0].value;
                        }
                        let path = this.$route.path;
                        let pathBri = path.split("/")[3];
                        //是否需要跳转到申请记录界面
                        let needJumpToApplicationRecord = false;
                        // TODO
                        if (this.projectType.includes(pathBri) && projectCode != "all") {
                            //当前界面是报告界面，且用户不能查看全部项目组
                            let testRecordName = this.$route.query.testRecordName;
                            //检测报告权限
                            getAuthByTable({ table_name: testRecordName }, res => {
                                if(res.data.belong_project) {
                                    //获取到当前报告所在项目组，且用户有该项目组权限
                                    this.currentProjectCode = res.data.project;
                                }else {
                                    needJumpToApplicationRecord = true;
                                }
                            })
                        }
                        if(this.currentProjectCode == ""){
                            this.currentProjectCode = projectCode;
                        }
                        let queryList = this.$route.query;
                        if(needJumpToApplicationRecord){
                            //当前网址没权限，需要跳转到申请记录界面
                            path = "/expertCompatibility/page/applicationRecord";
                            queryList = { project:this.currentProjectCode };
                        }
                        if(this.currentProjectCode != oldProject ){
                            //项目组发生变化
                            if(oldProject != undefined){
                                //项目组发生变化，提示
                                let projectName = this.$publicJS.getCascacaderChoosed(this.projectClassifyArr, this.currentProjectCode).label;
                                this.notifyError('已为您跳转到有权限的项目组：' + projectName);
                            }
                            queryList.project = this.currentProjectCode;
                        }
                        if(this.currentProjectCode != oldProject || needJumpToApplicationRecord){
                            // 切换路径，修改网址
                            this.$router.push({
                                path: path,
                                query: queryList
                            });
                            let url = path + this.$publicJS.getQueryStr(queryList);
                            history.pushState({ url: url, title: document.title }, document.title, url);
                        }
                        this.$store.commit("setProjectCode", this.currentProjectCode);
                        this.$publicJS.judgeAdmin(this);
                    }
                })
            },
            
            //左上角切换、无权限提示
            notifyError(msg) {
                this.$notify.error({
                    title: '提示',
                    message: msg,
                    showClose: true,
                    position: 'top-left',
                    offset: 50,
                });
            },

            //切换项目组 
            changeProject() {
                this.$store.commit('setProjectCode', this.currentProjectCode);
                //不能用this.$route.path报告界面网址和url会对不上（因为报告界面用了iframe，为了效率没有在页面切换显示的时候使用当前网页的route.push，而是获取到iframe中的变化直接修改网址）
                // 测试报告页 /mtl_test_platform/compatibilityTestReport或者/mtl_test_platform/compatibilityPCTestReport
                // 测试申请详情界面 /mtl_test_platform/page/expertServices/compatibilityPCTestDetail或者/mtl_test_platform/page/expertServices/compatibilityTestDetail
                let urlArr = location.pathname.split('/');
                let pathBri = urlArr[urlArr.length - 1];
                let path = "";
                if (this.compatibilityArr.includes(pathBri)) {
                    //测试报告界面和申请详情界面，切换项目组时跳转回申请记录界面
                    path = "/mtl_test_platform/page/expertServices/serviceOrdersList";
                }
                let queryList = {};
                if (pathBri.indexOf('StartTest')) {
                    //开始测试界面，网址中有较多参数，要获取query
                    queryList = this.$route.query;
                }
                queryList.project = this.currentProjectCode;
                let url = path + this.$publicJS.getQueryStr(queryList);
                history.pushState({ url: url, title: document.title }, document.title, url);
                window.location.reload();
            },
        }
    }
</script>
<style scoped>
    #testProjectSelect .el-input__inner {
        border-color: transparent;
    }

    #testProjectSelect>>>.el-input__inner {
        border-radius: 18px;
        height: 30px;
        background-color: #f4f4f4;
    }

    #testProjectSelect .el-input__icon.el-icon-arrow-down {
        font-weight: bold;
    }

    #testProjectSelect #projectSearchInput:hover .el-input__inner {
        color: #303133;
    }

    #testProjectSelect #projectSearchInput:hover .el-input__icon.el-icon-arrow-down {
        color: #303133;
    }
</style>