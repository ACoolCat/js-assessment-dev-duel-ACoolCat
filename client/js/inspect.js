/* eslint-disable no-undef */
$('form').submit(() => {
  const username = $('form input').val()
  console.log(`examining ${username}`)

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(data => {
      console.log(`Got data for ${username}`)
      console.log(data)
      const $newFollowing = $('<div>')
      $newFollowing.append(data.following)
      $('.following').append($newFollowing)
      const $newName = $('<div>')
      $newName.append(data.name)
      $('.full-name').append($newName)
      const $newUN = $('<div>')
      $newUN.append(data.username)
      $('.username').append($newUN)
      const $newLocation = $('<div>')
      $newLocation.append(data.location)
      $('.location').append($newLocation)
      const $newBio = $('<div>')
      $newBio.append(data.bio)
      $('.bio').append($newBio)
      const $image = $('<div>').append('<img src= "' + data.avatar + '">')
      $image.addClass('avatar')
      $('.image').append($image)
      const $tags = $('<div>')
      let forkCount = 0;
      let totalFork = 0;
      for (var i = 0; i < data.forks.length; i++) {
        if(data.forks[i] == true){
          forkCount++
        }
        totalFork ++;
      }
      if (forkCount >= (totalFork/2)) {
        $tags.append("Forker, ")
      }

      if(totalFork >= 10) {
        $tags.append("No More Training Wheels, ")
      }

      if(data.languages.every( (val, i, arr) => val === arr[0] ) ){
        $tags.append("One-Trick Pony, ")
      }

      let uniqueLanguage = [...new Set(data.language)];

      if(uniqueLanguage.length >= 10){
        $tags.append("Jack Of All Trades, ")
      }

      if(data.following >= (data.followers * 2)){
        $tags.append("Stalker, ")
      }

      if(data.followers >= (data.following * 2)){
        $tags.append("Mr. Popular, ")
      }

      $('.titles').append($tags)

      const $newLanguage = $('<div>');

      var modeMap = {};
      var maxEl = data.languages[0], maxCount = 1;
      for(var i = 0; i < data.languages.length; i++)
      {
          var el = data.languages[i];
          if(modeMap[el] == null)
              modeMap[el] = 1;
              else
              modeMap[el]++;
              if(modeMap[el] > maxCount)
              {
                maxEl = el;
                maxCount = modeMap[el];
              }
          }

          $newLanguage.append(maxEl)
          $('.favorite-language').append($newLanguage)
          const $newStarTotal = $('<div>')
          let starAdder = 0
          let largeNum = 0
          for (var i = 0; i < data.stars.length; i++) {
            starAdder = data.stars[i] + starAdder;
            if(largeNum < data.stars[i]){
              largeNum = data.stars[i];
            }
          }
          $newStarTotal.append(starAdder)
          $('.total-stars').append($newStarTotal);
          const $newStar = $('<div>')
          $newStar.append(largeNum);
          $('.most-starred').append($newStar)
          const $newRepo = $('<div>')
          $newRepo.append(data.repsNum)
          $('.public-repos').append($newRepo)
          const $newIssues = $('<div>')
          let perfect = 0
          for (var i = 0; i < data.issues.length; i++) {
            if(data.issues[i] == 0){
              perfect++;
            }
          }
          $newIssues.append(perfect)
          $('.perfect-repos').append($newIssues);
          const $newFollowers = $('<div>')
          $newFollowers.append(data.followers)
          $('.followers').append($newFollowers)

      /*
        TODO
        Attach the data returned to the DOM
        The data currently hard-coded into the DOM is placeholder data
       */

      $('.user-results').removeClass('hide') // Display '.user-results' element
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      /*
        TODO
        If there is an error finding the user, instead toggle the display of the '.user-error' element
        and populate it's inner span '.error' element with an appropriate error message
      */
    })

  return false // return false to prevent default form submission
})
