const BaseController = require('./base.controller');
const Post = require('../models/post.model');
const CustomError = require('../middleware/error/customError');

class PostController extends BaseController {
    constructor() {
      super(Post);
    }
}

module.exports = new PostController();