// Format user data returned
const formatUser = (user) => {
    user_copy = { ...user };
    data = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username
    }
    return data;
}

module.exports = { formatUser }