/* eslint-disable no-undef */
/*
  TODO
  Fetch 2 user's github data and display their profiles side by side
  If there is an error in finding user or both users, display appropriate error
  message stating which user(s) doesn't exist

  It is up to the student to choose how to determine a 'winner'
  and displaying their profile/stats comparison in a way that signifies who won.
 */

 $('form').submit(() => {
   const username1 = $('.left-input').val()
   const username2 = $('.right-input').val()
   console.log(`examining ${username1}`)
   console.log(`examining ${username2}`)
   let followers1 = 0
   let followers2 = 0

   // Fetch data for given user
   // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
   fetch(`${USER_URL}/${username1}`)
     .then(response => response.json()) // Returns parsed json data from response body as promise
     .then(data => {
       console.log(`Got data for ${username1}`)
       console.log(data);
       $(".left .username").html(data.username);
       $(".left .full-name").html(data.name);
       $(".left .location").html(data.location);
       $(".left .bio").html(data.bio);
       const $image = $('<div>').append('<img src= "' + data.avatar + '">')
       $image.addClass('avatar')
       $('.image-left').append($image)
       $(".left .titles").html(data.tags);
       $(".left .favorite-language").html(data.favLanguage);
       $(".left .total-stars").html(data.largeStar);
       $(".left .highest-starred").html(data.mostStarred);
       $(".left .public-repos").html(data.repsNum);
       $(".left .perfect-repos").html(data.perfected);
       $(".left .followers").html(data.followers);
       followers1 = data.followers;
       $(".left .following").html(data.following);
       /*
         TODO
         Attach the data returned to the DOM
         The data currently hard-coded into the DOM is placeholder data
        */

       $('.user-results').removeClass('hide') // Display '.user-results' element
     })
     fetch(`${USER_URL}/${username2}`)
       .then(response => response.json()) // Returns parsed json data from response body as promise
       .then(data => {
         console.log(`Got data for ${username2}`)
         console.log(data);
         $(".right .username").html(data.username);
         $(".right .full-name").html(data.name);
         $(".right .location").html(data.location);
         $(".right .bio").html(data.bio);
         const $image = $('<div>').append('<img src= "' + data.avatar + '">')
         $image.addClass('avatar')
         $('.image-right').append($image)
         $(".right .titles").html(data.tags);
         $(".right .favorite-language").html(data.favLanguage);
         $(".right .total-stars").html(data.largeStar);
         $(".right .highest-starred").html(data.mostStarred);
         $(".right .public-repos").html(data.repsNum);
         $(".right .perfect-repos").html(data.perfected);
         $(".right .followers").html(data.followers);
         followers2 = data.followers;
         $(".right .following").html(data.following);
       })
     .catch(err => {
       console.log(`Error getting data for users`)
       console.log(err)
       /*
         TODO
         If there is an error finding the user, instead toggle the display of the '.user-error' element
         and populate it's inner span '.error' element with an appropriate error message
       */
     })
     if (followers1>followers2) {
       $(".winner .username").html(username1);
     }else{
       $(".winner .username").html(username2);
     }
   return false // return false to prevent default form submission
 })
