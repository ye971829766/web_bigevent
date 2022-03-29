$(function () {
    $('.reg-box').on('click','#btn-login', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    $('.login-box').on('click','#reg',function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })


// 从layui中获取form对象
let form = layui.form
form.verify({
    // 自定义校验规则 pwd
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    repwd: function (value) {
        let pwd = $('#pwd').val()
        if (value !== pwd) {
            return '两次密码不一致'
        }
    }
    
})
// 调用layui中的layer对象
let layer = layui.layer
// 发起Ajax请求，提交表单
$('#form-sub').on('submit', function (e) {
    e.preventDefault()
    let data = {
        username: $('#user-name').val(),
        password: $('#pwd').val()
    }
    $.post('/api/reguser',data , function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功，请登录！')
        // 注册成功后弹回登录框，模拟点击事件
        $('#btn-login').click()
    })
})
    // 登录请求
    $('#form-log').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                // console.log(res.token)
                layer.msg('登录成功')
                localStorage.setItem('token' , res.token)
                location.href='/index.html'
            }
        })
})
})


