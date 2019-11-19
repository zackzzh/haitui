//全局slide
$(function () {
  var time = 60;//倒计时
  var flag = true//控制倒计时
  var mySwiper = new Swiper('#bigSwiper', {
    direction: 'vertical', // 垂直切换选项
    // 如果需要分页器
    height: document.documentElement.clientHeight,//获取浏览器高度
    pagination: {
      el: '.swiper-pagination',
    },
    observer: true,
    observerParent: true,
    clickable: true,
    mousewheel: true,
    on: {
      init: function (e) {
        // 隐藏滚动条
        document.body.parentNode.style.overflowY = "hidden";
        document.body.parentNode.style.overflowX = "hidden";
        var height = document.documentElement.clientHeight - 80
        var sixheight = document.documentElement.clientHeight - 186
        $(".index_one").css("height", height + 'px');
        $(".six_img").css("height", sixheight + 'px');
        $('.form_bottom1').css('display', 'none')
      },
      slideChangeTransitionStart: function () {
        console.log('mySwiper', mySwiper)
        // 菜单导航
        if (mySwiper.activeIndex !== 0) {
          $('#index-nav').css('display', 'block')
          $('#index-nav').css('display', 'block')
          $('.form_bottom1').css('display', 'flex')
        } else {
          $('#index-nav').css('display', 'none')
          $('.form_bottom1').css('display', 'none')
        }
        show = true
        $('.common_nav_head').css('display', 'none')
        $('.com_fiexd').css('display', 'none')
        switch (mySwiper.activeIndex) {
          case 1:
            // 清除第五块动画
            $('#three .index_three_title').removeClass('animated fadeInUp')
            $('#three .right_num').removeClass('animated fadeInUp')
            $('#three .right_content').removeClass('animated fadeInUp')
            $('#three .index_three_left').removeClass('animated fadeInUp')
            break
          case 2:
            // 增加第三块动画
            $('#three .index_three_title').addClass('animated fadeInUp')
            $('#three .right_num').addClass('animated fadeInUp')
            $('#three .right_content').addClass('animated fadeInUp')
            $('#three .index_three_left').addClass('animated fadeInUp')
            // 清除第四块动画
            $('#four .index_three_title').removeClass('animated fadeInUp')
            $('#four .right_num').removeClass('animated fadeInUp')
            $('#four .right_content').removeClass('animated fadeInUp')
            $('#four .index_three_left').removeClass('animated fadeInUp')
            break;
          case 3:
            // 清除第三块动画
            $('#three .index_three_title').removeClass('animated fadeInUp')
            $('#three .right_num').removeClass('animated fadeInUp')
            $('#three .right_content').removeClass('animated fadeInUp')
            $('#three .index_three_left').removeClass('animated fadeInUp')
            // 增加第四块动画
            $('#four .index_three_title').addClass('animated fadeInUp')
            $('#four .right_num').addClass('animated fadeInUp')
            $('#four .right_content').addClass('animated fadeInUp')
            $('#four .index_three_left').addClass('animated fadeInUp')
            // 清除第五块动画
            $('#five .index_three_title').removeClass('animated fadeInUp')
            $('#five .right_num').removeClass('animated fadeInUp')
            $('#five .right_content').removeClass('animated fadeInUp')
            $('#five .index_three_left').removeClass('animated fadeInUp')
            break;
          case 4:
            // 增加第五块动画
            $('#five .index_three_title').addClass('animated fadeInUp')
            $('#five .right_num').addClass('animated fadeInUp')
            $('#five .right_content').addClass('animated fadeInUp')
            $('#five .index_three_left').addClass('animated fadeInUp')
            // 清除第四块动画
            $('#four .index_three_title').removeClass('animated fadeInUp')
            $('#four .right_num').removeClass('animated fadeInUp')
            $('#four .right_content').removeClass('animated fadeInUp')
            $('#four .index_three_left').removeClass('animated fadeInUp')
            break;
          case 5:
            // 清除第五块动画
            $('#five .index_three_title').removeClass('animated fadeInUp')
            $('#five .right_num').removeClass('animated fadeInUp')
            $('#five .right_content').removeClass('animated fadeInUp')
            $('#five .index_three_left').removeClass('animated fadeInUp')
            break
          default:
            break
        }
      },
    },
  });
  for (i = 0; i < mySwiper.pagination.bullets.length; i++) {
    mySwiper.pagination.bullets[i].click = function () {
      this.click();
    };
  }
  //如果你在swiper初始化后才决定使用clickable，可以这样设置
  mySwiper.params.pagination.clickable = true;
  //此外还需要重新初始化pagination
  mySwiper.pagination.destroy()
  mySwiper.pagination.init()
  mySwiper.pagination.bullets.eq(0).addClass('swiper-pagination-bullet-active');
  var mySwiper2 = new Swiper('#smallSwiper', {
    loop: true, // 循环模式选项
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  $("#index-nav").load('./components/index-nav/index-nav.html')
  $('.code').mousemove(function () {
    console.log(111);
    $('.index_code').css('display', 'block')
  })
  $('.code').mouseout(function () {
    $('.index_code').css('display', 'none')
  });
  $('#tel').blur(function (e) {
    if (!(/^1[3456789]\d{9}$/.test(e.currentTarget.value))) {
      alert("手机号码有误，请重填");
      return false;
    }
  })
  // 获取验证码
  $('.msg').click(function () {
    mobile = $('#tel').val()
    if (mobile && mobile.length == 11) {
      if (flag) {
        flag = false
        countDown()
        api('GET', 'common/message', { mobile: mobile }).then((res) => {
          alert(res.msg)
        })
      }
    } else {
      alert("请填写手机号码");
      return
    }
  })
  // 倒计时
  function countDown() {
    time = 60;
    var timer = setInterval(() => {
      time--
      $('.msg').text('还剩' + time + 's')
      $('.msg').css('color', '#333')
      if (time == 0) {
        flag = true
        $('.msg').text('获取验证码')
        $('.msg').css('color', 'rgba(255, 58, 0, 1)')
        clearInterval(timer)
      }
    }, 1000);
  }
  // 注册
  $('#submit').click(function () {
    var companyName = $('#companyName').val()
    var mobile = $('#tel').val()
    var question = $('#detail').val()
    var code = $('#msgCode').val()
    if (mobile.length == 0) {
      alert('请填写手机号码')
    }
    if (code.length == 0) {
      alert('请填写手机验证码')
    }
    var data = {
      mobile: mobile,
      companyName: companyName,
      question: question,
      code: code
    }
    api('POST', 'htUser/register', data).then((res) => {
      alert(res.msg)
      var companyName = $('#companyName').val('')
      var mobile = $('#tel').val('')
      var question = $('#detail').val('')
      var code = $('#msgCode').val('')
    })
  })
  // 获取头部meta信息
  api('GET', '1', {}).then((res) => {
    var meta = document.createElement('meta');
    meta.content = res.data.seoKeyword;
    meta.name = 'keywords';
    var meta2 = document.createElement('meta');
    meta2.content = res.data.remark;
    meta2.name = 'description';
    document.title = res.data.title
    document.getElementsByTagName('head')[0].appendChild(meta);
    document.getElementsByTagName('head')[0].appendChild(meta2);
  })
})
