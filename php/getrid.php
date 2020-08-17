<?php

include "conn.php";

if (isset($_POST['rid'])) {
    $sid = $_POST['rid']; //接收首页传入的sid
    $result = $conn->query("select * from cartlist where rid=$rid");
    echo json_encode($result->fetch_assoc());//输出数据
}
