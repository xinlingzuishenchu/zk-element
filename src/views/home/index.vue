<template>
	<div class="home">
		<el-container>
			<el-header class="head">
					<span class="title">预算管理一体化</span>
					<ul>
						<li>欢迎您 : {{userName}}</li>
						<li>
			                <el-dropdown 
			                	ref="tenantWarp"
			                	trigger="click" 
			                	@command="yearClick">
								<span class="el-dropdown-link">当前管理租户 : {{regionName}}
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-tree 
										ref="tenantTree"
										node-key="curid"
			                        	:data="regionList" 
			                        	:props="regionProps"
			                        	:highlight-current="true"
			                        	@node-click="regionNodeClick"

			                        	></el-tree>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
						<li>
					        <el-dropdown trigger="click" @command="yearClick">
								<span class="el-dropdown-link">当前年度 : {{currentYear}}
									<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item 
										v-for="item in yearList"
					            		:key="item.year"
					            		:command="item.year"
									>{{item.year}}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
						<li>
							<el-avatar icon="el-icon-user-solid"></el-avatar>
						</li>
					</ul>
			</el-header>
			<el-main>
				<el-tabs v-model="activeName" @tab-click="tabClick">
			    <el-tab-pane 
			    	v-for="(item,index) in menuList" 
			    	:key="item.index" 
			    	:label="item.name" 
			    	:name="index+''">
			    	<el-row :gutter="10">
						<el-col 
						  	:span="6" 
						  	v-for="(list,todo) in item.children" 
						  	:key="todo"
						  	style="margin-bottom:10px;">
						  		<router-link :to="'/moudel/'+todo">
						  			<el-card class="moudelLink">
								      	<div style="padding: 14px;">
								        	<span>{{ list.name }}</span>
								      	</div>
								    </el-card>
						  		</router-link>
						</el-col>
					</el-row>
			    </el-tab-pane>
			</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	data(){
		return {
			activeName: "0",
			userName:"",//登录用户
			menuList: [],//豆腐块列表
			users:{},//用户信息
			currentYear:"",//登录默认年度
			regionCurid:"",//选中的租户curid
			regionProps:{
				children:"children",
				label:"name"
			}
			
		}
	},
	created(){
        //获取模块列表
        let that = this;
        // that.menuList = res.data.data;  
        //获取用户信息
        /*this.$api.getUser().then(res=> {
        	if (res.data.status_code == "0000") {
        		that.users = res.data.data;  
        		that.userName = res.data.data.userCode;
        		that.tenantCurid = res.data.data.tenantId;
        		that.currentYear = res.data.data.busiYear;
        		that.$store.commit("users",res.data.data);
		        //设置当前租户选中状态
		        that.$refs.tenantTree.setCurrentKey(res.data.data.tenantId);
        	}
        })*/
        //从vuex获取区划、年度列表
        /*this.regionList = store.getters.regionList;
        this.yearList = store.getters.yearList;
        console.log(this.regionList)
        console.log(this.yearList)*/
        
    },
	methods: {

		tabClick(tab, event) {
			console.log(tab, event);
		},
		yearClick(data){
			this.currentYear = data;
		},
		regionNodeClick(node){
			//设置当前选中租户
			if(!node.children){
				this.tenantCurid = node.curid;
				this.$refs.tenantWarp.hide();
			}
		}
    },
    computed:{
    	...mapGetters([
	      'regionList',
	      'yearList',
	    ]),
    	regionName(){
    		return this.tenantCurid ? this.$refs.tenantTree.getNode(this.tenantCurid).data.name : "";
    	}
    }
}
</script>
<style scoped>
	.head{
		display:flex;
		align-items:center;
		justify-content:space-between;
	}
	.head ul{
		display:flex;
		align-items:center;
		justify-content:space-between;
	}
	.head ul li{
		margin-left:10px;
	}
	.title{
		font-size:18px;
		font-weight:500;
		color:#000;
	}
	.moudelLink{
		cursor:pointer;
	}
</style>