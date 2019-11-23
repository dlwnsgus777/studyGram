const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/:tag", async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
        }
      };
    }
    const studys = await db.Studycard.findAll({
      where,
      include: [
        {
          model: db.Hashtag,
          where: {
            name: decodeURIComponent(req.params.tag)
          }
        },
        {
          model: db.User,
          attributes: ["id", "nickname"]
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          as: "Likers",
          attributes: ["id"]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(req.query.limit, 10) || 10
    });
    return res.json(studys);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
