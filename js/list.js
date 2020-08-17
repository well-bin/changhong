;!function(){
    //1.渲染商品列表
    class Render{
        constructor(){
            this.list = document.querySelector('.list ul');
        }

        init(){
            $ajax({
                url:'http://localhost/upanddown/php/alldate.php'
            }).then((data)=>{
                console.log(data);
                let dataArr=JSON.parse(data);
                let strHtml = '';
                for(let value of dataArr){
                    //将每一个商品的sid传给详情页。
                    strHtml+=`
                        <a href="detail.html?sid=${value.rid}">
                            <li>
                                <img src="${value.pic}"/>
                                <p>${value.title}</p>
                                <span>${value.price}</span>
                                <span>${value.count}</span>
                            </li>
                        </a>
                    `;
                }
                this.list.innerHTML = strHtml;
            });
        }
    }

    new Render().init();
}();