;!function(){
    function $(selector, all) { //selector:选择器  all：获取多个设置
        if (!all) {
            return document.querySelector(selector); 
        } else {
            return document.querySelectorAll(selector);
        }
    }
   class Detail{
        constructor(){
            //获取rid
            this.rid = location.search.substring(1).split('=')[1];
            this.arrrid=[];//商品rid
            this.arrnum=[];//商品数量
        }
        init(){
           this.render();//调用渲染。
           this.runcart();//购物车
        }
        render(){//渲染
            $ajax({
                type:'post',
                url:'http://localhost/upanddown/php/getrid.php',
                data:{
                    rid:this.rid//传给后端
                }
            }).then(function(data){//获取返回值
                let dataobj = JSON.parse(data);
                console.log(dataobj.piclisturl.split(','));
                $('#spic img').src=dataobj.pic;
                $('.loadtitle').innerHTML = dataobj.title;
                $('.loadpcp').innerHTML = dataobj.price;

                let listpic = dataobj.piclisturl.split(',');
                let strhtml = '';
                for(let value of listpic){
                    strhtml+=`<li><img src="${value}"/></li>`;
                }
                $('#list ul').innerHTML = strhtml;
                
            })
        }

        runcart(){
            //1.购物车核心思路：存储的是商品rid和数量。
          

            //2.当前的按钮是第一次还是多次点击，第一次创建商品列表，后面再点击数量累计。
            //依赖cookie进行判断。
            //先获取cookie里面的数量和rid，将其转换成数组进行判断。
            //提前约定cookie的key的值  cookierid cookienun
            let _this = this;
            function cookietoarray(){
                if(cookie.get('cookierid') && cookie.get('cookienum')){
                    _this.arrrid = cookie.get('cookierid').split(',');
                    _this.arrnum = cookie.get('cookienum').split(',');
                }else{
                    _this.arrrid = [];
                    _this.arrnum = [];
                }
            }

            $('.p-btn a').onclick = ()=>{
                cookietoarray();
                //获取cookie里面的rid，将其转换成数组arrrid。
                //再获取当前商品的rid，用当前的rid和arrrid进行比较，确认当前rid是否存在arrrid。
                //如果存在，不是第一次，否则第一次。
                if(this.arrrid.indexOf(this.rid)===-1){
                    this.arrrid.push(this.rid);
                    cookie.set('cookrid',this.arrrid,7);
                    this.arrnum.push($('#count').value);
                    cookie.set('cookienum',this.arrnum,7);
                }else{
                    alert('第二次')
                }
                alert('加入购物车成功');
            };
            
        }
   }

   new Detail().init();
}();