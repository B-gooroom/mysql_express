const router = global.express.Router();
const db = global.db;

router.post('/', function (request, response) {
  const sql = `
    insert into groceries(member_pk, name, enter, expire)
    values (
      1,
      ?,
      date_format(now(), '%Y-%m-%d'),
      date_format(date_add(now(), interval + 2 week), '%Y-%m-%d')
    );
  `;
  db.query(sql, [request.body.name], function (error, rows) {
    if (!error || db.error(request, response, error)) {
      console.log('Done groceries post', rows);
      response.status(200).send({
        result: 'Created'
      });
    }
  });
});

router.get('/', function (request, response) {
  const orderName = request.query.orderName || 'name';
  const orderType = request.query.orderType || 'asc';
  const sql = `
    select * from groceries
    where member_pk = 1
    order by ${orderName} ${orderType};
  `;
  db.query(sql, [orderName, orderType], function (error, rows) {
    if (!error || db.error(request, response, error)) {
      console.log('Done groceries get', rows);
      response.status(200).send({
        result: 'Readed',
        groceries: rows
      });
    }
  });
});

router.patch('/:grocery_pk', function (request, response) {
  const sql = `
    update groceries
    set expire = ?
    where grocery_pk = ? and member_pk = 1;
  `;
  db.query(sql, [request.body.expire, request.params.grocery_pk], function (error, rows) {
    if (!error || db.error(request, response, error)) {
      console.log('Done groceries patch', rows);
      response.status(200).send({
        result: 'Updated'
      });
    }
  });
});

router.delete('/:grocery_pk', function (request, response) {
  const sql = `
    delete from groceries
    where grocery_pk = ? and member_pk = 1;
  `;
  db.query(sql, [request.params.grocery_pk], function (error, rows) {
    if (!error || db.error(request, response, error)) {
      console.log('Done groceries delete', rows);
      response.status(200).send({
        result: 'Deleted'
      });
    }
  });
});

module.exports = router;
