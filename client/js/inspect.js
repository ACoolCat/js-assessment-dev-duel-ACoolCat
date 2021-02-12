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
      $tags.append(data.tags)
      $('.titles').append($tags)
      const $newLanguage = $('<div>');
      $newLanguage.append(data.favLanguage)
      $('.favorite-language').append($newLanguage)
      const $newStarTotal = $('<div>')
      $newStarTotal.append(data.largeStar)
      $('.total-stars').append($newStarTotal);
      const $newStar = $('<div>')
      $newStar.append(data.mostStarred);
      $('.most-starred').append($newStar)
      const $newRepo = $('<div>')
      $newRepo.append(data.repsNum)
      $('.public-repos').append($newRepo)
      const $newIssues = $('<div>')
      $newIssues.append(data.perfected)
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
