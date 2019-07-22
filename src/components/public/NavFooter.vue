<template>
<!--    <div >-->
      <div class="footer_button nav">
        <div class="navBtn" @click="navFlag=true">
          <span></span>
          <p>导航</p>
        </div>
        <div class="navBg" v-if="navFlag">
          <ul>
            <li>
              <router-link @click="navFlag=false">
                取消
              </router-link>
            </li>
            <li>
              <router-link to="/home">
                菜单
              </router-link>
            </li>
            <li>
              <router-link to="/cart">
                购物车
              </router-link>
            </li>
            <li>
              <router-link to="/orderDetail">
                我的订单
              </router-link>
            </li>
            <li>
              <router-link to="/orderDetail">
                结账
              </router-link>
            </li>
          </ul>
        </div>
      </div>
<!--    </div>-->
</template>

<script>
    export default {
        // name: "NavFooter"
      data(){
        return{
          navFlag:false
        }

      }
    }
</script>

<style scoped lang="scss">
  .navBtn{
    span{
      display: inline-block;
      width:2.5rem;
      height:2.5rem;
      margin-top:1.5rem;
      background: red;
      background:url("../../assets/images/navigation.png") no-repeat;
      background-size: cover;
    }
  }
  .navBg{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background: rgba(0,0,0,.4);
    ul{
      position: relative;
      height: 100%;
      bottom: 0;
      li{
        position: absolute;
        width:7rem;
        height:7rem;
        border-radius: 50%;
        background: #000;
        a{
          display: block;
          color:#fff;
          text-align: center;
          line-height: 7rem;
        }
        &:nth-child(1){
          bottom: 10px;
          left:10px;
        }
        &:nth-child(2){
          bottom: 35%;
          left:10px;
        }
        &:nth-child(3){
          bottom: 26%;
          left:22%;
        }
        &:nth-child(4){
          bottom: 13%;
          left:35%;
        }
        &:nth-child(5){
          bottom: 10px;
          left:45%;
        }
      }
    }
  }
</style>
