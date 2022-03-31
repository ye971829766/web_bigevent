$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state:''
    }
    template.defaults.imports.dataFormat = function (date) {
        let dt = new Date(date)
        
        let yy = dt.getFullYear()
        let mm = zero(dt.getMonth()+1)
        let dd = zero(dt.getDate())

        let hh = zero(dt.getHours())
        let mi = zero(dt.getMinutes())
        let ss = zero(dt.getSeconds())

        return yy + '-' + mm + '-' + dd + '  ' + hh + ':' + mi + ':' +ss
    }
    function zero(n) {
       return n > 9 ? n:'0'+n
    }
    initTable()
    initCate()
    function initTable() {
        $.ajax({
          method: 'GET',
          url: '/my/article/list',
          data: q,
            success: function (res) {
                console.log(res)
            if (res.status !== 0) {
              return layer.msg('获取文章列表失败！')
            }
            // 使用模板引擎渲染页面的数据
            var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
          }
        })
    }
    
    function initCate() {
        $.ajax({
            method: 'GET',
            url:'/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取文章分类信息失败')
                let tplca = template('tpl-cate', res)
                $('[name=cate_id]').html(tplca)
                form.render()
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total ,//数据总数，从服务端得到
            curr: q.pagenum,
            limit: q.pagesize,
            layout:['count' , 'limit' , 'prev' , 'page' , 'next' ,'skip'],
            limits: [2,5,8,10],
            jump: function (obj , first){
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
        
    }

    $('tbody').on('click', '.btn-delE', function () {
        let len = $('.btn-delE').length
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            console.log(id)
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res)
                    if(res.status !== 0) return layer.msg('删除失败')
                    layer.msg('删除成功')
                    if (len === 1) {
                       q.pagenum = q.pagenum === 1? 1 : q.pagenum-1
                    }
                    initTable()
                }
            })
            
            layer.close(index)
          })
    })

    $('tbody').on('click', '.btn-Edit', function () {
        layer.open({
            title:'编辑',
            type: 1, 
            content: $('#textEdit').html(), //这里content是一个普通的String
            area: ['500px', '300px']
        })
        let id = $(this).attr('data-id')
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

    // 编辑功能
    $('tbody').on('submit', '#form-edit', function (e) {
        e.preventDefault()
      
    })
})