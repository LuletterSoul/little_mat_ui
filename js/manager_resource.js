var manager_resource = new Vue({
    el:"#manager_resource_",
    data:{
        //审核模态框显示选择的相关拍卖品详情
        resId:"0",
        name: null,
        format:null,
        type: null,
        size: null,
        status:0,
        userId: null,
        userName: null,
        userGrade:null,
        userCollege:null,
        userMajor:null,
        userPhone: null,
        userEmail: null,
        fileList: [],

        //描述没有在接口中找到
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },

    //Vue对象实例创建成功以后就会自动调用这个方法
    created:function(){
        //this. getCheckContent(0);
        this.getlist();

    },

    methods:{
        /*onClickCheck: function (i) {
            this.amsgId = this.saleList[i].amsgId;
            this.title = this.saleList[i].title;
            this.img = this.saleList[i].img;
            this.userName = this.saleList[i].userName;
            this.userContact = this.saleList[i].userContact;
            this.userMajor = this.saleList[i].userMajor;
            this.userCollege = this.saleList[i].userCollege;
            this.type = this.saleList[i].type;
            this.description = this.saleList[i].description;
            this.price = this.saleList[i].price;
            this.isSold = this.fileList[i].isSold;
        },*/

        //获得审核的该条目的信息
        getCheckContent:function(i){
            /*this.$http.get("$http://118.24.62.94:8085/resource/"+id)
                .then(function (response) {*/
                    //还没处理服务器异常信息
                    this.resId = this.fileList[i].resId;
                    this.name = this.fileList[i].name;
                    this.format = this.fileList[i].format;
                    this.size = this.fileList[i].size;
                    this.status = this.fileList[i].status;

                    this.userId = this.fileList[i].uploader.account.accountId;
                    this.userName = this.fileList[i].uploader.account.username;
                    this.userCollege = this.fileList[i].uploader.department.depName;
                    this.userGrade = this.fileList[i].uploader.grade;
                    this.userMajor = this.fileList[i].uploader.major;
                    this.userPhone = this.fileList[i].uploader.phone;
                    this.userEmail = this.fileList[i].uploader.email;

               /* })*/

        },
        getlist:function () {
            var url = "http://118.24.62.94:8085/resource";
            //请求服务器的api获取到品牌的数据列表
            this.$http.get(url).then(function (response) {
                //还没处理服务器异常信息
                //处理正常数据
                this.fileList = response.body.content;
                console.log("刷新获取列表");
            });
        },
        //删除数据,测试不通过
        deldata:function (id) {
            //http://118.24.62.94:8085/resource/7
            //http://118.24.62.94:8085/resource/1
            //还没处理服务器异常信息
            this.$http.delete('http://118.24.62.94:8085/resource/'+id)
                .then(function (response) {
                    //刷新列表
                    this.getlist();
                })

        },
        //修改status为通过
        changeStatus:function(resId,adminId){
            //http://118.24.62.94:8085/resource/7/admin/1
            //http://118.24.62.94:8085/resource/7/admin/1
            //http://118.24.62.94:8085/resource/7/admin/1
            this.$http.get("http://118.24.62.94:8085/resource/"+ resId +"/admin/"+adminId)
                .then(function (response) {
                    //刷新列表
                    this.getlist();
                })
        }

    }

   /* methods:{
        onClickCheck: function (i) {
            this.resId = this.fileList[i].resId;
            this.userName = this.fileList[i].userName;
            this.userCollege = this.fileList[i].userCollege;
            this.userMajor = this.fileList[i].userMajor;
            this.name = this.fileList[i].name;
            this.format = this.fileList[i].format;
            this.icon = this.fileList[i].icon;
            this.type= this.fileList[i].type;
            this.description = this.fileList[i].description;
            this.uploadDate = this.fileList[i].uploadDate;
            this.size = this.fileList[i].size;
        },
    }*/

})