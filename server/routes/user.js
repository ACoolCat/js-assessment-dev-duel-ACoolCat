import axios from 'axios';
import token from '../../token';
export default async(username) => {
  let userData = await axios.get(`http://api.github.com/users/${username}`,{

      headers: {
          'Authorization': token
        }
  })
    userData = userData.data;
    console.log(userData);
    let responseData = {};
    responseData["username"] = userData.login;
    responseData["followers"] = userData.followers;
    responseData["following"] = userData.following;
    responseData["name"] = userData.name;
    responseData["location"] = userData.location;
    responseData["bio"] = userData.bio;
    responseData["avatar"] = userData.avatar_url;
    responseData["repsNum"] = userData.public_repos;
    let repoData = await axios.get(`http://api.github.com/users/${username}/repos`,{

        headers: {
            'Authorization': token
          }
    })
    repoData = repoData.data;
    let fork = [];
    let language = [];
    let issues = [];
    let stars = [];
    for (var i = 0; i < repoData.length; i++) {
      fork.push(repoData[i].fork);
      if(repoData[i].language !== null){
        language.push(repoData[i].language);
      }
      issues.push(repoData[i].open_issues);
      stars.push(repoData[i].stargazers_count);
    }
    responseData["forks"] = fork;
    responseData["languages"] = language;
    responseData["issues"] = issues;
    responseData["stars"] = stars;

    let forkCount = 0;
    let totalFork = 0;
    let tagArray = []
    for (var i = 0; i < fork.length; i++) {
      if(fork[i]== true){
        forkCount++
      }
      totalFork++
    }

    if(forkCount >=(totalFork/2)){
      tagArray.push("Forker, ")
    }

    if(totalFork >=10){
      tagArray.push("No More Training Wheels, ")
    }

    if(language.every( (val, i, arr) => val === arr[0] ) ){
      tagArray.push("One-Trick Pony, ")
    }

    let uniqueLanguage = [...new Set(language)];

    if(uniqueLanguage.length >= 10){
      tagArray.push("Jack Of All Trades, ")
    }

    if(userData.following >= (userData.followers * 2)){
      tagArray.push("Stalker, ")
    }

    if(userData.followers >= (userData.following * 2)){
      tagArray.push("Mr. Popular, ")
    }

    responseData["tags"] = tagArray;

    var modeMap = {};
    var maxEl = language[0], maxCount = 1;
    for(var i = 0; i < language.length; i++)
    {
        var el = language[i];
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

        responseData["favLanguage"] = maxEl;

        let starAdder = 0
        let largeNum = 0
        for (var i = 0; i < stars.length; i++) {
          starAdder = stars[i] + starAdder;
          if(largeNum < stars[i]){
            largeNum = stars[i];
          }
        }

        responseData["largeStar"] = starAdder;
        responseData["mostStarred"] = largeNum;

        let perfect = 0
        for (var i = 0; i < issues.length; i++) {
          if(issues[i] == 0){
            perfect++;
          }
        }

        responseData["perfected"] = perfect;

    return responseData;
}
