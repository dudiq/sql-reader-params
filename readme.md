#sql-reader-params

Just pass params as object and return values and text for use in db client after

```
# content of example.sql
insert into users (pwd, myFields)
values ({{pwd}}, {{myFieldsVar}})
```
then in code
```
const sqlReader = require('sql-reader-params').default;
const sqlAsParams = sqlReader('./example.sql');

const values = sqlAsParams.paramsToValues({
    pwd: 'my-hash-pwd',
    myFieldsVar: 10
})
const text = sqlAsParams.getText();
```

what we have after?

```
values -> ['my-hash-pwd', 10]
text -> 
    insert into users (pwd, myFields)
    values ($1, $2)

```

then you can use it `values` and `text` in your own database client

that's all folks

licence: MIT, dudiq 2019

