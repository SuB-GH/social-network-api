const router = require('express').Router();
// instead of importing the entire object, we've destructured out just the object method names
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
    addFriend,
    removeFriend

} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
// this implements the object methods above into the routes. Also, the name of the controller method is the callback (in the parentheses) as a result of using req/res as parameters
router
    .route('/')
    .get(getAllUsers) //GET all users || this works: http://localhost:3001/api/users
    .post(createUser); //POST a new user, example below
//{
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }


// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById) //GET a single user by its _id and populated thought and friend data || http://localhost:3001/api/users/userId
    .put(updateUser) //PUT to update a user by its _id
    .delete(deleteUser); //DELETE to remove user by its _id

// router.route('/:userId/friends/:friendId')
//     .post(addFriend) //POST to add a new friend to a user's friend list
//     .delete(deleteFriend); //DELETE to remove a friend from a user's friend list

// add friend routes here

module.exports = router;