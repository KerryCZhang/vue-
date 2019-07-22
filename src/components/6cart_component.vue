<template>
    <div id="cart" v-cloak>
      <div class="cart_content">
        <div class="cart_info" v-if="totalPrice!=0">
          <h2>购物车</h2>
          <div class="p_number">
            <div class="left">
              <p class="num">用餐人数:{{peopleInfo.p_num}}人</p>
              <p>备注：<span v-if="peopleInfo.p_mark">{{peopleInfo.p_mark}}</span><span v-if="!peopleInfo.p_mark">无</span></p>
            </div>
            <div class="right">
              <span></span>
              <p><router-link to="/editWelcome?id=123">修改</router-link></p>
            </div>
          </div>
          <div class="menu_info">
            <p class="menu_num">您的购物车有：{{count}}个菜</p>
            <p class="menu_price">合计：<span>￥{{totalPrice}}元</span></p>
          </div>
        </div>
          <div class="menu_detail">
            <ul>
              <li v-for="(item,key) in cartList">
                <div class="left">
                  <div class="img">
                    <img :src="api+item.img_url" alt="">
                  </div>
                  <div class="info">
                    <p>{{item.title}}</p>
                    <p>￥{{item.price}}</p>
                  </div>
                </div>
                <div class="right">
                  <div class="cart_num">
                    <span class="minus" @click="decCart(item,key)">-</span>
                    <input type="text" v-model="item.num">
                    <span class="add" @click="incCart(item,key)">+</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="hot_food">
              <h3>本店顾客最长点的菜</h3>
              <div class="food_slider">
                <ul>
                  <li>
                    <a href="#">
                      <div class="food_img"><img src="../assets/images/1.jpg" alt=""></div>
                      <div class="food_info">
                        <p>大蒜腊肉</p>
                        <p>￥26</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="food_img"><img src="../assets/images/1.jpg" alt=""></div>
                      <div class="food_info">
                        <p>大蒜腊肉</p>
                        <p>￥26</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="food_img"><img src="../assets/images/1.jpg" alt=""></div>
                      <div class="food_info">
                        <p>大蒜腊肉</p>
                        <p>￥26</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="food_img"><img src="../assets/images/1.jpg" alt=""></div>
                      <div class="food_info">
                        <p>大蒜腊肉</p>
                        <p>￥26</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="food_img"><img src="../assets/images/1.jpg" alt=""></div>
                      <div class="food_info">
                        <p>大蒜腊肉</p>
                        <p>￥26</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        <div class="footer">
          <nav-footer></nav-footer>
          <div class="footer_button to_order">
            <router-link to="/home">
              <span></span>
              <p>继续点单</p>
            </router-link>

          </div>
          <div class="footer_button cart" @click="addOrder">
<!--            <router-link to="/orderDetail">-->
              <span></span>
              <p>下单</p>
<!--            </router-link>-->
          </div>
        </div>
        <div class="cartlist_empty" v-if="totalPrice==0">
          您的购物车空空的，快去购物吧
          <router-link to="/home">去购物</router-link>
        </div>
      </div>
    </div>
</template>

<script>
  import NavFooter from './public/NavFooter'
  import config from './../model/config.js'
  import localstorage from "./../model/localsession.js"
    export default {
        // name: "6cart_component"
      data(){
        return{
          api:config.api,
          cartList:[],
          peopleInfo:[],
          totalPrice:0,
          count:0
        }
      },
      sockets:{
        //后台代码io只监听了addcart事件
        addcart: function(){  /*接受服务器广播过来的addcart*/
          //更新购物车的数据
          this.getCartList();
        }
      },
      methods:{
        getPeopleInfo(){
          this.axios.get(this.api+"api/peopleInfoList?uid="+localstorage.get("uid")).then(
            res=>{
             if(res.data.success){
               this.peopleInfo=res.data.result[0]
             }
            }
          ).catch(
            error=>{
              console.log(error)
            }
          )
        },
        getCartList(){
          this.axios.get(this.api+"api/cartlist?uid="+localstorage.get("uid")).then(
            (res)=>{
              let data=res.data.result;
               for(let i=0;i<data.length;i++){
                 if(data[i].price == "" || data[i].price == null ||data[i].price == 'undefined'){
                   data.splice(i,1)
                 }
               }
              this.cartList=data
              this.getTotalPrice()
            }
          ).catch(error=>{
            console.log(error)
          })
        },

        decCart(item,key){
          var uid=localstorage.get("uid");
          var product_id=item.product_id;
          this.axios.get(this.api+"api/decCart?uid="+uid+"&product_id="+product_id+"&num="+item.num).then(
            (res)=>{
              if(res.data.success){
                this.getCartList()
                this.getTotalPrice()
                this.$socket.emit('addcart', "update")
              }
            }
          ).catch(
            (error)=>{
              console.log(error)
            }
          )
          if(item.num==1){
            this.cartList.splice(key,1)
          }else{
            item.num=item.num-1
          }
        },
        incCart(item){
          var uid=localstorage.get("uid");
          var product_id=item.product_id;
          this.axios.get(this.api+"api/incCart?uid="+uid+"&product_id="+product_id+"&num="+ item.num).then(
            res=>{
              this.getTotalPrice()
              //增加购物车数量，给服务器广播
              this.$socket.emit('addcart', "update")
            }
          ).catch(
            error=>{
              console.log(error)
            }
          )
          item.num++;
        },
        getTotalPrice(){
          // console.log(this.cartList)
          let totalPrice=0;
          let totalnum=0
          for(let i=0;i<this.cartList.length;i++){
            if(this.cartList[i].price==null||this.cartList[i].price==undefined){
              this.cartList[i].price=0
            }
            totalnum+=this.cartList[i].num
            totalPrice+=this.cartList[i].price*this.cartList[i].num
          }
          this.totalPrice=totalPrice
          this.count=totalnum
        },
        //下单
        addOrder(){
          const url=this.api+"api/addOrder"
          this.axios.post(url,{
            uid:localstorage.get("uid"),
            p_num:this.count,
            p_mark:this.peopleInfo.p_mark,
            order:JSON.stringify(this.cartList),
            total_price:this.totalPrice,
            total_num:this.cartList.length,
          }).then(
            (res)=>{
             if(res.data.success){
               this.$router.push({ path: '/orderDetail' })
             }
            }
          ).catch(
            err=>{
              console.log(err);
            }
          )
        }
      },
      components:{
        NavFooter
      },
      mounted(){
        this.getCartList();
        this.getPeopleInfo();
      }
    }
</script>

<style scoped lang="scss">
  .cart_content{
    padding:1rem 1.5rem;
    .cart_info{
      padding:1rem;
      background: #fff;
      border-radius: 2rem;
      h2{
        text-align: center;
        line-height: 4rem;
        border-bottom: 1px solid #ddd;
      }
      .p_number{
        border-bottom:1px solid #ddd;
        padding:1rem 0;
        .left{
          width:calc(100% - 5.5rem);
          display: inline-block;
          p{
            line-height: 2rem;
          }
          .num{
            color:#f00;
          }
        }
        .right{
          float:right;
          padding-right:2rem;
          span{
            display: inline-block;
            width:25px;
            height:25px;
            background: url("../assets/images/edit.png") no-repeat center;
            background-size: cover;
          }
          p{
            text-align: center;
            margin-top:-4px;
          }
        }
      }
      .menu_info{
        border-bottom:1px solid #ddd;
        padding:1rem 0;
        .menu_num{
          color:#00f;
        }
        .menu_price{
          span{
            color:#f00;
            font-size: 2rem;
          }
        }
      }
    }
    .cartlist_empty{
      text-align: center;
      a{
        color:#0000ff;
      }
    }
    .menu_detail{
      margin:2rem 0;
      padding:1rem;
      border-radius: 1rem;
      background: #fff;
      h3{
        margin:1rem 0;
      }
      ul{
        li{
          /*height:6rem;*/
          padding:.5rem 0;
          /*border-bottom:1px solid #ddd;*/
          .left{
            display: inline-block;
            .img{
              float: left;
              width:6rem;
              height:6rem;
              img{
                display: block;
                width:100%;
                height:100%;
              }
            }
            .info{
              display: inline-block;
              margin-left:.5rem;
              vertical-align: top;
            }
          }
          .right{
            float: right;
            padding-right:2rem;
            .cart_num{
              overflow: hidden;
              margin:1.5rem 0;
              span{
                float: left;
                width:3rem;
                height:3rem;
                text-align: center;
                line-height: 3rem;
                border:1px solid #ddd;
              }
              input{
                float: left;
                width:3rem;
                height:3rem;
                text-align: center;
                border:1px solid #ddd;
              }
            }
          }
        }
      }
    }
    .hot_food{
      padding: 1rem;
      border-radius: 1rem;
      background: #fff;
      h3{
        margin:.5rem 0;
      }
      .food_slider{
        width:100%;
        overflow-x: scroll;
        ul{
          overflow: auto;
          width:61rem;
          li{
            float: left;
            width:11rem;
            a{
              display: block;
              .food_img{
                width:100%;
                height:100%;
                border-radius: 1rem;
                img{
                  width:100%;
                  height:100%;
                }
              }
            }

          }
          li+li{
            margin-left:1.5rem;
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
        span{
          background:url("../assets/images/navigation.png") no-repeat;
          background-size: cover;
        }
      }
      &.to_order{

        background:rgba(0,0,0,.8);
        left:50%;
        margin-left:-3.5rem;
        a{
          display: block;
          color:#fff;
          span{
            background:url("../assets/images/book.png") no-repeat;
            background-size: cover;
          }
        }

      }
      &.cart{
        background:rgba(255,42,43,.8);
        right:1rem;
        span{
          background:url("../assets/images/cart.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }
</style>
