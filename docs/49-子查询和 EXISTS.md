# 49. 子查询和 EXISTS

我们学习了 select 的各种语法，包括 where、limit、order by、group by、having 等，再就是 avg、count、length 等函数。

还学了多个表的 join on 关联查询。

基于这些就已经可以写出复杂的查询了，但 sql 还支持更复杂的组合，sql 可以嵌套 sql，也就是子查询。

先看下现在 student 表的数据：

点击左上角新建 sql 按钮，输入查询的 sql，点击执行：
sql

```
select*fromstudent;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-1.png)

然后我们想查询学生表中成绩最高的学生的姓名和班级名称。

这是不是就要分成两个 sql 语句：

先查询最高分：
sql

```
SELECTMAX(score)FROMstudent;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-2.png)

再查询这个分数为这个最高分的学生：
sql

```
SELECTname, classFROMstudentWHEREscore=95;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-3.png)

能不能把这两个 sql 合并呢？

可以的，这就是子查询：
sql

```
SELECTname, classFROMstudentWHEREscore=(SELECTMAX(score)FROMstudent);
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-4.png)

比如查询成绩高于全校平均成绩的学生记录：
sql

```
SELECT*FROMstudentWHEREscore>(SELECTAVG(score)FROMstudent);
```

先一个 select 语句查询学生的平均分，然后查询分数大于这个平均分的学生。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-5.png)

此外，子查询还有个特有的语法 EXISTS、NOT EXISTS。

我们用部门表和员工表来试一下：

先查询下部门表和员工表的数据：
sql

```
select*fromdepartment;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-6.png)

sql

```
select*fromemployee;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-7.png)

改一下员工的部门，点击 apply：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-8.png)

这样就有的部门 2 个员工，有的部门 3 个员工，有的部门没有员工了。

然后实现这样一个查询：

查询有员工的部门。

sql 可以这么写：
sql

```
SELECTnameFROMdepartmentWHEREEXISTS(SELECT*FROMemployeeWHEREdepartment.id=employee.department_id);
```

对每个 department，在子查询里查询它所有的 employee。

如果存在员工，那么条件成立，就返回这个部门的 name。

这就是 EXISTS 的作用：子查询返回结果，条件成立，反之不成立。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-9.png)

这就是所有有员工的部门。

还可以用 NOT EXISTS 来查询所有没有员工的部门：
sql

```
SELECTnameFROMdepartmentWHERENOTEXISTS(SELECT*FROMemployeeWHEREdepartment.id=employee.department_id);
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-10.png)

子查询不止 select 里可以用，insert、update、delete 语句同样可以。

我们建个产品表：
sql

```
CREATETABLEproduct(idINTPRIMARY KEY,nameVARCHAR(),priceDECIMAL(,),categoryVARCHAR(),stockINT);
```

直接用这个 sql 建就好了：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-11.png)

然后插入几条数据：
sql

```
INSERT INTOproduct (id,name, price, category, stock)VALUES(,'iPhone12',.,'手机',),(,'iPad Pro',.,'平板电脑',),(,'MacBook Pro',.,'笔记本电脑',),(,'AirPods Pro',.,'耳机',),(,'Apple Watch',.,'智能手表',);
```

选中 sql，点击执行：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-12.png)

然后查询下：
sql

```
select*fromproduct
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-13.png)

查询的时候，可以用子查询，这个我们前面试过。

比如查询价格最高的产品的信息：
sql

```
SELECTname, priceFROMproductWHEREprice=(SELECTMAX(price)FROMproduct);
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-14.png)

通过一个子查询查最高的价格，然后外层查询查价格为最高价格的产品。

除了 select 之外，增删改也是可以用子查询的。

比如我们把每个产品分类的分类名、平均价格查出来放入另一个 avg_price_by_category 表。

先创建这个表：
sql

```
CREATETABLEavg_price_by_category(idINTAUTO_INCREMENT,categoryVARCHAR()NOT NULL,avg_priceDECIMAL(,)NOT NULL,PRIMARY KEY(id));
```

id 为主键，自增。

category 为 VARCHAR(50)，非空。

avg_price 为 DECIMAL(10,2) 也就是一共 10 位，小数点后占 2 位的数字。

点击执行：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-15.png)

然后把 product 产品表里的分类和平均价格查出来插入这个表：
sql

```
INSERT INTOavg_price_by_category (category, avg_price)SELECTcategory,AVG(price)FROMproductGROUP BYcategory;
```

点击执行：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-16.png)

然后再查询现在的 avg_price_by_category 表：
sql

```
select*fromavg_price_by_category
```

可以看到，确实插入了数据：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-17.png)

这就是 insert + select 结合使用的场景。

update 同样也可以使用 select 子查询。

比如之前的 department 和 employee 表，我们想把技术部所有人的 name 前加上 “技术-”，就可以这么写：
sql

```
UPDATEemployeeSETname=CONCAT('技术-',name)WHEREdepartment_id=(SELECTidFROMdepartmentWHEREname='技术部');
```

查询名字等于技术部的 department 的 id，然后更新 department_id 为这个 id 的所有 employee 的名字为 CONCAT("技术-", name)。

执行这个 sql:

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-18.png)

可以看到技术部的员工的名字都改了：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-19.png)

接下来再试试 delete：

删除技术部所有的员工。

可以这么写：
sql

```
DELETEFROMemployeeWHEREdepartment_id=(SELECTidFROMdepartmentWHEREname='技术部');
```

执行一下：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-20.png)

然后再次查询：
sql

```
select*fromemployee;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/49-21.png)

可以看到技术部员工确实都没有了。

所以说，子查询在 select、insert、update、delete 里都可以用。

## 总结

sql 和 sql 可以组合来完成更复杂的功能，这种语法叫做子查询。

它还有个特有的关键字 EXISTS（和 NOT EXISTS），当子查询有返回结果的时候成立，没有返回结果的时候不成立。

子查询不止 select 可用，在 update、insert、delete 里也可以用。

灵活运用子查询，能写出功能更强大的 sql。
