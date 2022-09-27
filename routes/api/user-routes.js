const router = require('express').Router();
// instead of importing the entire object, we've destructured out just the object method names
const {
    // add methods here
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
// this implements the object methods above into the routes. Also, the name of the controller method is the callback (in the parentheses) as a result of using req/res as parameters
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;