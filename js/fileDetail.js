
function showInfo(){
   // console.log(file.GetRequest().resId);
    var resId=file.GetRequest().resId;
    file.resId=resId;
    
    $.ajax({
        url: "http://118.24.62.94:8085/resource/"+resId,               
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function(response){

            console.log(response);

file.userName=response.uploader.name;
file.userMajor=response.uploader.major;
file.userCollege=response.uploader.department.depName;
file.name=response.name;
file.size=(response.size/1024).toFixed(2) ;
/*
            for (var i =0;i< response.content.length ; i++) {
                    // console.log(response.content[i].depName);
                    tag.CollegeArrayInfo[i]=response.content[i];
                    Vue.set(tag.tagCollegeArray, i,response.content[i].depName);
                    // tag.tagCollegeArray[i]=response.content[i].depName;//这种方法只改变数据，并不能渲染到视图
                }*/
            }
        }); 
}
function getCookie(name){ 
var strCookie=document.cookie; 
var arrCookie=strCookie.split("; "); 
for(var i=0;i<arrCookie.length;i++){ 
var arr=arrCookie[i].split("="); 
if(arr[0]==name)return arr[1]; 
} 
return ""; 
} 
var tag = new Vue({
    el: ".section",//可用范围在面包屑标签那里
    data: {
        tagCollegeArray: ['计算机', '电光', '设传'],
        tagCollegeSelected: "计算机",
        tagSubjectSelected: "操作系统",
        tagTypeSelected: "试卷",
    }
});

var file = new Vue({
    el: "#fileDetail",
    data: {
        resId: "3",
        userName: "jennie",
        userCollege: "计算机科学与工程学院",
        userMajor: "软件工程",
        name: "操作系统试卷",
        format: "doc",
        icon: "img/doc.png",
        type: "试卷",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        size: 100,
        uploadDate: "2018.9.10"
    },
    methods: {
        GetRequest: function () {
            var url = location.search;
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },

        getParameter: function () {
            Request = new Object();
            Request = GetRequest();
            var a = Request['resId'];
            this.resId = a;
            console.log(this.resId);
        },

        onClick: function (e) {
            console.log("download clicked");
            var userId = getCookie('userId');
            console.log(userId);
            console.log(this.resId);
            this.$http.post('http://118.24.62.94:8085/resource/' + this.resId + '/user/' + userId).then((res => {
                console.log(res.headers);
                const content = res;
                const blob = new Blob([content]);
                const fileName = res.headers.map['x-suggested-filename'];
                console.log(fileName);
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a')
                    elink.download = fileName;
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click();
                    URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink)
                } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                }
            }));
        }
    }
});