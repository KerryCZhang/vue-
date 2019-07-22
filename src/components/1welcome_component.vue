<template>
  <div class="start_content">
    <div v-if="loading" class="loading">
      <img src="./../assets/loading.gif" alt="">
    </div>
    <div id="start" v-if="!loading">
      <p class="start_header"><span></span><i>用餐人数</i></p>
      <p class="start_tip">请选择正确的用餐人数，小二马上给你送餐</p>
      <ul class="person_num clearfix">
        <li v-for="(i,key) in person" @click="changePerson(i)" ><span :class="{active:key+1==personNum}">{{i}}人</span></li>
      </ul>
      <input type="text" v-model.trim="tip" class="tips" placeholder="请输入您的口味要求,忌口等（可以不填写）" @keyup.enter="addTips">
      <ul class="tipList" >
        <li v-for="item in tipsList"><span>{{item}}</span></li>
      </ul>
      <div class="start_button" @click="startOrder" v-if="!loading">
        <p>开始点单</p>
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
          person:12,
          tipsList:[],
          tip:"",
          personNum:1,
          api:config.api,
          uid:localstorage.get("uid"),
          loading:true
        }
       },
      methods:{
        addTips(){
          this.tipsList.unshift(this.tip)
          this.tip=""
        },
        changePerson(num){
          this.personNum=num
        },
        startOrder(){
          this.axios.post(this.api+"api/addPeopleInfo",{
            uid:this.uid,
            p_num:this.personNum,
            p_mark:this.tipsList.toString()
          }).then(
            res=>{
              if(res.data.success){
                this.$router.push({"path":"/home"})
              }
            }
          ).catch(
            error=>{
              console.log(error)
            }
          )
        },
        getPersoninfo(){
          this.axios.get(this.api+"api/peopleInfoList?uid="+this.uid).then(
            (res)=>{
              this.loading=false
              var data=res.data.result;
              if(data.length>0){
                this.$router.push({path:"/home"})
              }
            }
          ).catch((error)=>{
            alert("请在url中添加桌子号uid")
          })
        }
      },
      created() {
        this.getPersoninfo()
      }
    }
</script>

<style scoped lang="scss">
  .start_content{
    .loading{
      position: absolute;
      left:calc(50% - 16px );
      top:calc(50% - 16px)
    }
  }
  #start{
    .start_header{
      width:10rem;
      height:3.2rem;
      line-height: 3.2rem;
      text-align: center;
      margin:5rem auto 0 ;
      font-size: 1.2rem;
      color:#ffffff;
      background:#000;
      border-radius: 8px;
      span{
        display: inline-block;
        width:2rem;
        height:2rem;
        margin-right: .5rem;
        background:url("../assets/images/canju.png") center no-repeat;
        background-size: cover;
        vertical-align: middle;
      }
      i{vertical-align: middle;}
    }
    .start_tip{
      text-align: center;
      margin:2rem auto;
      font-size: 1.4rem;
      color:red;
    }
    ul.person_num{
      padding:1.5rem;
      li{
        float: left;
        box-sizing: border-box;
        padding:1rem;
        width:25%;
        span{
          display: block;
          height:3.2rem;
          text-align: center;
          line-height: 3.2rem;
          border:1px solid #555555;
          background: #fff;
          border-radius: 3px;
          padding:.5rem;
          &.active{
            background:red;
            color:#fff;
            border:1px solid #fff;
          }
        }
      }
    }
    .tips{
      width:90%;
      display: block;
      height:4rem;
      line-height:4rem;
      margin:2rem auto;
      padding-left:.5rem;
      border:1px solid #ddd;
    }
    .tipList{
      li {
        float: left;
        box-sizing: border-box;
        padding: 1rem;
        //width: 25%;
        span{
          display: block;
          height:3.2rem;
          text-align: center;
          line-height: 3.2rem;
          border:1px solid #555555;
          background: #fff;
          border-radius: 3px;
          padding:.5rem;
        }
      }
    }
    .start_button{
      position: fixed;
      bottom:5rem;
      left:50%;
      margin-left:-3rem;
      width:6rem;
      height:6rem;
      border-radius: 50%;
      background: red;
      color:#fff;
      p{
        /*display: block;*/
        width:3rem;
        margin:1.2rem auto;
        text-align: center;
        color:#fff;
      }
    }
  }
</style>
