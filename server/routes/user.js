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
    for (var i = 0; i < repoData.length; i++) {
      responseData["fork" + [i]] = repoData[i].fork;
      responseData["language" + [i]] = repoData[i].language;
      responseData["issues" + [i]] = repoData[i].open_issues;
    }

    return responseData;
}
