# 50. SQL 综合练习

前面我们把 select、update、insert、delete 的语法、函数、关联查询、子查询都过了一遍，sql 学的就差不多了。

这节我们来实战下，写一些复杂的 sql。

先创建个单独的数据库：
sql

```
createdatabasepractice
```

执行它：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-1.png)

点击刷新，就可以看到这个 database（也叫 schema）了：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-2.png)

执行 use practice 切换数据库：
sql

```
usepractice;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-3.png)

然后创建 3 个表：
sql

```
-- 创建 customers 表，用于存储客户信息CREATETABLEIFNOTEXISTS`customers`(`id`int()NOT NULLAUTO_INCREMENT COMMENT'客户ID，自增长',`name`varchar()NOT NULLCOMMENT'客户姓名，非空',PRIMARY KEY(`id`)) ENGINE=InnoDBDEFAULTCHARSET=utf8mb4 COMMENT='客户信息表';-- 创建 orders 表，用于存储订单信息CREATETABLEIFNOTEXISTS`orders`(`id`int()NOT NULLAUTO_INCREMENT COMMENT'订单ID，自增长',`customer_id`int()NOT NULLCOMMENT'客户ID，非空',`order_date`dateNOT NULLCOMMENT'订单日期，非空',`total_amount`decimal(,)NOT NULLCOMMENT'订单总金额，非空',PRIMARY KEY(`id`),FOREIGN KEY(`customer_id`)REFERENCES`customers`(`id`)ON DELETE CASCADEONUPDATECASCADE) ENGINE=InnoDBDEFAULTCHARSET=utf8mb4 COMMENT='订单信息表';-- 创建 order_items 表，用于存储订单商品信息CREATETABLEIFNOTEXISTS`order_items`(`id`int()NOT NULLAUTO_INCREMENT COMMENT'商品ID，自增长',`order_id`int()NOT NULLCOMMENT'订单ID，非空',`product_name`varchar()NOT NULLCOMMENT'商品名称，非空',`quantity`int()NOT NULLCOMMENT'商品数量，非空',`price`decimal(,)NOT NULLCOMMENT'商品单价，非空',PRIMARY KEY(`id`),FOREIGN KEY(`order_id`)REFERENCES`orders`(`id`)ON DELETE CASCADEONUPDATECASCADE) ENGINE=InnoDBDEFAULTCHARSET=utf8mb4 COMMENT='订单商品信息表';
```

分别是顾客、订单、订单项。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-4.png)

一个顾客有多个订单，一个订单有多个订单项，通过外键存储这种关联关系。

级联方式为 CASCADE。

上面还涉及到注释的语法，sql 里的注释用 -- 开头：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-5.png)

执行建表 sql:

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-6.png)

点击刷新，就可以看到这三个表了：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-7.png)

然后插入一些数据：
sql

```
-- 向 customers 表插入数据INSERT INTO`customers`(`name`)VALUES('张丽娜'),('李明'),('王磊'),('赵静'),('钱伟'),('孙芳'),('周涛'),('吴洋'),('郑红'),('刘华'),('陈明'),('杨丽'),('王磊'),('张伟'),('李娜'),('刘洋'),('陈静'),('杨阳'),('王丽'),('张强');-- 向 orders 表插入数据INSERT INTO`orders`(`customer_id`,`order_date`,`total_amount`)VALUES(,'2022-01-01',.),(,'2022-01-02',.),(,'2022-01-03',.),(,'2022-01-04',.),(,'2022-01-05',.),(,'2022-01-06',.),(,'2022-01-07',.),(,'2022-01-08',.),(,'2022-01-09',.),(,'2022-01-10',.);-- 向 order_items 表插入数据INSERT INTO`order_items`(`order_id`,`product_name`,`quantity`,`price`)VALUES(,'耐克篮球鞋',,.),(,'阿迪达斯跑步鞋',,.),(,'匡威帆布鞋',,.),(,'万斯板鞋',,.),(,'新百伦运动鞋',,.),(,'彪马休闲鞋',,.),(,'锐步经典鞋',,.),(,'亚瑟士运动鞋',,.),(,'帆布鞋',,.),(,'苹果手写笔',,.),(,'电脑包',,.),(,'苹果手机',,.),(,'苹果耳机',,.),(,'苹果平板',,.);
```

执行这些 sql：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-8.png)

然后查询下看看：
sql

```
select*fromcustomers
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-9.png)

sql

```
select*fromorders
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-10.png)

sql

```
select*fromorder_items
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-11.png)

顾客、订单、订单项三个表都成功插入了数据。

然后我们来实现下这些需求：

### 需求 1: 查询每个客户的订单总金额

客户的订单存在订单表里，可能有多个，这里需要 JOIN ON 关联两个表，然后用 GROUP BY 根据客户 id 分组，再通过 SUM 函数计算价格总和。
sql

```
SELECTcustomers.name,SUM(orders.total_amount)AStotal_amountFROMcustomersINNER JOINordersONcustomers.id=orders.customer_idGROUP BYcustomers.id;
```

这里的 INNER JOIN ON 也可以简化为 JOIN ON。

执行查询：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-12.png)

成功查出了每个客户的订单总金额。

我们还可以再加上排序：
sql

```
SELECTcustomers.name,SUM(orders.total_amount)AStotal_amountFROMcustomersINNER JOINordersONcustomers.id=orders.customer_idGROUP BYcustomers.idORDER BYtotal_amountDESC;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-13.png)

如果想取前 3 的，可以用 LIMIT：
sql

```
SELECTcustomers.name,SUM(orders.total_amount)AStotal_amountFROMcustomersJOINordersONcustomers.id=orders.customer_idGROUP BYcustomers.idORDER BYtotal_amountDESCLIMIT0,;
```

从第 0 个开始取 3 个：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-14.png)

### 需求 2: 查询每个客户的订单总金额，并计算其占比

每个客户的总金额的需求上面实现了，这里需要算占比，就需要通过一个子查询来计算全部订单的总金额，然后相除：
sql

```
SELECTcustomers.name,SUM(orders.total_amount)AStotal_amount,SUM(orders.total_amount)/(SELECTSUM(total_amount)FROMorders)ASpercentageFROMcustomersINNER JOINordersONcustomers.id=orders.customer_idGROUP BYcustomers.id;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-15.png)

当然，这里每次都算一遍总金额性能不好，可以先算出总金额，然后把数值传入。

这里只是练习子查询。

### 需求 3：查询每个客户的订单总金额，并列出每个订单的商品清单

这里在总金额的基础上，多了订单项的查询，需要多关联一个表：
sql

```
SELECTcustomers.name,orders.order_date,orders.total_amount,order_items.product_name,order_items.quantity,order_items.priceFROMcustomersJOINordersONcustomers.id=orders.customer_idJOINorder_itemsONorders.id=order_items.order_idORDER BYcustomers.name,orders.order_date;
```

内连接关联 3 个表，按照名字和下单日期排序。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-16.png)

### 需求 4：查询每个客户的订单总金额，并列出每个订单的商品清单，同时只显示客户名字姓“张”的客户的记录：

总金额和商品清单的需求前面实现了，这里只需要加一个 WHERE 来过滤客户名就行：
sql

```
SELECTcustomers.name,orders.order_date,orders.total_amount,order_items.product_name,order_items.quantity,order_items.priceFROMcustomersINNER JOINordersONcustomers.id=orders.customer_idINNER JOINorder_itemsONorders.id=order_items.order_idWHEREcustomers.nameLIKE'张%'ORDER BYcustomers.name,orders.order_date;
```

执行下：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-17.png)

### 需求 5:查询每个客户的订单总金额，并列出每个订单的商品清单，同时只显示订单日期在2022年1月1日到2022年1月3日之间的记录

这里比上面的需求只是多了日期的过滤，范围是一个区间，用 BETWEEN AND：
sql

```
SELECTcustomers.name,orders.order_date,orders.total_amount,order_items.product_name,order_items.quantity,order_items.priceFROMcustomersINNER JOINordersONcustomers.id=orders.customer_idINNER JOINorder_itemsONorders.id=order_items.order_idWHEREorders.order_dateBETWEEN'2022-01-01'AND'2022-01-03'ORDER BYcustomers.name,orders.order_date;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-18.png)

因为这里的 order_date 是 date 类型，所以指定范围也只是用 2022-01-01 这种格式的。如果是 datetime，那就要用 2022-01-01 10:10:00 这种格式了。

### 需求 6：查询每个客户的订单总金额，并计算商品数量，只包含商品名称包含“鞋”的商品，商品名用-连接，显示前 3 条记录：

查询订单总金额和商品数量都需要用 group by 根据 customer.id 分组，过滤出只包含鞋的商品。

把分组的多条商品名连接起来需要用 GROUP_CONCAT 函数。

然后 LIMIT 3
sql

```
SELECTc.nameAScustomer_name,SUM(o.total_amount)AStotal_amount,COUNT(oi.id)AStotal_quantity,GROUP_CONCAT(oi.product_nameSEPARATOR'-')ASproduct_namesFROMcustomers cJOINorders oONc.id=o.customer_idJOINorder_items oiONo.id=oi.order_idWHEREoi.product_nameLIKE'%鞋%'GROUP BYc.nameORDER BYtotal_amountDESCLIMIT3;
```

GROUP_CONCAT 函数是用于 group by 分组后，把多个值连接成一个字符串的。

LIMIT 3 就相当于 LIMIT 0,3 也就是从 0 开始 3 条记录：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-19.png)

## 需求 7: 查询存在订单的客户

这里使用子查询 + EXISTS 来实现：
sql

```
SELECT*FROMcustomers cWHEREEXISTS(SELECT1FROMorders oWHEREo.customer_id=c.id);
```

如果从 orders 表中查出了当前 customer 的订单记录，EXISTS 就成立。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-20.png)

当然，你也可以用 NO EXISTS 来查询没有下单过的客户：
sql

```
SELECT*FROMcustomers cWHERENOTEXISTS(SELECT1FROMorders oWHEREo.customer_id=c.id);
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-21.png)

## 需求 8: 将王磊的订单总金额打九折

现在王磊的订单总金额是这些：
sql

```
SELECT*FROMordersJOINcustomersONorders.customer_id=customers.idWHEREcustomers.name='王磊';
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-22.png)

更新它们为 90%：
sql

```
UPDATEorders oSETo.total_amount=o.total_amount*0.WHEREo.customer_idIN(SELECTidFROMcustomersWHEREname='王磊');
```

这里订单不止一条，所以用 IN 来指定一个集合。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-23.png)

再查询下：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/50-24.png)

确实减少了。

## 总结

这节我们创建了一个新的 database 并且新增了 customers、orders、order_items 表来练习 sql。

customers 和 orders、orders 和 order_items 都是一对多的关系。

我们练习了 JOIN ON、WHERE、ORDER BY、GROUP BY、LIMIT 等语法，也练习了 SUM、COUNT、GROUP_CONCAT 等函数。

还有子查询和 EXISTS。

sql 常用的语法也就这些，把这些掌握了就能完成各种需求了。
