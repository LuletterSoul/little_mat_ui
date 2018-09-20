//Vue的生命周期
var personalInfo = new Vue({
    el:"#personalInfo_",
    data:{
        user:{
            email:null,
        },
        userName:"Jennie",
        userImg:"img/hy.png",
        gender:"女",
        email:"Jennie_123@126.com",
        phone:12345678901,
        userCollege:"计算机科学与工程学院",
        userMajor:"软件工程",
    },
    created:function(){
        this.get();
    },
    methods:{
        /* onClickCheck: function (i) {
             this.amsgId = this.saleList[i].amsgId;
         },*/

        //获得审核的该条目的信息
        get:function () {

            var url = "http://118.24.62.94:8085/user/";
            //请求服务器的api获取到品牌的数据列表
            var userId = $.cookie('userId');
            console.log(userId);
            this.$http.get(url+userId+"/info").then(function (response) {
                this.user = response.body;
                this.userName = this.user.name;
                this.email = this.user.email;
                this.gender = this.user.gender;
                this.phone = this.user.phone;
                this.userMajor = this.user.major;
                // this.userCollege = this.user.department.depName;
                console.log(this.user);
                console.log(response);

            });
        },
    }
})

var depInfo = new Vue({
    el:"#updateInfo_",
    data:{
        userId:null,
        deplist:[],
    },
    created:function(){
        this.get();
    },
    methods:{
        /* onClickCheck: function (i) {
             this.amsgId = this.saleList[i].amsgId;
         },*/

        //获得审核的该条目的信息
        get:function () {

            this.userId = $.cookie('userId');
            console.log(this.userId);
            var url = "http://118.24.62.94:8085/deps";
            //请求服务器的api获取到品牌的数据列表
            this.$http.get(url).then(function (response) {
                this.deplist = response.body.content;
                // this.userCollege = this.user.department.depName;
                console.log(this.deplist);
                console.log(response);

            });
        },
        modify:function() {
            var userName_=document.getElementById("userName").value;
            var sex=document.getElementById("sex").value;
            var email=document.getElementById("email").value;
            var phone=document.getElementById("phone").value;
            var grade=document.getElementById("grade").value;
            var atpos=email.indexOf("@");
            var dotpos=email.lastIndexOf(".");
            var userId = $.cookie('userId');
            console.log(userId);
            if(userName!=="" && sex!=="" && email!=="" && phone!=="" && grade!==""){
                <!-- 验证邮箱输入 -->
                if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
                    alert("不是一个有效的 e-mail 地址");
                    return false;
                }
                var form = new FormData();
                form.append("userId",userId);
                form.append("name",userName);
                form.append("gender",sex);
                form.append("email",email);
                form.append("phone",phone);
                $.ajax({
                    url:"http://118.24.62.94:8085/user",
                    type:"put",
                    data: form,
                    processData:false,
                    contentType:false,
                    success:function(){
                        window.clearInterval(timer);
                        console.log("over..");
                    },
                    error:function(){
                        alert("错误！！");
                        window.clearInterval(timer);
                    }
                })
                return true;
            }
            else{
                alert("输入不能为空，请重新输入！");
                return false;
            }
        },
    }
})