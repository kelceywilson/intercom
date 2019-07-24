(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  console.log("content_scripts");

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  // function insertBeast(beastURL) {
  //   removeExistingBeasts();
  //   let beastImage = document.createElement("img");
  //   beastImage.setAttribute("src", beastURL);
  //   beastImage.style.height = "100vh";
  //   beastImage.className = "beastify-image";
  //   document.body.appendChild(beastImage);
  // }

  /**
   * Remove every beast from the page.
   */
  // function removeExistingBeasts() {
  //   let existingBeasts = document.querySelectorAll(".beastify-image");
  //   for (let beast of existingBeasts) {
  //     beast.remove();
  //   }
  // }

  /**
   * Listen for messages from the background script.
   * Call "comment()" or "reset()".
   */
  browser.runtime.onMessage.addListener(message => {
    console.log("comment", message);
    if (message.command === "comment") {
      console.log("comment", message);
      // const request = new XMLHttpRequest();
      // request.open("POST", "http://localhost:3000/api/comments")
      fetch("http://localhost:3000/api/comments", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(message)
      })
        .then(response => response.json())
        .then(response2 => console.log(response2));
    } else if (message.command === "reset") {
      console.log("reset", message.command);
    }
  });
})();
