$(function () {
    let layer = layui.layer
    let form = layui.form
    getArtInfo()
    function getArtInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                let artlist = template('tmp-artlist', res)
                $('tbody').html(artlist)
            }
        })
    }
    let index =null
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          });   
    })

    $('body').on('submit','#form-add',function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('添加失败')
                layer.msg('添加成功')
                getArtInfo()
                layer.close(index)
            }
        })
    })

    let indexEdit = null
    $('tbody').on('click', '#editBtn', function () {
        indexEdit = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#dialog-Edit').html()
        });  
        let id = $(this).attr('data-id')
        // console.log(id)
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res)
                if(res.status !==0 ) return layer.msg('获取失败')
                form.val('formArtInfo' , res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) return layer.msg('更新失败')
                layer.msg('更新成功')
                layer.close(indexEdit)
                getArtInfo()
            }
        })
    })
    
    $('tbody').on('click', '#delBtn', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg('删除失败')
                    layer.msg('删除成功')
                    getArtInfo()
                    layer.close(index);
                }
            })
          });
    })
})
    
