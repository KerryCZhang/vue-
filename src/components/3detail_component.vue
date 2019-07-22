<template>
    <div id="detail">
      <div class="p_content">
        <div class="p_content_img">
          <img :src="api+product.img_url" :alt="product.title">
        </div>
        <div class="p_content_txt">
          <p class="content_txt_title">{{product.title}}</p>
          <p class="content_txt_price">{{product.price}}/份</p>
        </div>
      </div>
      <div class="p_detail">
        <h3>商品详情</h3>
        <div class="p_detail_content">
          <img :src="api+product.img_url" :alt="product.title">
          <div v-html="product.content"></div>
        </div>
      </div>
      <div class="p_footer">
        <div class="cart_num fl">
          <span>数量:</span>
          <div class="cart_num_btn">
            <span class="subtract" @click="minusNum">-</span>
            <input type="text" v-model="num">
            <span class="plus" @click="plusNum">+</span>
          </div>
        </div>
        <div class="to_cart">
          <span @click="addCart">加入购物车</span>
        </div>
      </div>
      <router-link class="back" to="/home"></router-link>
    </div>
</template>

<script>
  import config from './../model/config.js'
  import localstorage from "./../model/localsession.js"
    export default {
        // name: "3detail_component"
      data(){
        return{
          api:config.api,
          product:[],
          num:1
        }
      },
      methods:{
        getproductDetail(){
          this.axios.get(this.api+'api/productcontent?id='+this.$route.query.id).then(
            (response)=>{
              this.product=response.data.result[0];
            }
          ).catch(
            (error)=>{
              console.log(error)
            }
          )
        },
        addCart(){
          this.axios.post(config.api+"api/addcart",{
            uid:localstorage.get("uid"),
            title:this.product.title,
            product_id:this.product._id,
            img_url:this.product.img_url,
            price:this.product.price,
            num:this.num,
          }).then(res=>{
            if(res.data.success){
              this.$router.push({path:'/home'})
            }
          }).catch(error=>{
            console.log(error)
          })
        },
        minusNum(){
          this.num>1? this.num--:this.num=1
        },
        plusNum(){
          ++this.num
        }
      },
      mounted(){
        this.getproductDetail()
      }
    }
</script>

<style scoped lang="scss">
  .p_content{
    background:#fff;
    .p_content_img{
      width:100%;
      height:100%;
      img{
        width:100%;
        height:100%;
      }
    }
    .p_content_txt{
      padding:.5rem .8rem;
      .content_txt_title{
        font-size:1.6rem;
        color:#333;
        font-weight: bold;
      }
      .content_txt_price{
        font-size:1.2rem;
        color:red;
      }
    }
  }
  .p_detail{
    margin-top:2rem;
    background:#fff;
    h3{
      padding:.5rem;
    }
    .p_detail_content{
      padding:1rem;
      margin-bottom: 4.4rem;
      img{
        width:100%;
        height:100%;
      }
    }
  }
  .p_footer{
    position:fixed;
    margin-top:2rem;
    bottom:.0rem;
    //left:.5rem;
    background: #fff;
    width:100%;
    height:4.4rem;
    line-height: 4.4rem;
    .cart_num{
      position: relative;
      left:1rem;
      span{
        display: inline-block;
        vertical-align: middle;
      }
      .cart_num_btn{
        display: inline-block;
        vertical-align: middle;
        font-size:2rem;
        span{
          float: left;
          width:3rem;
          height:3rem;
          border:1px solid #333333;
          text-align: center;
          line-height: 3rem;
          color:red;

          &.plus{
            float: right;
          }
        }
        input{
          float: left;
          width:3rem;
          height:3rem;
          text-align: center;
          border:1px solid #333333;
          border-right:none;
          border-left:none;
        }
      }
    }
    .to_cart{
      position: absolute;
      right:1rem;
      top:.7rem;
      span{
        display: block;
        padding:0 1rem;
        background: red;
        color:#fff;
        border:none;
        line-height: 3rem;
        border-radius: .5rem;

      }
    }
  }
  .back{
    position:fixed;
    left:1rem;
    top:1rem;
    width:5rem;
    height:5rem;
    border-radius: 50%;
    background:rgba(0,0,0,.4);
    &:after{
      content: "";
      position:absolute;
      left:50%;
      top:50%;
      margin-top:-1rem;
      margin-left:-0.5rem;
      display: inline-block;
      width:2rem;
      height:2rem;
      transform: rotate(45deg);
      border:2px solid #fff;
      border-right:none;
      border-top:none;
    }
  }
</style>
