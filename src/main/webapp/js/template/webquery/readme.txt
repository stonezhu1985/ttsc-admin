1.可以通过改变css文件的名称实现换肤。
2.用户需要了解的内容为_query_template_1.js、_query_template_2.js、example.html，其中用户需要实现的js全部要求写在_query_template_2.js中。
3.用户需要了解_query_template_1.js文件中的对外接口定义。
4.example.html页面中的查询结果Table中<td/>的attr名称必须与查询结果数据jsp中<record><record/>定义的属性名称一致。
6.用户需要根据需要实现_qt2.getQueryString,查询条件样本为action="url?opid=208&para=value&para=value"
7.用户需要根据需要实现_qt2.onload
8.用户需要根据需要实现_qt2.destSelected
9.example.html页面中的action与onload禁止修改，button的事件_qt.queryAction禁止修改