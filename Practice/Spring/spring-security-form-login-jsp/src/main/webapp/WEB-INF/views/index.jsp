<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"  %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>Main Page </p>
    <sec:authorize access="isAnonymous()">
        <a href="/loginForm">로그인</a>
    </sec:authorize>

    <sec:authorize access="isAuthenticated()">
        <p><sec:authentication property="principal.username"/></p>
        <p><a href="/logout">로그아웃</a></p>
    </sec:authorize>

    <p><a href="/user/page">User</a></p>
    <p><a href="/biz/page">Biz</a></p>
    <p><a href="/admin/page">Admin</a></p>
</body>
</html>
