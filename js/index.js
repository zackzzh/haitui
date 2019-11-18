//全局slide
$(function () {
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
        $(".index_one").css("height", height + 'px');
      },
      slideChangeTransitionStart: function () {
        console.log('mySwiper', mySwiper)
        // 菜单导航
        if (mySwiper.activeIndex !== 0) {
          $('#index-nav').css('display', 'block')
        } else {
          $('#index-nav').css('display', 'none')
        }
        show = true
        $('.common_nav_head').css('display', 'none')
        $('.com_fiexd').css('display', 'none')
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
})
