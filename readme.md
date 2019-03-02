#sql-reader-params

Just pass params as object and return values and text for use in db client after

```
# content of example.sql
insert into users (pwd, myFields)
values ({{pwd}}, {{myFields}})
```
then in code
```
const sqlReader = require('sql-reader-params');
const regUserSql = sqlReader('./example.sql');

const values = regUserSql.paramsToValues({
    pwd: 'my-hash-pwd',
    myFields: 10
})
const text = regUserSql.getText();
```

what we have after?

```
values -> ['my-hash-pwd', 10]
text -> 
    insert into users (pwd, myFields)
    values ($1, $2)

```

then you can use it `value` and `text` in your own database client

that's all

licence: MIT, dudiq 2019

