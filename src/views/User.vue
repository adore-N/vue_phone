<template>
   <div class="user">
       <img src="../assets/images/banner.png" alt="">
       <p>用户昵称</p>
       
          <a href="javascript:;" @click="loginOut">注销</a>
   </div>
</template>
<script>
import store from "../plugins/store.js";
export default {
    //路由前置守卫 在没有进入到这个路由前判断用户是否已经登录
    beforeRouteEnter(to,from,next){
        // console.log(1)
        store.state.user.err == 0 ? next() : next('/login')
    },
    methods:{
        loginOut(){
            axios({
                url:'http://localhost:3000/shop/logout',
                method:'delete'
            }).then(
                res=>{
                    if(res.data.err === 0){
                        this.$router.push('/home');
                        //这里是直接修改state数据
                        this.$store.commit('CHECK_USER',{
                            err:1,
                            msg:'未登录'
                        })
                        
                    }
                }
            )
        }
    }
}
</script>
<style lang='scss' scoped>
.user{
    text-align: center;
    margin-top:1rem;
    img{
        width: 2rem;
        height: 2rem;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
    }
    p{
        font: .24rem/.36rem '';
        margin:.3rem 0;
        color: red;
    }
    a{
        color: #ccc;
    }
}
</style>