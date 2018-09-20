/*window.onload=function(){ saleList.get();}*/

window.onload = function(){
    console.log("saleList");

    var saleList = new Vue({
        el: "#sale_",
        data: {
            saleList: [],
            photo:null,
        },
        mounted: function () {
            console.log("mounted");
            this.$nextTick(function () {
               this.get();
            });
        },
        methods:{
            get:function(){
                this.$http.get('http://118.24.62.94:8085/auction_msgs').then(function(res){
                    /* this.saleList=res.data;
                     JSON.parse(res);
                     console.log(res.content.title);*/
                    this.saleList=res.body.content;

                    console.log(res.body);

                    console.log(res.body.content[0].photos[0].photoPath);
                    console.log(res.body.content[0].size);
                    console.log("success");
                });
            },
            getPhotoPath:function (path) {
                return ("http://118.24.62.94:9000/"+path);
            },
        }
    });

    //console.log(saleList);
}
