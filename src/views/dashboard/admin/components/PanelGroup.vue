<template>
  <el-container class="homeList">
    <el-main>
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item,index) in menuList"
          :key="item.index"
          :label="item.name"
          :name="index+''"
          class="tabList"
        >
          <el-row :gutter="10" class="panel-group">
            <el-col
              v-for="(list,todo) in item.children"
              :key="todo"
              :xs="12"
              :sm="12"
              :lg="6"
              class="card-panel-col"
            >
              <div class="card-panel" @click="getLeftMent(list.name)">
                <div class="card-panel-icon-wrapper icon-people">
                  <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">
                    {{ list.name }}
                  </div>
                  <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import CountTo from 'vue-count-to'
import vueEvent from '@/store/vueEvent'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      activeName: '0',
      menuList: []// 豆腐块列表
    }
  },
  created() {
    this.homeMenu()
  },
  methods: {
    homeMenu() {
      this.$store.dispatch('user/homeMenu')
        .then((res) => {
          this.menuList = res
        })
        .catch(() => {
          this.menuList = []
        })
    },
    tabClick(tab, event) {
      console.log(tab, event)
    },
    getLeftMent(type) {
      // vueEvent.$emit("send",type);
      const that = this
      // if(type == "0"){
      //     that.leftmenus = require("@/router/modules/tenant");
      // }else if(type == "1"){
      //     that.leftmenus = require("@/router/modules/user");
      // }else if(type == "6"){
      //     let leftmenu = require("@/router/modules/workflow");
      //     sessionStorage.setItem('workflow', JSON.stringify(leftmenu.default));
      // }

      that.$store.dispatch('permission/activeMenu', type).then((res) => {
        console.log(res)
        this.$router.push(res)
      }).catch(() => {

      })
    }
  }
}
</script>
<style>
  .homeList .el-tabs__header{
    padding-top: 6px;
    padding-left:10px;
    background:#fff;
  }
</style>
<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 10px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
