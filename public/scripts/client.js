$(document).ready(function() {

  const loadTweets = function() {
    const url = `http://localhost:8081/tweets`;
    console.log('run test');
    $.ajax({
      url,
      method: 'GET',
    })
      .done((data) => {
  
        $("#tweet-text").empty();
        console.log('tweet text entered');
        console.log('data',data);
        renderTweets(data);
  
      })
      .fail((err) => {
        // fail case
        console.log('error message: ',err.message);
      })
      .always(() => console.log('tweet was sent'));

    $(".tweet-box-form").on('submit', function(event) {
      event.preventDefault();
      console.log(event.preventDefault());
    });
    

    const tweetBox = $(this).children('input[type="submit"]');
    // const message = tweetBox.val();
 
    tweetBox.val('');

  };
  console.log('run test2');

  loadTweets();


  const seizeEnteredTweet = (message) => {
    const url = `http://localhost:8081/tweets`;

    $.ajax({
      url,
      method: 'POST',
      data: message
    })
      .done((data) => {
  
        $("#tweet-text").empty();
        renderTweets(data);
  
      })
      .fail((err) => {
        // fail case
        console.log('error message: ',err.message);
      })
      .always(() => console.log('tweet was sent'));

  };

  $(".tweet-box-form").on('submit', function(event) {
    event.preventDefault();
    seizeEnteredTweet($(".tweet-box-form").serialize());
  });

  const tweetBox = $(this).children('input[type="submit"]');
  // const message = tweetBox.val();

  tweetBox.val('');
});


const renderTweets = function(tweets) {
  //ads elements to container
  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    $('#tweet-container').prepend(element);
  }
};

const createTweetElement = function(record) {
  //creates a new tweet with the given template format
  let $tweet = $(`<article class="tweet">
  <header class="tweet-header" >
  <div><img class="avatar" src="/images/avatar-512.webp"><h2>${record.user.name}</h2></div>
  <div class="handle">${record.user.handle}</div>
  </header>
    <div class="tweet-body">
      <p>${record.content.text}</p>    
  </div>
  <footer class="tweet-footer">
      <div>  ${record.created_at}</div>
      <div>  L R M </div>
  </footer>
</article>
`);
  return $tweet;
};

