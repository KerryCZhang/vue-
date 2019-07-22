<template>
  <div id="start">
    <p class="start_header"><i>修改用餐人数</i></p>
    <p class="start_tip">请选择正确的用餐人数，小二马上给你送餐</p>
    <ul class="person_num clearfix">
      <li v-for="(i,key) in person" @click="changePerson(i)" ><span :class="{active:key+1==peopleInfo.personNum}">{{i}}人</span></li>
    </ul>
    <input type="text" v-model.trim="peopleInfo.tip" class="tips" placeholder="请输入您的口味要求,忌口等（可以不填写）" @keyup.enter="addTips">
    <ul class="tipList clearfix">
      <li><span>少盐</span></li>
      <li><span>微辣</span></li>
      <li><span>不要味精</span></li>
    </ul>
    <div class="footer">
      <div class="cancel_button">
        <router-link to="/cart">
          取消
        </router-link>
      </div>
      <div class="start_button" @click="startOrder">
        <p>开始点单</p>
      </div>
    </div>

  </div>
</template>

<script>
  import config from "./../model/config.js"
  import localstorage from "./../model/localsession.js"
    export default {
        // name: "1home_component.vue"
      data(){
        return{
          person:12,
          tipsList:[],
          api:config.api,
          peopleInfo:{
            personNum:1,
            tip:"",
          }
        }
       },
      methods:{
        addTips(){
          this.tipsList.unshift(this.tip)
          this.tip=""
        },
        changePerson(num){
          this.peopleInfo.personNum=num
        },
        startOrder(){

          this.axios.post(this.api+"api/addPeopleInfo",{
            uid:localstorage.get("uid"),
            p_num:this.peopleInfo.personNum,
            p_mark:this.peopleInfo.tip
          }).then(
            res=>{
              console.log(res)
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
        getPeopleInfo(){
          this.axios.get(this.api+"api/peopleInfoList?uid=me10").then(
            res=>{
              if(res.data.success){
                // this.peopleInfo=res.data.result[0]
                this.peopleInfo.personNum=res.data.result[0].p_num
                this.peopleInfo.tip=res.data.result[0].p_mark
              }
            }
          ).catch(
            error=>{
              console.log(error)
            }
          )
        },
      },
      mounted(){
        this.getPeopleInfo()
      }
    }
</script>

<style scoped lang="scss">
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
    ul{
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
    .footer{
      display: flex;
      justify-content: space-between;
      width:70%;
      margin:0 auto;
    }
    .cancel_button{
      width:6rem;
      height:6rem;
      border-radius: 50%;
      background: red;
      a{
        display: block;
        text-align: center;
        line-height: 6rem;
        color:#fff;
      }
    }
    .start_button{
      display: inline-block;
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
