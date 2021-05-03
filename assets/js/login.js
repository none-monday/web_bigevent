$(function() {
    //点击若无账号请注册
    $('#link_reg').on('click',function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击前往登录界面
    $('#link_login').on('click',function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //获取form对象
    let form = layui.form;
    let layer = layui.layer;
    //自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        //校验密码是否一致
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致!';
            }
        }
    })
    //坚挺注册表单的提交事件
    $('#form_reg').on('submit',function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        $.post('/api/reguser',data,function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click();
        })
    })
    //登录表单提交事件的监听
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获得表单数据
            data:$(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                //将token字符串保存
                localStorage.setItem('token',res.token);
                console.log(res.token);
                location.href = '/index.html';
            }
        })
    })
})