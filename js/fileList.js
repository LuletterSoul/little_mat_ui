function showdep(){
    $.ajax({
        url: "http://118.24.62.94:8085/deps",               
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function(response){
            for (var i =0;i< response.content.length ; i++) {
                    // console.log(response.content[i].depName);
                    tag.CollegeArrayInfo[i]=response.content[i];
                    Vue.set(tag.tagCollegeArray, i,response.content[i].depName);
                    // tag.tagCollegeArray[i]=response.content[i].depName;//这种方法只改变数据，并不能渲染到视图
                }
            }
        }); 
}
function searchbyinfo(){
    var info=document.getElementById("info").value;
    //alert(info);
    $.ajax({

        url: "http://118.24.62.94:8085/resource/fuzzy?name="+info,               
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function(response){
                   console.log(response.content);
                   fileList.fileList=[];
                         for (var i =0;i< response.content.length ; i++)
                         {
                            Vue.set(fileList.fileList, i,response.content[i]);
                        }
            }
        }); 
}

var tag = new Vue({
    el: "#selection",//可用范围在面包屑标签那里
    data: {
        tagCollegeArray: [],//只存放学院的名字
        CollegeArrayInfo:[],//存放学院的所有信息
        tagSubjectArray:[],//只存放课程的名字
        SubjectArrayInfo:[],//存放课程的所有信息
        tagTypeArray:[{id:1,type:'试卷'},{id:2,type:'课件'},{id:3,type:'文档'}],
        //与后台交互代码分别为1，2，3
        tagCollegeSelected: null,//记录被选中的学院
        tagSubjectSelected: null,//记录被选中的课程
        tagTypeSelected: null,//记录被选中的类型

    },

    methods:{
        onClickCollege: function (i) 
        {
            this.tagCollegeSelected = this.CollegeArrayInfo[i];
            console.log("点击了第"+i+"个标签");
            console.log(tag.tagSubjectSelected);
            console.log(tag.tagTypeSelected);

          //   console.log(this.CollegeArrayInfo[i]);
            if(tag.tagSubjectSelected!=null&&tag.tagTypeSelected!=null)
            {  
                tag.tagSubjectSelected=null;//zhikong
                tag.tagTypeSelected=null;
            }
           
            this.$http.get('http://118.24.62.94:8085/courses?depId='+this.CollegeArrayInfo[i].depId).then(function(res){

                console.log(res.data.content);
                tag.SubjectArrayInfo=[];
                        //数据层置空，避免数据量变少时，剩余数据造成bug["d","f","g"]变成["ff","gg"]
                        //如果直接用下面的循环，"g"不会被消除。
                tag.tagSubjectArray=[];
                for (var i =0;i< res.data.content.length ; i++) 
                {
                    tag.SubjectArrayInfo[i]=res.data.content[i];//不渲染的数据可以这样赋值，用于保存完备信息

                    Vue.set(tag.tagSubjectArray, i,res.data.content[i].courseName);
                }
            },function(){
            console.log('请求失败处理');
            });
        },
            onClickSubject: function (i) 
            {
                this.tagSubjectSelected = this.SubjectArrayInfo[i];
                console.log("点击了第"+i+"个标签");
                console.log(this.SubjectArrayInfo[i]);
                this.$http.get('http://118.24.62.94:8085/resource?courseId='+this.SubjectArrayInfo[i].courseId).then(function(res){         

                 console.log(res.data.content);         

                 fileList.fileList=[];
                 for (var i =0;i< res.data.content.length ; i++) {
                    Vue.set(fileList.fileList, i,res.data.content[i]);          
            
            

                }
            },function(){
                console.log('请求失败处理');
            });
            },
            onClickType: function (i) 
            {
                this.tagTypeSelected = this.tagTypeArray[i];
                       // console.log("点击了第"+i+"个标签");          

                       this.$http.get('http://118.24.62.94:8085/resource?courseId='+this.tagSubjectSelected.courseId+"&type="+this.tagTypeSelected.id).then(function(res){          

                         console.log(res.data.content);         

                         fileList.fileList=[];
                         for (var i =0;i< res.data.content.length ; i++)
                         {
                            Vue.set(fileList.fileList, i,res.data.content[i]);
                        }
                    },function(){
                        console.log('请求失败处理');
                    });         

            },

   }

});


var fileList = new Vue({
    el: "#file_",
    data: {

        fileList: []
    }
});
