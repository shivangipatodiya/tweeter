/*
 * This shows changing count of characters while writing a tweet
 */

$(document).ready(function () {
  $("#tweet-text").keyup(function (e) {
    let count = $(this).val().length;
    let counterDiv = $(this).next().children("output.counter");
    let remainingLetters = 140 - count;
    counterDiv.val(remainingLetters);
    if (remainingLetters >= 0) {
      counterDiv.css("color", "#545149");
    } else if (remainingLetters < 0) {
      counterDiv.css("color", "red");
    }
  });
});
