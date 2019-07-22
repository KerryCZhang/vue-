<template>
  <div class="containter" id="orderPay">
    <div class="orderd_top">
      <h2>已下单的菜</h2>
      <p>
        <span>桌号：001</span>
        <span>人数：2</span>
        <span>下单时间：6:25</span>
      </p>
      <div>
        <p>应付金额: <span>￥60</span></p>
        <a href="#">立即付款</a>
      </div>
    </div>
    <div class="order_content">
      <h3>菜品详情</h3>
      <div class="order_list">
        <p>
          <span class="food_tit">烧茄子</span>
          <span class="food_num">1份</span>
          <span  class="food_price">12元</span>
        </p>
        <p>
          <span class="food_tit">烧茄子</span>
          <span class="food_num">1份</span>
          <span  class="food_price">12元</span>
        </p>
        <p>
          <span class="food_tit">烧茄子</span>
          <span class="food_num">1份</span>
          <span  class="food_price">12元</span>
        </p>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="footer_button nav">
      <span></span>
      <p>导航</p>
    </div>
    <div class="footer_button order_goon">
      <span></span>
      <p>继续点单</p>
    </div>
  </div>
</template>

<script>
    export default {
        // name: "6cart_component"
    }
</script>

<style scoped lang="scss">
  .containter{
    margin:1rem;
    .orderd_top{
      padding:1rem;
      background:#fff;
      border-radius: 2rem;
      h2{text-align: center}
      >p{
        line-height: 4rem;
        border-bottom:1px solid #ddd;
        span{
          display: inline-block;
          width:calc(33.3333333% - 0.667rem)
        }
      }
      >div{
        padding:1rem 0;
        p{
          display: inline-block;
          span{
            font-size: 1.6rem;
            color:red;
          }
        }
        a{
          float:right;
          width:10rem;
          height:3rem;
          line-height: 3rem;
          background:red;
          color:#fff;
          text-align: center;
          border-radius: .5rem;
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

  .footer {
    position: relative;
    bottom: 1rem;
    height: 7rem;

    .footer_button {
      position: fixed;
      bottom: 1rem;
      width: 7rem;
      height: 7rem;
      text-align: center;
      color: #fff;
      border-radius: 50%;

      span {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        margin-top: 1.5rem;
      }

      &.nav {
        background: rgba(0, 0, 0, .8);
        left: 1rem;

        span {
          background: url("../assets/images/navigation.png") no-repeat;
          background-size: cover;
        }
      }

      &.to_order {
        background: rgba(0, 0, 0, .8);
        left: 50%;
        margin-left: -3.5rem;

        span {
          background: url("../assets/images/book.png") no-repeat;
          background-size: cover;
        }
      }

      &.cart {
        background: rgba(255, 42, 43, .8);
        right: 1rem;

        span {
          background: url("../assets/images/cart.png") no-repeat;
          background-size: cover;
        }
      }

      &.order_goon {
        background: rgba(0, 0, 0, .8);
        right: 1rem;

        span {
          background: url("../assets/images/book.png") no-repeat;
          background-size: cover;
        }
      }
    }
  }

</style>
