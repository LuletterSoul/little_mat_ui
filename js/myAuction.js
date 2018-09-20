window.onload = function() {
    var mySale = new Vue({
        el: "#mySale_",
        data: {


            myId:'',
            title: "nihao ",
            saleList: [],
            name1:"",
            nwprice1:null,
            describe1:"",
            ams1:null,
            name2:"",
            nwprice2:null,
            describe2:"",
            ams2:null,
            imgDataUrl:"",
            contact:""
        },

        created() {
            this.getParameter();
            this.get();
        },

        methods: {
            getParameter: function () {
                var userId = $.cookie('userId');
                console.log(userId);
                this.myId=userId;
                console.log(this.myId);
            },
            get: function () {
                // noinspection JSAnnotator
                this.$http.get('http://118.24.62.94:8085/auction_msgs?publisherId='+this.myId+'&status='+0).then(function (res) {
                    /* this.saleList=res.data;
                     JSON.parse(res);
                     console.log(res.content.title);*/
                    this.saleList = res.body.content;

                    console.log("success");
                    console.log(res.body);
                });
            },
            update:function(m){
                console.log(m);
                this.ams1=m;
                console.log(m);
                console.log(this.name1);
            },
            updateItem:function(){
                this.$http.put('http://118.24.62.94:8085/auction_msgs?amsgId='+this.ams1+'&title='+this.name1+'&content='+this.describe1+'&price='+this.nwprice1).then(function (res){
console.log(res.body);
                })
            },
            deldata:function (id) {
                //还没处理服务器异常信息
                this.$http.delete('http://118.24.62.94:8085/auction_msgs/'+id)
                    .then(response => {
                        this.getlist();
                    })
            },
           addSub:function(){
                this.$http.post('http://118.24.62.94:8085/auction_msgs/'+this.myId+'&title='+this.name2+'&content='+this.describe2+'&price='+this.nwprice2).then(function (res){
                    console.log(res.body);
                })
            }


        }
    });
}
