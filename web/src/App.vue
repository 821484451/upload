<template>
  <div id="app">
    <div v-if="$route.meta.showActive"> 
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    v-if="$route.meta.showActive || true"
    @select="handleSelect"
    background-color="#409eff"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-menu-item index="1">
        首页
      </el-menu-item>
      <el-menu-item index="2">
        home
      </el-menu-item>
      <el-menu-item index="3">
        markdown
      </el-menu-item>
      <el-menu-item index="4">
        lover
      </el-menu-item>
      <el-button type="danger" @click="logOut" class="logoutText">  退出登录</el-button>
    </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    
    
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'app',
  data(){
    return {
      activeIndex: "1",
      loading: null
    }
  },
  computed: {
    ...mapGetters([
      'loadingFlag',
      'hideFlag'
    ])
  },
  watch: {
    loadingFlag(curVal) {
      if (curVal) {
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }else{
        this.loading.close();
      }
    }
  },
  components: {
    
  },
  methods: {
    handleSelect(key){
      switch(key * 1) {
        case 1:
          this.$router.push({
            path: '/'
          });
          break;
        case 2:
          this.$router.push({
            path: '/home'
          });
          break;
        case 3:
          this.$router.push({
            path: '/markDown'
          });
          break;
        case 4:
          this.$router.push({
            path: '/lover'
          });
          break;
        default:
      }
    },
    logOut(){
      this.$axios.get('/api/logout').then(res => {
          if (res.data.status === 200) {
            this.$message({
              message: '退出登陆成功！',
              type: 'success'
            });
            this.$router.push('/login');
          }
      }).catch(err => {
          alert(err);
      })
    }
  },
  mounted(){
    switch(this.$router.history.current.path) {
      case '/':
        this.activeIndex = '1';
        break;
      case '/home':
        this.activeIndex = '2';
        break;
      case '/mark':
        this.activeIndex = '3';
        break;
      case '/lover':
        this.activeIndex = '4';
        break;
      default:
    }
  }
}
</script>

<style lang="less" scoped>
html, body{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .content{
    flex: 1;
    overflow-x: hidden;
  }
}
.el-menu-demo {
  position: relative;
}
.logoutText{
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
