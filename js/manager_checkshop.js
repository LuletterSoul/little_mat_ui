//Vue的生命周期
var manager_checkshop = new Vue({
    el:"#manager_checkshop_",
    data:{

        saleList:[],
        //审核模态框显示选择的相关拍卖品详情
        amsgId: "0",
        title: null,
        photo:null,
        content:null ,
        price:null,
        publicDate:null,
        userId:null,
        userName: null,
        userGrade:null,
        userCollege:null,
        userMajor:null,
        userPhone: null,
        userEmail: null,

       /* saleList: [
            {
                amsgId: 0,
                title: "计算机逻辑基础试卷",
                img:"img/product01.png",
                userName: "Jennie",
                userContact:"QQ 2525225",
                userCollege:"计算机科学与工程学院",
                userMajor:"软件工程",
                type: "试卷",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                price:99.8,
                isPassed:0,
                isSold: 0 //0是在售，1是已售出

            },

        ]*/
    },

    //Vue对象实例创建成功以后就会自动调用这个方法
    created:function(){
      this.getlist();
    },

    methods:{
       /* onClickCheck: function (i) {
            this.amsgId = this.saleList[i].amsgId;
        },*/

        //获得审核的该条目的信息
        getCheckContent:function(id){
           /* this.$http.get("$http://118.24.62.94:8085/auction_msgs/2")
                .then(function (response) {
                    //还没处理服务器异常信息*/
                    this.amsgId = this.saleList[id].amsgId;
                    this.title = this.saleList[id].title;
                    this.photo = this.saleList[id].photos.photoPath;
                    this.content = this.saleList[id].content;
                    this.price = this.saleList[id].price;

                    this.userName = this.saleList[id].publisher.account.username;
                    this.userCollege = this.saleList[id].publisher.department.depName;
                    this.userGrade = this.saleList[id].publisher.grade;
                    this.userMajor = this.saleList[id].publisher.major;
                    this.userPhone = this.saleList[id].publisher.phone;
                    this.userEmail =this.saleList[id].publisher.email;


            /* })*/

        },
        getlist:function () {
            var url = "http://118.24.62.94:8085/auction_msgs";
            //请求服务器的api获取到品牌的数据列表
            this.$http.get(url).then(function (response) {
                //还没处理服务器异常信息
                //处理正常数据
                this.saleList = response.body.content;
                console.log(this.saleList);
            });
        },

        //删除数据,测试不成功
        deldata:function (id) {
            //还没处理服务器异常信息
            this.$http.delete("http://118.24.62.94:8085/auction_msgs/"+id)
                .then(function (response) {
                    //刷新列表
                    this.getlist();
                })

        },

    }
})