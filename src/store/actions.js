import * as types from './types';
export default {
    //搜索框的显示
    [types.VIEW_SEARCH]:({state,commit},payload)=>{
    //校验payload的类型
    commit(types.VIEW_SEARCH,payload)
    },
    //头部的显示
    [types.VIEW_HEADER]:({state,commit},payload)=>{
    //校验payload的类型
    commit(types.VIEW_HEADER,payload)
    },
    //标题的显示
    [types.VIEW_TITLE]:({state,commit},payload)=>{
      //校验payload的类型
      commit(types.VIEW_TITLE,payload)
    },
    //底部的显示
    [types.VIEW_FOOTER]:({state,commit},payload)=>{
      //校验payload的类型
      commit(types.VIEW_FOOTER,payload)
    },
    //loading的显示
    [types.VIEW_LOADING]:({state,commit},payload)=>{
      //校验payload的类型
      commit(types.VIEW_LOADING,payload)
    },

    //获取banner数据
    [types.UPDATE_BANNER]:({state,commit},payload)=>{
      //校验payload的类型
      commit(types.UPDATE_BANNER,payload)
    },

    //提交用户登录是否登录
    [types.CHECK_USER]:({state,commit},{tel,password})=>{
      return axios({
        url:'http://localhost:3000/shop/login',
        method:'post',
        data:{
          tel,password,
          save:true
        }
      }).then(
        res=>{
          commit(types.CHECK_USER,res.data);
          // lo
          return {
            mess:res.data.msg,
            err:res.data.err
          }
        }
      )
    },
    //添加到购物车的数据处理
    addCar:({commit,state},payload)=>{ 
      // console.log(payload.num)
      // console.log(payload)
        let arr=[...state.buyCar];
        let find=false;
        if(!payload.typeNum){
          payload.typeNum = 0;//数量
        }
        if(!payload.colorNum){
          payload.colorNum = 0;//颜色
        }
        if(!payload.num){
          payload.num = 1;//数量
        }
        // payload.num = 1
        arr.forEach((item,index)=>{
          if(item._id==payload._id){
            // console.log(item.num,payload.num)
            item.num = item.num + payload.num   ;//数量递增     //这里是有问题,当不操作数量时,会计算错误
            // console.log(item.num)
            find=true;
          }
          // arr.push(payload);
        });
        if(!find) {
          arr.push(payload);
        }
        // console.log(payload);  
        // commit(types.ADD_ITEM,[...state.buycar])
        commit(types.ADD_CAR,arr)
    },
    //修改购物车产品的数量
    changeNum:({commit,state},payload)=>{
        //根据传过来的数据循环数据,找到对应的增加或减少
        state.buyCar.forEach((item,index)=>{
          if(item._id == payload.id){
            item.num += payload.num;
            console.log(payload);
          }
        })
      console.log(state.buyCar)
      commit(types.CHANGE_NUM,[...state.buyCar]);
    },
    //输入框来修改数量
    checkNum:({commit,state},payload)=>{
      // console.log(payload.num)
      state.buyCar.forEach((item,index)=>{
        if(item._id == payload.id){
          if(!(/^[1-9]*$/.test(payload.num))){
            payload.num = 1;
            // console.log(item.num)
          }
          if(payload.num  == '') payload.num  = 1;
          
          item.num = payload.num;
        }
      })
      // console.log([...state.buyCar])
      commit(types.CHECK_NUM,[...state.buyCar])
    },
    //删除商品
    deleteGoods:({commit,state},payload)=>{
      state.buyCar.forEach((item,index)=>{
        if(item._id == payload.id){
          state.buyCar.splice(index,1)
        }
      })
      commit(types.DELETE_GOODS,[...state.buyCar])
    },
    //单选选中商品计算价钱
    [types.SELECT_ONE]:({state,commit},payload)=>{
      console.log(payload)
      let account = 0; 
      payload.forEach((item,index)=>{
          state.buyCar.forEach((ite,ind)=>{
            if(item._id === ite._id && item.checkVal){
              account += ite.num * ite.price;
              // console.log(ite.num * ite.price)
              // console.log(account)
            }
          })
        })
      commit(types.SELECT_ONE,account)  
    },

    //全选按钮状态
    selectAll:({commit,state},payload)=>{
      let account = 0;
      state.buyCar.forEach((item,index)=>{
        account += item.num * item.price
      });
      if(!payload){
        account = 0
      }
      commit(types.SELECT_ALL,{payload,account})
    }
}