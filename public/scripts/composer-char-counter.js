$(document).ready(function () {
  $("#tweet-text").on("input", function (event) {
    const $inputText = $(event.target).closest("section");
    const $text = $inputText.find("#tweet-text");
    const $counter = $inputText.find(".counter");

    let charsCount = $text.val().length;
    $counter.html(140 - charsCount);

    if (charsCount <= 140) {
      $counter.removeClass("off-limit-text");
    } else {
      $counter.addClass("off-limit-text");
    }
  })
})