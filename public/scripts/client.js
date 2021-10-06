/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: timeago.format(1461116232227)
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

//const $timePassed = timeago.format(new Date());

const createTweetElement = (data) => {
  let tweet = data.content.text;
  return $(`<article class="tweet">${tweet}</article>`);
};

const renderTweets = (array) => {
  array.forEach((tweetObject) => {
    let $tweet = createTweetElement(tweetObject);
    $(".tweet-container").append($tweet);
  });
};

//renderTweets(data);

$("form").submit(function (event) {
  event.preventDefault();
  let $formInfo = $(this).serialize();
  $.ajax({
    url: "http://localhost:8080/tweets/",
    method: "POST",
    data: $formInfo,
    //success: () => console.log($formInfo)
  });
});

const loadTweets = () => {
  $.ajax({
    url: "http://localhost:8080/tweets/",
    method: 'GET'
  })
  .then((result) => {renderTweets(result)})
  .catch((error) => {})
}
