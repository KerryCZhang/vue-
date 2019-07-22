<template>
  <div class="containter" id="orderDetail">
    <div class="order_header">
      <div>
        <h2>118号桌待门店接单<p>请及时联系服务员确认已点菜品信息</p></h2>
      </div>
      <p>已点菜品 <span>{{order.total_num}}</span> 份，合计：<span>{{order.total_price}}元</span></p>
    </div>
    <div class="order_content">
      <h3>菜品详情</h3>
      <div class="order_list">
        <p v-for="item in order.items">
          <span class="food_tit">{{item.title}}</span>
          <span class="food_num">{{item.num}}</span>
          <span  class="food_price">{{item.price}}元</span>
        </p>
      </div>
    </div>
    <div class="footer">
      <div class="footer_button order_goon">
        <router-link to="home">
          <span></span>
          <p>继续点单</p>
        </router-link>
      </div>
      <div class="footer_button to_pay" @click="toPay">
          <span></span>
          <p>去结账</p>
      </div>
    </div>
  </div>
</template>

<script>
  import config from "./../model/config.js"
  import localstorage from "./../model/localsession.js"
  export default {
      data(){
        return{
          order:[],
          api:config.api,
        }
      },
      methods:{
        getOrderDetail(){
          const url=config.api+"api/getOrder?uid="+localstorage.get("uid");
          this.axios.get(url).then(
            res=>{
             if(res.data.success){
               this.order=res.data.result[0]
             }
            }
          ).catch(
            (err)=>{
              console.log(err);}
          )
        },
        toPay(){
          const url=config.api+"api/doPay";
          var that=this;
          this.axios.post(url,{
            uid:localstorage.get("uid"),
            order_id:that.order_id,
            total_price:that.order.total_price,
          }).then((res)=>{
            var data=res.data.result;
            if(data.message=="success"){
              location.href=data.data
            }
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      mounted() {
        this.getOrderDetail();
      }

    }
</script>

<style scoped lang="scss">
  .containter{
    margin:1rem 2rem;
    .order_header{
      padding:2rem;
      background:#fff;
      border-radius: 2rem;
      >div{
        &:before{
          content:"";
          display: inline-block;
          width:5rem;
          height:5rem;
          background:url("../assets/images/timer.png") no-repeat;
          background-size: 100%;
        }
        h2{
          display: inline-block;
          vertical-align: top;
          p{
            font-size: 1.2rem;
            color:#999;
          }
        }
      }
      >p{
        line-height: 1.5rem;
        font-weight:bold;
        span{
          font-size: 2rem;
          color:red;
        }
      }
    }
    .order_content{

      margin-top:2rem;
      border-radius: 5px 5px 1rem 1rem;
      background:#fff;
      h3{
        padding:1rem;
        border-bottom:1px solid #ddd;
      }
      .order_list{
        padding:1rem;
        p{
          line-height:2.5rem;
          span{
            display: inline-block;
            &.food_tit{
              width:67%;
            }
            &.food_num,&.food_price{
              width:15%;
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
        span{
          background:url("../assets/images/navigation.png") no-repeat;
          background-size: cover;
        }
      }
      &.to_order{
        background:rgba(0,0,0,.8);
        left:50%;
        margin-left:-3.5rem;
        span{
          background:url("../assets/images/book.png") no-repeat;
          background-size: cover;
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
      &.order_goon{
        background:rgba(0,0,0,.8);
        right:1rem;
        a{
          display: block;
          color:#fff;
          span{
            background:url("../assets/images/book.png") no-repeat;
            background-size: cover;
          }
        }
      }
      &.to_pay{
        background:rgba(255,42,43,.8);
        /*a{*/
        /*  display: block;*/
        /*  color:#fff;*/
          span{
            background: black;
            background:url("../assets/images/wallet.png") no-repeat;
            background-size: cover;
          /*}*/
        }
      }
    }
  }
</style>
