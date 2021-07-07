import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    data: {},
    followers: [],
  }

  componentDidMount() {
    axios
      .get('https://api.github.com/users/emperk')
      .then((response) => {
        console.log("response data: ", response)
        this.setState({ data: response.data })
      })
      .catch((error) => {
        console.log("error: ", error)
      })

    axios
      .get('https://api.github.com/users/markperk/followers')
      .then((response) => {
        console.log("response followers: ", response)
        this.setState({ followers: response.data })
      })
      .catch((error) => {
        console.log("followers error", error)
      })
  }

  render() {
    const { data, followers } = this.state;

    return (
      <div>
        <h1>GitHub User Cards</h1>
        <div className="main-github-user">
          <h3>{data?.name}</h3>
          <p>Login: {data?.login}</p>
          <p>Location: {data?.location || "N/A"}</p>
          <p>Followers: {data?.followers}</p>
          <p>Following: {data?.following}</p>
        </div>
        <div className="github-user-followers">
          <h4>Followers</h4>
          {followers?.map(follower => 
            <div>
              <h5>Login: {follower.login}</h5>
                <p>Repos: {follower.repos_url}</p>
                <p>Type: {follower.type}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App;

