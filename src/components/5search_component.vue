<template>
    <div id="seacrh">
      <div class="header">
        <input type="text" placeholder="请输入菜名">
      </div>
      <div class="content">
        <ul>
          <li>
            <a href="#">
              <div class="left_img">
                <img src="../assets/images/1.jpg" alt="">
              </div>
              <div class="right_info">
                <h3>大蒜腊肉</h3>
                <p class="price">￥26</p>
                <p class="saled">已售:351份</p>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="left_img">
                <img src="../assets/images/1.jpg" alt="">
              </div>
              <div class="right_info">
                <h3>大蒜腊肉</h3>
                <p class="price">￥26</p>
                <p class="saled">已售:351份</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="footer_button nav">
          <span></span>
          <p>导航</p>
        </div>
        <div class="footer_button to_order">
          <span></span>
          <p>继续点单</p>
        </div>
        <div class="footer_button cart">
          <span></span>
          <p>购物车</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        // name: "5search_component"
    }
</script>

<style scoped lang="scss">
  .header{
    height:6rem;
    line-height: 6rem;
    text-align: center;
    background:#f7f7f7;
    input{
      width:85%;
      height:4rem;
      line-height: 4rem;
      padding-left:1rem;
      border:none;
      border-radius: 1rem;
    }
  }
  .content{
    background: #ffffff;
    ul{
      li{
        height:8rem;
        border-bottom:1px solid #ddd;
        padding:1rem;
        a{
          overflow: hidden;
          display: block;
          height:100%;
          .left_img{
            float: left;
            width:8rem;
            height:8rem;
            img{
              width:100%;
              height:100%;
            }
          }
          .right_info{
            overflow: hidden;
            margin-left:8.5rem;
            .price{
              color:#f00;
            }
            .saled{
              color:#aaa;
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
    }
  }
</style>
