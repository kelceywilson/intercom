/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
// const hidePage = `body > :not(.beastify-image) {
//   display: none;
// }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", e => {
    console.log("click event:", e);

    function logTabs(tabs) {
      for (let tab of tabs) {
        // tab.url requires the `tabs` permission
        console.log(tab.url);
      }
    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    // function beastNameToURL(beastName) {
    //   switch (beastName) {
    //     case "Frog":
    //       return browser.extension.getURL("beasts/frog.jpg");
    //     case "Snake":
    //       return browser.extension.getURL("beasts/snake.jpg");
    //     case "Turtle":
    //       return browser.extension.getURL("beasts/turtle.jpg");
    //   }
    // }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function beastify(tabs) {
      // const url = await browser.tabs.getCurrent();
      // console.log(url);
      browser.tabs
        .query({ currentWindow: true, active: true })
        .then(querying => {
          console.log(querying);
          const values = {
            command: "comment",
            url: querying[0].url,
            title: querying[0].title,
            body: "intercom",
            recipients: "kelceywilson@gmail.com",
            _user: "5d0007279870315656bed3b6"
          };

          browser.tabs.sendMessage(tabs[0].id, values);
        });
    }
    // function beastify(tabs) {
    //   // const url = await browser.tabs.getCurrent();
    //   // console.log(url);
    //   browser.tabs
    //     .query({ currentWindow: true, active: true })
    //     .then(querying => {
    //       console.log(querying);
    //       const values = {
    //         command: "comment",
    //         url: querying[0].url,
    //         title: querying[0].title,
    //         body: "intercom",
    //         _user: "5d0007279870315656bed3b6"
    //       };
    //       axios.post("http://localhost:3000/api/comments", values);
    //     })
    //     .then(response => {
    //       browser.tabs.sendMessage(tabs[0].id, response);
    //     });

    //   // browser.tabs.sendMessage(tabs[0].id, {
    //   //   command: "comment",
    //   //   url: querying[0].url,
    //   //   title: querying[0].title,
    //   //   _user: "5d0007279870315656bed3b6"
    //   // });
    //   // });
    // }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset"
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not comment: ${error}`);
    }

    function postComment(comment) {
      console.log(comment);
    }
    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("beast")) {
      console.log("click event:", e);

      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(beastify)
        .catch(reportError);
    } else if (e.target.classList.contains("reset")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute Intercom content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/intercom.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
