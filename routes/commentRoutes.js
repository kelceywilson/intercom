const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const commentEmailTemplate = require("../services/emailTemplates/commentEmailTemplate");
const Comment = mongoose.model("comments");

function getComments(userId) {
  return Comment.find({ _user: userId }).select({
    recipients: false
  });
}

module.exports = app => {
  app.get("/api/comments/:commentId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.get("/api/comments", requireLogin, async (req, res) => {
    // const comments = await Comment.find({ _user: req.user._id }).select({
    //   recipients: false
    // });
    const comments = await getComments(req.user._id);
    res.send(comments);
  });

  app.post("/api/comments/webhooks", (req, res) => {
    console.log(req.body);
    const p = new Path("/api/comments/:commentId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, commentId: match.commentId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "commentId")
      .each(({ commentId, email, choice }) => {
        Comment.updateOne(
          {
            _id: commentId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/comments", requireLogin, requireCredits, async (req, res) => {
    console.log("post comment", req.body);

    const { body, title, recipients, url } = req.body;
    const comment = new Comment({
      title,
      body,
      url,
      subject: "fake subject",
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      date: Date.now()
    });
    console.log("new comment", comment);

    const mailer = new Mailer(comment, commentEmailTemplate(comment));

    try {
      await mailer.send();
      await comment.save();
      req.user.credits -= 1;

      const user = await req.user.save();
      console.log("user commented", user);

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete("/api/comments", requireLogin, async (req, res) => {
    console.log("delete comment route", req.body);

    Comment.findByIdAndRemove(req.body.id).exec();
    console.log(`comment ${req.body.id} deleted`);
    const comments = await getComments(req.user._id);
    // console.log("new comment list", comments);

    res.send(comments);
  });
};
