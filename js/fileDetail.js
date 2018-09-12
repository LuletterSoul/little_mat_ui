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
    el:"#fileDetail",
    data :{
        resId: "3",
        userName: "jennie",
        userCollege:"计算机科学与工程学院",
        userMajor:"软件工程",
        name: "操作系统试卷",
        format: "doc",
        icon:"img/doc.png",
        type: "试卷",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        size: 100,
        uploadDate: "2018.9.10"
    },
    methods:{
      onClick: function (e) {
          console.log("download clicked");
      }
    }
})