const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../models");
const { loginCheck } = require("./middlewares");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext);
      done(null, base + Date.now() + ext);
    }
  }),
  limit: { fileSize: 30 * 1024 * 1024 }
});

router.post("/", loginCheck, async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const newStudy = await db.Studycard.create({
      content: req.body.content,
      UserId: req.user.id
    });
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: {
              name: tag.slice(1).toLowerCase()
            }
          })
        )
      );
      await newStudy.addHashtags(result.map(r => r[0]));
    }
    const fullStudy = await db.Studycard.findOne({
      where: { id: newStudy.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    return res.json(fullStudy);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/images", loginCheck, upload.array("image"), (req, res, next) => {
  res.json(req.files.map(v => v.filename));
});

router.post("/:id/comment", loginCheck, async (req, res, next) => {
  try {
    const study = await db.Studycard.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!study) {
      return res.status(404).send("게시글이 존재하지 않습니다.");
    }
    const newComment = await db.Comment.create({
      StudycardId: study.id,
      UserId: req.user.id,
      content: req.body.content
    });
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    return res.json(comment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const study = await db.Studycard.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!study) {
      return res.status(404).send("게시글이 존재하지 않습니다.");
    }
    const comments = await db.Comment.findAll({
      where: {
        StudycardId: req.params.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ],
      order: [["createdAt", "ASC"]]
    });
    return res.json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db.Studycard.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.send("삭제완료");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
