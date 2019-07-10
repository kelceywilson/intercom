const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const commentEmailTemplate = require("../services/emailTemplates/commentEmailTemplate");
const Comment = mongoose.model("comments");

module.exports = app => {
  app.post("/api/comments", requireLogin, requireCredits, async (req, res) => {
    const { body, title, subject, recipients } = req.body;
    // console.log(recipients.split(",").map(email => ({ email: email.trim() })));
    // const to = recipients.split(",").map(email => ({ email: email.trim() }));
    const comment = new Comment({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      date: Date.now()
    });

    const mailer = new Mailer(comment, commentEmailTemplate(comment));

    try {
      await mailer.send();
      await comment.save();
      req.user.credits -= 1;

      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
