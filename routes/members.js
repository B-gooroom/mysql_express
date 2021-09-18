const router = global.express.Router();
const members = global.mocks.members;

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
