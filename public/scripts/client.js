/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  /*
   * Function to create a new tweet box every time a user creates a tweet.
   */

  const createTweetElement = function (data) {
    let $userName = data.user.name;
    let $handle = data.user.handle;
    let $avatar = data.user.avatars;
    let $text = data.content.text;
    let $time = timeago.format(data.created_at);
    let $tweetBox = $(`<div class="single-tweetbox"></div>`);
    let $header = $(`<header class="list-name">
                      <div>${$handle}</div>
                    </header>`);
    let $nameAvatar = $(`<div class="name-avatar"></div>`);
    let image = $(`<img width="40px" alt="avatar" />`);
    image.attr("src", $avatar);
    $nameAvatar.append(image).append($(`<div>&nbsp;&nbsp;${$userName}</div>`));
    $header.prepend($nameAvatar);
    let $tweet = $("<article>").text($text).css("word-break", "break-all");
    let $footer = $(`<footer>
                    <div>
                      <div id="time">${$time}</div>
                      <div class="icons">
                        <i class="fa-solid fa-flag"></i>
                        <i class="fa-solid fa-retweet"></i>
                        <i class="fa-solid fa-heart"></i>
                      </div>
                    </div>
                  </footer>`);
    return $tweetBox.append($header).append($tweet).append($footer);
  };

  /*
   * Function to add the created tweet box to the tweets container
   */

  const renderTweets = (array) => {
    array.forEach((tweetObject) => {
      let $tweet = createTweetElement(tweetObject);
      $(".tweet-container").append($tweet);
    });
  };

  /*
   * Event handling for submit button + check for apt tweetlength
   * else error message show-up
   */

  $("form").submit(function (event) {
    event.preventDefault();
    let $tweetLength = $("#tweet-text").val().length;
    if ($tweetLength === 0) {
      $("#error").slideDown("slow", () => {
        $("#error").html(
          `<i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;Tweet cannot be blank!`
        );
        $("#error").show();
      });
      return;
    }
    if ($tweetLength > 140) {
      $("#error").slideDown("slow", () => {
        $("#error").html(
          `<i class="fa-solid fa-circle-xmark"></i>&nbsp;&nbsp;Tweet is too long!`
        );
        $("#error").show();
      });
      return;
    }
    // create query string
    let $formInfo = $(this).serialize();

    // ajax post request
    $.ajax({
      url: "http://localhost:8080/tweets/",
      method: "POST",
      data: $formInfo,
      success: () => {
        $("#tweet-text").val("");
        $(".counter").val(140);

        //function call to get  and load the refreshed content of /tweets/ page
        //without need to refresh
        loadTweets();
      }
    });
  });
  /*
   * Function to load the list of tweet boxes on the main page
   * without the need to refresh and in a sorted manner
   */
  const loadTweets = () => {
    $("#error").slideUp("slow");
    $.ajax({
      url: "http://localhost:8080/tweets/",
      method: "GET"
    })
      .then((result) => {
        result.sort((a, b) => b.created_at - a.created_at);
        $(".tweet-container").empty();
        renderTweets(result);
      })
      .catch((error) => {
        console.log("Error fetching tweets", error);
      });
  };
  loadTweets();
});
