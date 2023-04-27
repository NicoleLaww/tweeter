/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

//creates tweetbox template
  const createTweetElement = (tweet) => {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    return `
    <div class="tweet-container">
      <header class="tweet-header"> 
        <span class="left-tweet-container"> 
          <img class="userImg" src=${tweet.user.avatars}/>
          <span class="userName">
            ${tweet.user.name}
          </span> 
        </span>
        <span class="userId"> 
          ${tweet.user.handle}
        </span>
      </header>
      <p class="tweetInfo">
        ${escape(tweet.content.text)}
      </p>
      <footer class="tweet-footer">
        <span class="date">
          ${timeago.format(tweet.created_at)}
        </span>
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </div>
  `;
  };
  const tweetsContainer = $(".tweets-container");

//creates tweet box for each tweet
  const renderTweets = (data) => {
    tweetsContainer.empty();
    data.reverse();
    data.forEach((tweet) => {
      tweetsContainer.append(createTweetElement(tweet));
    });
  };

  const textArea = $("#tweet-text");

//function that submits new tweet to /tweets
  const submitNewTweet = (textArea) => {
    const config = {
      method: "POST",
      url: "/tweets",
      data: textArea.serialize(),
      success: (tweet) => {
        console.log("Successfully submitted", tweet);
        loadTweets();
        textArea.val("");

      },
      error: (error) => {
        console.log("Error", error);
      },
    };
    $.ajax(config);
  };

//error message
  const createErrorMessage = (message) => {
    return `
      <p class="error">
        <i class="fa-solid fa-triangle-exclamation"></i></span>
        <span class="message">${message}</span>
        <i class="fa-solid fa-triangle-exclamation"></i>
      </p>
    `;
  };

//submit new tweet
  $("form").submit((event) => {
    event.preventDefault();
    if (textArea.val() === null || textArea.val() === "") {
      const errorMsg = createErrorMessage("Invalid submission");
      $(".errorContainer").html(errorMsg).slideDown();
    } else if (textArea.val().length > 140) {
      const errorMsg = createErrorMessage("Invalid submission. Please try again.");
      $(".errorContainer").html(errorMsg).slideDown();
    } else if (textArea.val().trim() === "") {
      const errorMsg = createErrorMessage("Invalid. Too many white spaces.");
      $(".errorContainer").html(errorMsg).slideDown();
    } else {
      $(".errorContainer").hide();
      submitNewTweet(textArea);
      $(".counter").val(140);
    }
  });

//function that gets all the tweets and renders them into the little boxes
  const loadTweets = () => {
    const config = {
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        console.log("Successfully retrieved", tweets);
        renderTweets(tweets);
      },
      error: (error) => {
        console.log("Error", error);
      },
    };
    $.ajax(config);
  };

//preloads the existing tweets
  loadTweets();
  console.log(Date.now());

});