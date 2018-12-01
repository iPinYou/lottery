<template>
    <py-card>
        <div style="padding:10px 0;">
            <py-button @click="handleAdd">添加人员</py-button>
            <!--<py-button @click="handleExport">导出人员</py-button>-->
            <div style="width:230px;float: right;">
                <py-input placeholder="请输入要搜索的内容" suffix-icon="search" v-model="search" v-on:input="getPerson"></py-input>
            </div>
        </div>
        <py-table ref="multipleTable" :data="persons" v-loading="listLoading" @selection-change="selsChange"  style="width: 100%" border
                  stripe>
            <py-table-column  min-width="80px;" label="照片">
              <template slot-scope="scope">
                <img :src=scope.row.avatar style="width:80px;height:80px;"/>
              </template>
            </py-table-column>
            <py-table-column prop="id"  min-width="100px;" label="ID">
            </py-table-column>
            <py-table-column prop="name"  min-width="150px;" label="姓名">
            </py-table-column>
            <py-table-column prop="group" label="组别">
            </py-table-column>
            <py-table-column prop="department" min-width="300px;" label="部门">
            </py-table-column>
            <py-table-column label="状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    <py-switch v-model="scope.row.state" active-text="开启" inactive-text="关闭" @change="changeState(scope.row)"></py-switch>
                </template>
            </py-table-column>
            <py-table-column  label="操作" min-width="120px;" show-overflow-tooltip>
                <template slot-scope="scope">
                    <py-button type="primary" size="small" @click="handleEdit(scope.$index,scope.row)">编辑</py-button>
                    <py-button type="danger" size="small" @click="handleDel(scope.$index,scope.row)">删除</py-button>
                </template>
            </py-table-column>
        </py-table>

        <!--工具条-->
        <py-col :span="24" class="toolbar">
            <py-button type="danger" @click="batchRemovePerson" v-show="false" :disabled="this.sels.length===0">批量删除</py-button>
            <py-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
            </py-pagination>
        </py-col>

        <!--新增界面-->
        <py-dialog title="新增"  :visible.sync="addFormVisible" :close-on-click-modal="false">
            <py-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <py-form-item label="ID" prop="id">
                  <py-input v-model="addForm.id" auto-complete="off"></py-input>
                </py-form-item>
                <py-form-item label="姓名" prop="name">
                    <py-input v-model="addForm.name" auto-complete="off"></py-input>
                </py-form-item>
                <py-form-item label="组别" prop="group">
                    <py-input v-model="addForm.group"  placeholder="请输入组别">
                    </py-input>
                </py-form-item>
                <py-form-item label="部门" prop="departments">
                    <py-cascader
                            expand-trigger="hover"
                            :options="departmentOptions"
                            v-model="addForm.departments"
                            filterable
                            change-on-select
                    ></py-cascader>
                </py-form-item>
            </py-form>
            <div slot="footer" class="dialog-footer">
                <py-button @click.native="addFormVisible = false">取消</py-button>
                <py-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</py-button>
            </div>
        </py-dialog>

        <!--编辑界面-->
        <py-dialog title="编辑"  :visible.sync="editFormVisible" :close-on-click-modal="false">
            <py-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <py-form-item label="ID" prop="id">
                  <py-input v-model="editForm.id" auto-complete="off"></py-input>
                </py-form-item>
                <py-form-item label="姓名" prop="name">
                    <py-input v-model="editForm.name" auto-complete="off"></py-input>
                </py-form-item>
                <py-form-item label="组别" prop="group">
                    <py-input v-model="editForm.group"  placeholder="请输入组别">
                    </py-input>
                </py-form-item>
                <py-form-item label="部门" prop="departments">
                    <py-cascader
                            expand-trigger="hover"
                            :options="departmentOptions"
                            v-model="editForm.departments"
                            filterable
                            change-on-select
                    ></py-cascader>
                </py-form-item>
                <py-form-item label="状态" prop="state">
                    <py-switch v-model="editForm.state" active-text="开启" inactive-text="关闭"></py-switch>
                </py-form-item>
            </py-form>
            <div slot="footer" class="dialog-footer">
                <py-button @click.native="editFormVisible = false">取消</py-button>
                <py-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</py-button>
            </div>
        </py-dialog>

    </py-card>

</template>

<script>
  import { getPersonList,getPersonListPage,addPerson,removePerson,editPerson,batchRemovePerson,changePersonState,exportPerson } from '../../api/api';
  export default {
    data() {
      return {
        persons: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [], // 列表选中列
        search:'',
        departmentOptions:[
          {label:'顾问部',value:'顾问部'},
          {label:'财务部',value:'财务部'},
          {label:'联合商业伙伴部（JBP）',value:'联合商业伙伴部（JBP）',children:[{label:'运营部',value:'运营部'},]},
          {label:'数据产品及商业化事业部（DPD）',value:'数据产品及商业化事业部（DPD）',children:[{label:'产品部',value:'产品部'},{label:'技术客户部',value:'技术客户部'},{label:'流量平台支持部',value:'流量平台支持部'},]},
          {label:'政府事业部',value:'政府事业部'},
          {label:'国际事业部',value:'国际事业部'},
          {label:'市场战略与规划部（MSP）',value:'市场战略与规划部（MSP）'},
          {label:'大客户销售顾问部（SCG）',value:'大客户销售顾问部（SCG）',children:[{label:'SCG-华南',value:'SCG-华南'},{label:'SCG-华东',value:'SCG-华东'},]},
          {label:'品友推广中小企业产品及商业化事业部（BD）',value:'品友推广中小企业产品及商业化事业部（BD）',children:[{label:'资源整合部',value:'资源整合部'},{label:'渠道部',value:'渠道部'},{label:'商业运营部',value:'商业运营部'},{label:'产品技术部',value:'产品技术部'},]},
          {label:'效果营销产品及商业化事业部（PMD）',value:'效果营销产品及商业化事业部（PMD）',children:[{label:'产品部',value:'产品部'},{label:'创意',value:'创意'},{label:'项目运营',value:'项目运营'},{label:'媒介部',value:'媒介部'},{label:'苏宁项目',value:'苏宁项目'},{label:'产品运营',value:'产品运营'},]},
          {label:'品牌增长产品及商业化事业部（BGD）',value:'品牌增长产品及商业化事业部（BGD）',children:[{label:'产品部',value:'产品部'},{label:'媒介部',value:'媒介部'},{label:'项目运营部',value:'项目运营部'},{label:'自助',value:'自助'},{label:'优化',value:'优化'},{label:'产品运营',value:'产品运营'},]},
          {label:'市场公关部',value:'市场公关部'},
          {label:'人力资源部',value:'人力资源部',children:[{label:'业务支持中心',value:'业务支持中心'},{label:'人力资源共享中心',value:'人力资源共享中心'},]},
          {label:'行政部',value:'行政部',children:[{label:'采购部',value:'采购部'},{label:'员工支持部',value:'员工支持部'},]},
          {label:'高管助理',value:'高管助理'},
          {label:'研发部',value:'研发部',children:[{label:'AILab',value:'AILab'},{label:'品牌增长研发部（BG）',value:'品牌增长研发部（BG）'},{label:'品友推广研发（BD）',value:'品友推广研发（BD）'},{label:'效果营销研发（PMD）',value:'效果营销研发（PMD）'},{label:'云计算平台（Cloud）',value:'云计算平台（Cloud）'},]},
        ],
        //departmentOptions: ['顾问部', '财务部', '联合商业伙伴部（JBP）', '数据产品及商业化事业部（DPD）', '流量平台支持部', '政府事业部', '国际事业部', '市场战略与规划部（MSP）', '大客户销售顾问部（SCG）', '品友推广中小企业产品及商业化事业部（BD）', '效果营销产品及商业化事业部（PMD）', '品牌增长产品及商业化事业部（BGD）', '市场公关部', '人力资源部', '行政部', '高管助理', '研发部'],
        editFormVisible: false, // 编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
        },
        // 编辑界面数据
        editForm: {
          id:'',
          name: '',
          group: '',
          department: '',
          departments: [],
          avatar: '',
          state: true,
        },
        addFormVisible: false, // 新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
        },
        // 新增界面数据
        addForm: {
          id:'',
          name: '',
          group: '',
          department: '',
          departments: [],
          avatar: '',
          state: true,
        },
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      changeState(row){
        let para = { currentState: row.state, currentName: row.name };
        changePersonState(para).then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.getPerson();
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getPerson();
      },
      getPerson(){
        let para = {
          page: this.page,
          search: this.search,
        };
        this.listLoading = true;
        getPersonListPage (para).then((res) => {
          this.total = res.data.total;
          this.persons = res.data.persons;
          for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].state === true) {
              this.persons[i].activemsg='开启';
            } else {
              this.persons[i].activemsg='关闭';
            }
          }
          this.listLoading = false;
        });
      },
      selsChange(sels) {
        this.sels = sels;
      },
//      handleExport() {
//        exportPerson().then((res) => {
//          this.$message({
//            message: '导出成功',
//            type: 'success',
//          });
//        });
//      },
      // 显示新增界面
      handleAdd() {
        this.addFormVisible = true;
        this.addForm = {
          id:'',
          name: '',
          group: '',
          department: '',
          departments: [],
          avatar: '',
          state: true,
        };
      },
      // 显示编辑界面
      handleEdit: function (index, row) {
        console.log(row);
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        this.editForm.departments = this.editForm.department.split('/');
      },
      // 新增
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addForm.department = this.addForm.departments.join('/');
            // para设为对象，把add表单中的数据插入对象
            let para = Object.assign({}, this.addForm);
            para.state=true;
            addPerson(para).then((res) => {
              this.$message({
                message: '添加成功',
                type: 'success',
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getPerson();
            });
          }
        });
      },
      // 删除
      handleDel(index, row) {
        let para = { name: row.name };
        this.$confirm('确认删除选中记录吗？', '提示', {
          //type: 'warning'
        }).then(() => {
            removePerson(para).then((res) => {
              this.$message({
                message: '删除成功',
                type: 'success',
              });
              this.getPerson();
            });
        }).catch(() => {

        });
      },
      // 批量删除
      batchRemovePerson() {
        let names = this.sels.map(item => item.name).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
        }).then(() => {
            this.listLoading = true;
            // NProgress.start();
            let para = { names: names };
            batchRemovePerson(para).then((res) => {
              this.listLoading = false;
              // NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success',
              });
              this.getPerson();
            });
        }).catch(() => {

        });
      },
      // 编辑
      editSubmit() {
          this.$refs.editForm.validate((valid) => {
              if (valid) {
                this.editForm.department=this.editForm.departments.join('/');
                let para = Object.assign({}, this.editForm);
                editPerson(para).then((res) => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                  });
                  //this.$refs[' editForm '].resetFields();
                  this.editFormVisible = false;
                  this.getPerson();
                });
              }
          });
      },
    },
    mounted() {
      this.getPerson();
    },
  }
</script>


