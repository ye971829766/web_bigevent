$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与旧密码相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '请输入相同的新密码'
            }
        }
    })

    // 提交重置密码的表单
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if(res.status !== 0){return layer.msg('原密码错误')}
                layer.msg('密码修改成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
})