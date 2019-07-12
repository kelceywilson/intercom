const keys = require("../../config/keys");

module.exports = comment => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Thanks for your comment!</h3>
          <p>Here it is:</p>
          <p>${comment.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/comments/${
    comment.id
  }/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/comments/${
    comment.id
  }/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
