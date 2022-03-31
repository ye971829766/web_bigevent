$(function () {
    let layer = layui.layer
    let form = layui.form
    initCate()
    initEditor()
    
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取失败')
                let tmpdata = template('tpl-se', res)
                $('[name=cate_id]').html(tmpdata)
                form.render()
            }
        })
    }
    $('#sle').on('click', function () {
        $('.yc').click()
    })
      // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
    $image.cropper(options)
    $('.yc').on('change', function (e) {
       let file = e.target.files
        if (file.length === 0) {
           return
        }
        let newImgURL = URL.createObjectURL(file[0])
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
            $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
              width: 400,
              height: 280
            })
    })
    
    let art_state = '已发布'

    $('#btn-save').on('click', function () {
           art_state = '草稿'
        })
      
    $('#form-data').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 基于form表单，快速创建一个formData对象
        let formdata = new FormData($(this)[0])
        formdata.append('state' , art_state)
        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            formdata.append('cover_img', blob)
            // 发起Ajax请求
            publishArticle(formdata)
        })
    })

        function publishArticle(fd) {
            $.ajax({
                method: 'POST',
                url: '/my/article/add',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    if(res.status !== 0) return layer.msg('发布失败')
                    layer.msg('发布成功')
                    location.href = '/article/art-list.html'
                }
            })
        }
})