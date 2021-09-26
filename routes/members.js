const router = global.express.Router();
const members = global.mocks.members;
const jwtAuth = require('../middlewares/jwtAuth.js');

router.post('/login/', function (request, response) {
  const sql = `
    select * from members
    where name = ? and age = ?;
  `;
  db.query(sql, [request.body.name, request.body.age], function (error, rows) {
    if (!error || db.error(request, response, error)) {
      console.log(rows);
      if (rows.length) {
        jwtAuth.tokenCreate(request, response, request.body);
      } else {
        return response.status(403).json({
          message: '올바른 회원 정보를 찾지 못했습니다.'
        });
      }
    }
  });
});

router.get('/login/', jwtAuth.tokenCheck, function (request, response) {
  response.status(200).send({
    decoded: request.decoded
  });
});

router.post('/', function (request, response) {
  members.push(request.body);
  console.log('Done members post', members);
  // if (request.body.age < 10) {
  if (false) {
    response.status(400).send({
      result: 'age is under than 10'
    });
  } else {
    response.status(200).send({
      result: 'Created'
    });
  }
});

router.get('/', function (request, response) {
  console.log('Done members get', members);
  response.status(200).send({
    result: 'Readed',
    members: members
  });
});

router.patch('/', function (request, response) {
  members[request.body.index] = request.body.member;
  console.log('Done members patch', members);
  response.status(200).send({
    result: 'Updated'
  });
});

router.delete('/:index', function (request, response) {
  const index = Number(request.params.index);
  members.splice(index, 1);
  console.log('Done members delete', members);
  response.status(200).send({
    result: 'Deleted'
  });
});

module.exports = router;
