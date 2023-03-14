const models = require("../models");
const functions = require("./functions");

exports.createPost = (req, res) => {
  // Getting auth header
  let userInfos = functions.getInfosUserFromToken(req, res);

  if (userInfos.userId < 0) {
    return res.status(400).json({ error: "Wrong token" });
  }

  // Params
  let content = req.body.content;
  let imageUrl = req.body && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

  if (content == null) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (content.length <= 4) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  models.User.findOne({
    where: { id: userInfos.userId },
  })
    .then((user) => {
      if (user) {
        models.Post.create({
          content: content,
          imageUrl: imageUrl,
          likes: 0,
          UserId: user.id,
          
        })
          .then((newPost) => {
            if (newPost) {
              return res.status(201).json({ Post: "Post posted !" });
            } else {
              return res.status(500).json({ error: "Cannot post post" });
            }
          })
          .catch((error) => {
            return res.status(500).json({ error: "Internal error" });
          });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: "Unable to verify user" });
    });
};

exports.getAllPosts = (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  //console.log(page);

  const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, posts, totalPages, currentPage };
  };

  let fields = req.query.fields;
  // let limit = parseInt(req.query.size);
  // let offset = parseInt(req.query.page * req.query.size);
  // let limit = parseInt(req.query.limit);
  // let offset = parseInt(req.query.offset);
  let order = req.query.order;
  const { limit, offset } = getPagination(page, size);

  models.Post.findAndCountAll({
    order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    limit: !isNaN(limit) ? limit : 5,
    offset: !isNaN(offset) ? offset : 0,
    include: [
      {
        model: models.User,
        attributes: ["name", "surname", "id", "profilePic"],
      },
    ],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((error) => res.status(404).json(error));
  // .then((posts) => {
  //   if (posts.length > 0) {
  //     res.status(200).json(posts);
  //   } else {
  //     res.status(404).json(posts);
  //   }
  // });
};

exports.getUserAllPosts = (req, res) => {
  let userInfos = functions.getInfosUserFromToken(req, res);
  let CurrentUserId = req.params.id;
  let fields = req.query.fields;
  // let limit = parseInt(req.query.limit);
  // let offset = parseInt(req.query.offset);
  let order = req.query.order;

  const page = req.query.page;
  const size = req.query.size;
  //console.log(page);

  const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, posts, totalPages, currentPage };
  };
  const { limit, offset } = getPagination(page, size);

  models.Post.findAndCountAll({
    where: { userId: CurrentUserId },
    order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
    attributes: fields !== "*" && fields != null ? fields.split(",") : null,
    limit: !isNaN(limit) ? limit : 5,
    offset: !isNaN(offset) ? offset : 0,
    include: [
      {
        model: models.User,
        attributes: ["name", "surname", "id", "profilePic"],
      },
    ],
  }).then((data) => {
    const response = getPagingData(data, page, limit);
    console.log(response.posts.length);
    if (
      (response.posts.length > 0 &&
        response.posts[0].dataValues.UserId === userInfos.userId) ||
      userInfos.admin === true
    ) {
      for (index = 0; index < response.posts.length; index++) {
        response.posts[index].dataValues.canEdit = true;
      }
      res.send(response);
    } else if (response.totalItems > 0) {
      res.send(response);
    } else {
      res.status(404).json({ error: "No posts found" });
    }
  });
};

exports.getOnePost = (req, res) => {
  let userInfos = functions.getInfosUserFromToken(req, res);
  let postId = req.params.id;

  models.Post.findOne({
    where: { id: postId },
    include: [
      {
        model: models.User,
        attributes: ["name", "surname", "id", "profilePic"],
      },
    ],
  })
    .then((posts) => {
      //console.log(posts.dataValues)
      //console.log(posts.length);

      if (
        (posts && posts.UserId === userInfos.userId) ||
        userInfos.admin === true
      ) {
        // Add an edition value to true
        posts.dataValues.canEdit = true;
        //console.log(posts);
        res.status(200).json(posts);
      } else if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).send({ error: "Post not found" });
      }
    })
    .catch((error) => {
      return res.status(404).json({ error: "Post not found" });
    });
};
exports.likePost = (req, res) => {
  // Getting auth header
  let userInfos = functions.getInfosUserFromToken(req, res);

  if (userInfos.userId < 0) {
    return res.status(400).json({ error: "Wrong token" });
  }

  // Params
  let postId = req.params.id;

  models.Post.findOne({
    where: { id: postId },
  })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      models.Like.findOne({
        where: { userId: userInfos.userId, postId: postId },
      })
        .then((like) => {
          if (!like) {
            models.Like.create({
              userId: userInfos.userId,
              postId: postId,
            })
              .then(() => {
                post.increment("likes").then(() => {
                  res.status(200).json({ message: "Post liked" });
                });
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: "Internal error" });
              });
          } else {
            models.Like.destroy({
              where: { userId: userInfos.userId, postId: postId },
            })
              .then(() => {
                post.decrement("likes").then(() => {
                  res.status(200).json({ message: "Post unliked" });
                });
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: "Internal error" });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: "Internal error" });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Internal error" });
    });
};
exports.deletePost = (req, res) => {
  let userInfos = functions.getInfosUserFromToken(req, res);
  let postId = req.params.id;
  console.log(postId);

  models.Post.findOne({
    where: { id: postId },
    include: [
      {
        model: models.User,
        attributes: ["name", "surname", "id"],
      },
    ],
  })
    .then((posts) => {
      //console.log(posts.dataValues)

      if (
        (posts && posts.UserId === userInfos.userId) ||
        userInfos.admin === true
      ) {
        models.Post.destroy({
          where: { id: postId },
          include: [
            {
              model: models.User,
              attributes: ["name", "surname", "id"],
            },
          ],
        })
          .then(() => {
            res.status(200).json({ post: "Objet supprimé !" });
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      return res.status(404).json({ error: error });
    });
};