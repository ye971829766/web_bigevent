$(function () {
    getUserInfo()
    $('#tuichu').on('click', function () {
    let layer = layui.layer
    layer.confirm('您确认要退出吗？', {icon: 3, title:'提示'}, function(index){
        // 清空本地存储
        localStorage.removeItem('token')
        // 跳转到登录页面
        location.href = '/login.html'
        layer.close(index);
        });   
    })
})

function getUserInfo() {
    $.ajax({
        mathod: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if(res.status !== 0) return layer.msg(res.message)
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         location.href = '/login.html'
        //         localStorage.removeItem('token')
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 用户名等于
    let name = user.username || user.nickname
    // &nbsp;是空格
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 如果用户上传头像，则显示图片头像，如果没上传，显示文字头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).hide().show()
        $('.layui-nav-img').hide()
    }
}