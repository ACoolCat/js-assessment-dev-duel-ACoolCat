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

    return responseData;
}
