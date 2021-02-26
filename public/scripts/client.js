$(document).ready(function() {
  // function loads tweets from the database
  const loadTweets = function() {
    const url = `http://localhost:8081/tweets`;
    console.log('run test');
    // get request
    $.ajax({
      url,
      method: 'GET',
    })
      .done((data) => {
        $("#tweet-text").empty();
        renderTweets(data);
      })
      //in case of a failure
      .fail((err) => {
        console.log('error message: ',err.message);
      })
      //confirms to console that tweet was sent
      .always(() => console.log('tweet was sent'));

    $(".tweet-box-form").on('submit', function(event) {
      event.preventDefault();
    });

    const tweetBox = $(this).children('input[type="submit"]');
    tweetBox.val('');
  };

  loadTweets();

  const seizeEnteredTweet = (message) => {
    const url = `http://localhost:8081/tweets`;

    //post request
    $.ajax({
      url,
      method: 'POST',
      data: message
    })
      .done((data) => {
        $("#tweet-text").empty();
        loadTweets();
        renderTweets(data);
      })
      // in case of a failure
      .fail((err) => {
        console.log('error message: ',err.message);
      })
      .always(() => console.log('tweet was sent'));

  };

  const tweetBox = $(this).children('input[type="submit"]');
  tweetBox.val('');

  $(".tweet-box-form").on('submit', function(event) {
    // will pop a message where the tweet has exceeded 140
    // characters.
    event.preventDefault();
    const message = $("#tweet-text").val();
    if (message.length > 0 && message.length <= 140) {
      seizeEnteredTweet($(".tweet-box-form").serialize());
    } else {
      $("#message-too-long-alert").slideDown();
      console.log('message too long');
    }
  });
 
});


const renderTweets = function(tweets) {
  //ads elements to container
  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    $('#tweet-container').prepend(element);
  }
};


const escape =  function(str) {
  // function targets and escapes
  // HTML characters such as <div> or <scritp>
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(record) {

  //parses a function and determines number of sec, min, hours etc.
  let printTime = howLongAgo(record.created_at);
  let printTimeString = `${printTime} ago`;

  //parses string through escape function
  let tweet = record.content.text;
  let checkedString = escape(tweet);

  //creates a new tweet with the given template format
  let $tweet = $(`<article class="tweet">
  <header class="tweet-header" >
  <div><img class="avatar" src="/images/avatar-512.webp"><h2>${record.user.name}</h2></div>
  <div class="handle">${record.user.handle}</div>
  </header>
    <div class="tweet-body">
      <p>${checkedString}</p>    
  </div>
  <footer class="tweet-footer">
      <div>  ${printTimeString}</div>
      <div> 
      <ul>
      <li>👍</li>
      <li>🏳</li>
      <li>✉️</li>
      </ul>
      </div>
  </footer>
</article>
`);
  return $tweet;
};


const howLongAgo = function(milliseconds) {
  // calculates how much time has passed since
  // a tweet was posted
  let seconds = Math.floor((new Date() - milliseconds) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
