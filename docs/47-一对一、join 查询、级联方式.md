# 47. 一对一、join 查询、级联方式

数据库中会有很多的表，分别存储不同的信息，比如学生表存学生的信息、老师表存老师的信息，班级表存班级的信息。

这些表之间不是孤立的，有着一定的关系。

比如班级和学生之间是一对多的关系，也就是一个班级可以有多个学生。

班级和老师之间是多对多的关系，也就是一个班级可以有多个老师，一个老师也可以教多个班级。

如果存储一对一、一对多、多对多这些关系呢？

这就涉及到外键了。

比如一对一的关系，一个用户只能有一个身份证。

这样两个表，分别存储用户信息，还有身份证信息：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-1.png)

它们之间是一对一的关系，这时就可以用外键来表示。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-2.png)

user 表的主键是 id、可以通过 id 来唯一标识一个 user。

那 id_card 想查找 user，自然也是通过 id 来查找，多一个列来存储 user id 就可以实现这种一对一的关联。

这个 user_id 的列就是外键。

user 表叫主表，使用外键引用它的 id_card 表是从表。

我们建个表来试试看：

选中 hello-mysql 数据库，点击建表按钮：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-3.png)

分别添加 id、name 列：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-4.png)

点击 apply，建表 sql 如下：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-5.png)

你也可以直接用这个 sql 来建表：
sql

```
CREATETABLE`hello-mysql`.`user`(`id`INTNOT NULLAUTO_INCREMENT COMMENT'id',`name`VARCHAR()NOT NULLCOMMENT'名字',PRIMARY KEY(`id`));
```

然后再建个 id_card 表：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-6.png)

id 为 INT 类型，设置 primary key、not null 的约束，然后设置 auto increment。

card_name 为 VARCHAR(45) 类型，设置 not null 的约束

user_id 为 INT 类型。

然后添加外键：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-7.png)

指定外键 user_id 关联 user 表的 id。

这里还要选择主表数据 update 或者 delete 的时候，从表怎么办：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-8.png)

我们先用默认的。

点击 apply，生成的建表 sql 是这样的：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-9.png)

sql

```
CREATETABLE`id_card` (`id`intNOT NULLAUTO_INCREMENT COMMENT'id',`card_name`varchar()NOT NULLCOMMENT'身份证号',`user_id`intDEFAULTNULLCOMMENT'用户 id',PRIMARY KEY(`id`),INDEX`card_id_idx`(`user_id`),CONSTRAINT`user_id`FOREIGN KEY(`user_id`)REFERENCES`user`(`id`)) CHARSET=utf8mb4
```

**这些建表 sql 的语法了解即可，一般不会自己写。**

前面的三行都比较好理解，就是指定每一列的类型、约束、注释。

PRIMARY KEY 是指定 id 为主键。

INDEX 是建立索引，索引名是 card_id_idex，这个是用于加速 user_id 的访问的。

CONSTRINT user_id FOREIGN KEY 是给 user_id 添加一个外键约束，然后 user_id REFERENCES user id 则是指定 user_id 引用这 user 表的 id 列。

然后就可以看到 user 和 id_card 表了：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-10.png)

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-11.png)

我们插入几条数据：
sql

```
INSERT INTO`user`(`name`)VALUES('张三'),('李四'),('王五'),('赵六'),('孙七'),('周八'),('吴九'),('郑十'),('钱十一'),('陈十二');
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-12.png)

查询一下：
sql

```
SELECT*FROMuser;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-13.png)

用户表数据成功插入了。

再插入 id_card 表的数据：
sql

```
INSERT INTOid_card (card_name, user_id)VALUES('110101199001011234',),('310101199002022345',),('440101199003033456',),('440301199004044567',),('510101199005055678',),('330101199006066789',),('320101199007077890',),('500101199008088901',),('420101199009099012',),('610101199010101023',);
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-14.png)

查询一下：
sql

```
SELECT*FROMid_card;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-15.png)

这样，一对一关系的数据就插入成功了。

那怎么关联查出来呢？

这样：
sql

```
SELECT*FROMuserJOINid_cardONuser.id=id_card.user_id;
```

这里用到了 JOIN ON，也就是连接 user 和 id_card 表，关联方式是 user.id = id_card.user_id，也就是 id_card 表中的外键关联 user 表的主键。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-16.png)

点击左上角按钮，新建一条 sql：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-17.png)

查询的结果是这样的：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-18.png)

这里的两个 id 分别是 user 和 card 的 id，而且后面的 user_id 也没必要展示。

我们改下 sql：
sql

```
SELECTuser.id,name,id_card.idascard_id, card_nameFROMuserJOINid_cardONuser.id=id_card.user_id;
```

指定显示的列，并给 id_card 表的 id 起个 card_id 的别名。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-19.png)

这就是多表关联查询，语法是 JOIN ON。

有同学可能问了，那如果 id_card 表里有的没有关联 user 呢？

比如这样：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-20.png)

选中单元格，点击 delete 就可以把它置为 null。

我们把 id_card 表的最后两条记录的 user_id 删掉，点击 apply。

这时候再执行上面那条 sql 来查询，就可以看到少了两条记录：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-21.png)

因为 JOIN ON 其实默认是 INNER JOIN ON，相当于这么写：
sql

```
SELECTuser.id,name,id_card.idascard_id, card_nameFROMuserINNER JOINid_cardONuser.id=id_card.user_id;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-22.png)

INNER JOIN 是只返回两个表中能关联上的数据。

你还可以指定其余 2 种 join 类型：

LEFT JOIN 是额外返回左表中没有关联上的数据。

RIGHT JOIN 是额外返回右表中没有关联上的数据。

**在 FROM 后的是左表，JOIN 后的表是右表。**

我们来试一下：
sql

```
SELECTuser.id,name,id_card.idascard_id, card_nameFROMuserRIGHT JOINid_cardONuser.id=id_card.user_id;
```

当使用 RIGHT JOIN 时，会额外返回右表中没有关联的数据：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-23.png)

可以看到返回了所有 id_card 的数据，没有关联 user 的记录 user 信息为 null。

当时用 LEFT JOIN 时，正好相反：
sql

```
SELECTuser.id,name,id_card.idascard_id, card_nameFROMuserLEFT JOINid_cardONuser.id=id_card.user_id;
```

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-24.png)

一般情况，还是用默认的 JOIN ON 比较多，也就是 INNER JOIN。

前面还讲到了删除和更新时的级联操作。

也就是当 user 删除的时候，关联的 id_card 要不要删除？

当 user 的 id 修改的时候，关联的 id_card 要不要改 user_id？

我们之前设置的是默认的 RESTICT：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-25.png)

其实可选的值有 4 种：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-26.png)

- 

CASCADE： 主表主键更新，从表关联记录的外键跟着更新，主表记录删除，从表关联记录删除

- 

SET NULL：主表主键更新或者主表记录删除，从表关联记录的外键设置为 null

- 

RESTRICT：只有没有从表的关联记录时，才允许删除主表记录或者更新主表记录的主键 id

- 

NO ACTION： 同 RESTRICT，只是 sql 标准里分了 4 种，但 mysql 里 NO ACTION 等同于 RESTRICT。

这里不理解不要紧，我们试一下：

现在 user 表是这样的：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-27.png)

右键选择 delete row：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-28.png)

这时候会提示你更新失败，因为有外键的约束。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-29.png)

点击 revert，回到之前的状态：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-30.png)

然后更新 id 为 11，点击 apply：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-31.png)

同样会提示你更新失败，因为有外键的约束：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-32.png)

这就是**RESTIRCT 和 NO ACTION 的处理逻辑：只要从表有关联记录，就不能更新 id 或者删除记录。**

我们手动把从表记录的关联去掉，也就是删除第一条记录的外键（按 delete 键）：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-33.png)

点击 apply 应用这次改动。

然后再试下主表的更新：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-34.png)

这次就更新成功了！

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-35.png)

再来试下删除：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-36.png)

同样也成功了：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-37.png)

这就是 RESTRICT 或者 NO ACTION，只有当从表没有关联的记录的时候，才能更新主表记录的 id 或者删除它。

我们再来试试 CASCADE：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-38.png)

修改外键级联方式为 CASCADE，点击 apply。

先看一下现在 id_card 表的数据：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-39.png)

把 id 为 2 的 user 的 id 改为 22，点击 apply：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-40.png)

再看下 id_card 表的数据，你会发现 user_id 跟着改了。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-41.png)

然后把 id 为 22 的 user 删除掉，点击 apply：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-42.png)

再看下 id_card 表会发现那条 user_id 为 22 的记录也没了。

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-43.png)

这就是级联方式为**CASCADE 的处理逻辑：主表删除，从表关联记录也级联删除，主表 id 更新，从表关联记录也跟着更新。**

然后再试下 set null：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-44.png)

修改之后点击 apply。

查询下现在的 id_card 表的数据：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-45.png)

把 user 表中 id 为 5 的记录 id 改为 55，点击 apply：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-46.png)

这时候 id_card 中那条记录的外键被置为 null 了：

![](https://vercel-nestjs.oss-cn-beijing.aliyuncs.com/nest-docs/image/47-47.png)

这就是**set null 的处理逻辑：主表记录删除或者修改 id，从表关联记录外键置为 null。**

## 总结

这节我们学习了一对一的数据表设计，在从表里通过外键来关联主表的主键。

查询的时候需要使用 join on，默认是 inner join 也就是只返回有关联的记录，也可以用 left join、right join 来额外返回没有关联记录的左表或右表的记录。

from 后的是左表，join 后的是右表。

此外，外键还可以设置级联方式，也就是主表修改 id 或者删除的时候，从表怎么做。

有 3 种级联方式：CASCADE（关联删除或更新），SET NULL（关联外键设置为 null），RESTRICT 或者 NO ACTION（没有从表的关联记录才可以删除或更新）

多表的连接是非常常用的操作，下节我们继续学习一对多和多对多的数据表设计。
