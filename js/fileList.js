var tag = new Vue({
    el: "#selection",//可用范围在面包屑标签那里
    data: {
        tagCollegeArray: ['计算机科学与工程学院', '自动化学院', '机械学院','理学院'],
        tagSubjectArray:['操作系统',"计算机组成原理","软件设计模式","软件项目管理","高等数学","大学物理"],
        tagTypeArray:['试卷',"课件","文档"],
        tagCollegeSelected: null,
        tagSubjectSelected: null,
        tagTypeSelected: null,
    },

    methods:{
        onClickCollege: function (i) {
            this.tagCollegeSelected = this.tagCollegeArray[i];
            console.log("点击了第"+i+"个标签");
        },
        onClickSubject: function (i) {
            this.tagSubjectSelected = this.tagSubjectArray[i];
            console.log("点击了第"+i+"个标签");
        },
        onClickType: function (i) {
            this.tagTypeSelected = this.tagTypeArray[i];
            console.log("点击了第"+i+"个标签");
        },

    }

});


var fileList = new Vue({
    el: "#file_",
    data: {
        fileList: [
            {
                resId: "0",
                userName: "jennie",
                name: "操作系统试卷",
                format: "doc",
                icon:"img/doc.png",
                type: "试卷",
                size: 100,
                description: "You may tell your co-workers about TemplateMo free stuffs to download and use for any website project. Thank you for supporting us.",
                uploadDate: "2018.9.10"
            },

            {
                resId: "1",
                userName: "jennie",
                name: "计算机组成原理PPT",
                format: "ppt",
                icon:"img/ppt.png",
                type: "演示文档",
                description: "You may tell your co-workers about TemplateMo free stuffs to download and use for any website project. Thank you for supporting us.",
                size: 100,
                uploadDate: "2018.9.10"
            },
            {
                resId: "2",
                userName: "jennie",
                name: "计算机逻辑基础试卷",
                format: "pdf",
                icon:"img/pdf.png",
                type: "试卷",
                description: "You may tell your co-workers about TemplateMo free stuffs to download and use for any website project. Thank you for supporting us.",
                size: 100,
                uploadDate: "2018.9.10"
            },
            {
                resId: "3",
                userName: "jennie",
                name: "操作系统试卷",
                format: "zip",
                icon:"img/zip.png",
                type: "试卷",
                description: "You may tell your co-workers about TemplateMo free stuffs to download and use for any website project. Thank you for supporting us.",
                size: 100,
                uploadDate: "2018.9.10"
            },

        ]
    }
});
