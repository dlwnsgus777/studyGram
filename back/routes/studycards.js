const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const studys = await db.Studycard.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        },
        {
          model: db.Image
        }, {
          model: db.User,
          as: "Likers",
          attributes: ['id']
        }
      ],
      order: [["createdAt", "DESC"]],
      offset: parseInt(req.query.offset, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10
    });
    return res.json(studys);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
