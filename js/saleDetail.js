
window.onload = function() {
    var saleD = new Vue({
        el: "#saleDetail_",
        data: {
            amsgId: [],
            msg: []
        },
        created() {
            this.getParameter();
            this.get();
        },
        methods: {
            onClick: function (e) {
                console.log("download clicked");
            },

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
                var a = Request['Id'];
                this.amsgId = a;
                console.log(this.amsgId);
            },
            getPhotoPath:function (path) {
                return ("http://118.24.62.94:9000/"+path);
            },

            get: function () {
                // noinspection JSAnnotator
                this.$http.get('http://118.24.62.94:8085/auction_msgs/'+this.amsgId).then(function (res) {
                    /* this.saleList=res.data;
                     JSON.parse(res);
                     console.log(res.content.title);*/
                    this.msg = res.body;
                    console.log("success");
                    console.log(res.body);
                });
            }
        }
    })
}