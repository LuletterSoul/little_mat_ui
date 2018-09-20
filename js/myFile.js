const userId = $.cookie('userId');


/*
var myAdd = new Vue({
    el: "#myAdd",
    data: {
        name:null,
        description:null,
        path:null,
        department:null,

        tagCollegeArray: ['计算机科学与工程学院', '自动化学院', '机械学院','理学院'],
        tagSubjectArray:['操作系统',"计算机组成原理","软件设计模式","软件项目管理","高等数学","大学物理"],
        tagTypeArray:['试卷',"课件","文档"],


    },

    methods: {
        submit:function () {
            console.log("name:"+this.name);
            console.log("description"+this.description)
        }
    }

});
*/


var myFile = new Vue({
    el: "#myFile_",
    data: {
        name:null,
        description:null,
        path:null,
        file:null,
        department:null,
        courseId:null,
        type:1,
        tagSubjectArray:[],
        tagTypeArray:[{typeId:1,name:'试卷'},{typeId:2,name:'课件'},{typeId:3,name:'文档'}],
        /*fileList: [
            {
                amsgId: 0,
                title: "操作系统试卷",
                size:100,
                uploadDate: "2018.9.10",
                format: "doc",

            },

        ]*/
        myfileList: [],
    },

    created:function(){
        //this. getCheckContent(0);
        this.getlist();
        this.getCourselist();

    },

    methods: {
        //记录用户勾选的文件
        setFile:function (e) {
            this.file = e.target.files[0];
        },
        getlist: function () {
            //请求服务器的api获取到个人上传的资料数据列表
            var userId = $.cookie('userId');
            var url = "http://118.24.62.94:8085/user/"+userId+"/uploads";
            console.log("userId:"+ userId);
            console.log("url"+url);
            this.$http.get(url).then(function (response) {
                //还没处理服务器异常信息
                //处理正常数据
                this.myfileList = response.body.content;
                console.log("刷新获取列表");
            });
        },

        //获取课程数组
        getCourselist: function () {
            var url = "http://118.24.62.94:8085/courses";
            this.$http.get(url).then(function (response) {
                //还没处理服务器异常信息
                //处理正常数据
                this.tagSubjectArray = response.body.content;
                console.log("刷新获取课程列表");
            });
        },
    createRes:function(){
    var formData = new FormData();
    formData.append('file', this.file);
    axios.post('http://118.24.62.94:8085/resource',{},{
        params:{
            userId: userId,
            type: this.type,
            name:this.name,
            courseId:this.courseId
        },
    }).then((response)=>{
        axios.post('http://118.24.62.94:8085/resource/'.concat(response.data.resId).concat("/file"), formData, {
            contentType: 'multipart/form-data'
        });
        alert("上传成功");
        location.reload();
      }).catch(error=>{})
      },
        //删除数据,测试通过
        deldata:function (id) {
            //http://118.24.62.94:8085/resource/7
            //http://118.24.62.94:8085/resource/1
            //还没处理服务器异常信息
            this.$http.delete('http://118.24.62.94:8085/resource/'+id)
                .then(response => {
                    this.getlist();
                })
            this.getlist();
        },


        uploadurl:function () {
            return "http://118.24.62.94:8085/resource?userId=1&comId=1";
        }
    }

});