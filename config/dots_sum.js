function dotSum() {

    var routerPath = window.location.pathname.match(/\//g)
    var dots = ""
    var pathLength = routerPath.length; //线上
    // var pathLength = routerPath.length - 1;  //本地测试
    if (pathLength === 1) {
        dots = dots + "./"
    } else {
        while (pathLength > 1) {
            pathLength--;
            dots = dots + "../"
        }
    }

    return dots
}
var dotsSum = dotSum()