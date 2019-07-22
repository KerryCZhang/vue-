<template>
    <div id="home">
      <div class="nav">
        <ul class="clearfix">
          <li>
            <router-link to="hotSale">
<!--              <a href="#">-->
                <p class="nav_icon hot"></p>
                <p class="nav_tet">热销榜</p>
<!--              </a>-->
            </router-link>
          </li>
          <li>
            <router-link to="orderDetail">
              <a href="#">
                <p class="nav_icon ordered"></p>
                <p class="nav_tet">点过的菜</p>
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="search">
              <a href="#">
                <p class="nav_icon search_love"></p>
                <p class="nav_tet">搜你喜欢</p>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="list">
          <template v-for="item in menuList">
            <h3 class="list_cate">{{item.title}}</h3>
            <ul class="clearfix">
              <li v-for="menu in item.list">
                <router-link :to="'/detail?id='+menu._id">
                  <img :src="api+menu.img_url" alt="">
                  <div class="list_desc">
                    <p class="name">{{menu.title}}</p>
                    <p>￥{{menu.price}}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </template>
        </div>
      </div>
      <div class="footer">
        <nav-footer></nav-footer>
        <div class="footer_button cart">
          <router-link to="cart">
            <span></span>
            <p>购物车</p>
          </router-link>
          <span>{{count}}</span>
        </div>
      </div>
      <div class="aside" id="aside_left">
        <ul class="aside_nav">
          <li v-for="(item,index) in menuList" @click="changeList(index)">
            {{item.title}}
          </li>
        </ul>
        <div class="aside_button" id="aside_button" @click="asideShow">
          <a >
            <span></span>
            <p>菜单</p>
          </a>
        </div>
      </div>
      <div class="bg" ref="bg" v-show="!asideflay"></div>
    </div>
</template>

<script>
  import config from './../model/config.js'
  import localstorage from "./../model/localsession.js"
  import navFooter from './public/NavFooter';
    export default {
      data(){
        return{
          api:config.api,
          menuList:[],
          asideflay:true,
          count:0
        }
      },
      sockets:{
        //后台代码io只监听了addcart事件
        addcart: function(){  /*接受服务器广播过来的addcart*/
          //更新购物车的数据
          console.log("11");
          // this.getCartCount();
        }
      },
      methods:{
        //侧边栏按钮
        asideShow(){
          this.asideflay ? aside_left.style.transform="translate(0,0)" :
                           aside_left.style.transform="translate(-100%,0)"

          this.asideflay=!this.asideflay
        },
        //菜单列表
        getMenuList(){
          this.axios.get(this.api+'api/productlist').then(
            (response)=>{
               this.menuList=response.data.result;
            }
          ).catch(
            (error)=>{
              console.log(error)
            }
          )
        },
        //侧边栏锚点
        changeList(index){
          var listCatesDom=document.querySelectorAll(".list_cate");
          document.documentElement.scrollTop=listCatesDom[index].offsetTop;
          aside_left.style.transform="translate(-100%,0)"
          this.asideflay=true;
        },
        //获取购物车数量
        getCartCount(){

          this.axios.get(this.api+'api/cartCount?uid='+localstorage.get("uid")).then(
            res=>{
              this.count=res.data.result
              this.$socket.emit("addcart","addcart")
            }).catch(
            error=>{
              console.log(error)
            }
          )
        }
      },

      mounted(){
        this.getMenuList();
        this.getCartCount()
      },
      components:{
        'nav-footer':navFooter
      }
    }
</script>
<style scoped lang="scss">
  .nav{
    ul{
      margin:2rem 1rem;
      border-radius: 8px;
      overflow: hidden;
      li{
        float:left;
        width:33.33%;
        height:8rem;
        box-sizing: border-box;
        padding:.5rem;
        text-align: center;
        background: #fff;
        a{
          display: block;
          margin: 1rem 0;
          border-right:1px solid #ccc;
          .nav_icon{
            width:3rem;
            height:3rem;
            margin:0 auto;
            background-size: cover;
            &.hot{
              background:url('../assets/images/rexiao.png') no-repeat center;
              background-size: cover;
            }
            &.ordered{
              background:url('../assets/images/caidan.png') no-repeat center;
              background-size: cover;
            }
            &.search_love{
              background:url('../assets/images/sousuo.png') no-repeat center;
              background-size: cover;
            }
          }

        }
        &:last-child a{
          border-right:none;
        }
      }
    }
  }
  .content{
    .list{
      h3{
        text-align: center;
      }
      ul{
        li{
          float: left;
          width:33.33%;
          box-sizing: border-box;


          a{
            display: block;
            //width:100%;
            //height:10rem;
            margin:.8rem;
            background:#fff;
            border-radius: 4px;
            overflow: hidden;
            img{
              width:100%;
              height:10rem;
            }
            .list_desc{
              padding:.5rem;
              .name{font-weight: bold}
            }
          }
        }
      }
    }
  }
  .footer{
    position: relative;
    bottom:1rem;
    height:7rem;

    .footer_button{
      position: fixed;
      bottom:1rem;
      width:7rem;
      height:7rem;
      text-align: center;
      color:#fff;
      border-radius: 50%;
      span{
        display: inline-block;
        width:2.5rem;
        height:2.5rem;
        margin-top:1.5rem;
      }
      &.nav{
        background:rgba(0,0,0,.8);
        left:1rem;
        .navBtn{
          display: block;
          color:#fff;
          span{
            display: inline-block;
            width:2.5rem;
            height:2.5rem;
            background: red;
            background:url("../assets/images/navigation.png") no-repeat;
            background-size: cover;
          }
        }
      }
      &.cart{
        background:rgba(255,42,43,.8);
        right:1rem;
        height:7rem;
        a{
          display: block;
          color:#fff;
          height:7rem;
          span{
            background:url("../assets/images/cart.png") no-repeat;
            background-size: cover;
          }
        }
        >span{
          position: absolute;
          right:.5rem;
          top:-1.5rem;
          width:2rem;
          height:2rem;
          border-radius: 50%;
          text-align: center;
          line-height: 2rem;
          background:red;
          color:#fff;
        }
      }
    }
  }
  .aside{
    transition:all .3s;
    transform: translate(-100%,0);
    position: fixed;
    z-index:2;
    left:0;
    top:0;
    height:100%;
    width:10rem;

    .aside_nav{
      z-index: 4;
      position: relative;
      height:100%;
      padding-top:1rem;
      background:#eee;
      li{
        line-height: 3.5rem;
        text-align: center;
        /*a{*/
        /* */
        /*  text-align: center;*/
        /*}*/

      }
    }
    .aside_button{
      z-index: 3;
      position: absolute;
      right:-6rem;
      top:50%;
      margin-top:-3rem;
      width:8rem;
      height:6rem;
      background:rgba(0,0,0,.6);
      border-radius: 3rem;
      cursor:pointer;
      a{
        display: block;
        width:100%;
        height:100%;
        color:#fff;
        span{
          display: inline-block;
          width:3rem;
          height:3rem;
          margin-top:.7rem;
          margin-left:3rem;
          background: url("../assets/images/nav.png") no-repeat center;
          background-size: cover;
        }
        p{
          display: inline-block;
          margin-left: 3rem;
        }
      }

    }
  }
  .bg{
    position: fixed;
    left:0;
    top:0;
    z-index:1;
    width:100%;
    height:100%;
    background:rgba(130,128,128,.6);
    /*display: none;*/
  }
</style>
