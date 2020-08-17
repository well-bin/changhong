<?php

header('content-type:text/html;charset=utf-8');//设置字符编码。
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','');//密码
define('DBNAME','wbwb11');//数据库

$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
if(isset($_POST['username'])&&isset($_POST['password'])){
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $result = $conn->query("select * from formlistt where username = '$user' and password = '$pass'");
}
    
if($result->fetch_assoc()){//登录成功
    echo true;//1
}else{//登录失败
    echo false;//空
}

