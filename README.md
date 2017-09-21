# qbao_Activities
qbao活动页面出现的bug原因：
1、部分iphone手机出现后台数据加载不出来的问题
      报错：bootstrap.min.css.map的错误
      原因：iphone手机默认浏览器是safair浏览器，版本低，不支持ES6语法
      解决方案：页面有let，删除
2、ihone6只有时间取不到后台数据的问题
      原因：结束时间取到是underfined
      解决方案：引用moment.min.js
               html文件引入moment.min.js
               js文件中：
                      var time_end = moment(endDate).toDate().getTime();
3、将1000000  转为1，000，000 
   将1000000.00  转为1，000，000
      原因：调用方法，不太好
      优化方案：引用jquery.number.min.js
               html文件中引用jquery.number.min.js
                js文件中
                      $(".obtain").number(data.expectedIncome,0);
              如果是number(数,2)   将1000000.00  转为1，000，000.00
