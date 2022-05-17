import { useEffect, useState } from "react";
import axios from "axios";

const CLIENT_ID = "c928f26754d24f92aa2742e5f55daedb";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function Data() {
  let [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [song, setSong] = useState("");
  const [apiDataMe, setApiDataMe] = useState({});

  useEffect(() => {

    console.log('getting token');

    const hash = window.location.hash;
    let getToken = window.localStorage.getItem("token");

    if (!getToken && hash) {
        console.log(hash);
        console.log(token);
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

        window.location.hash = "";
        window.localStorage.setItem("token", token);
    }
    setToken(getToken);
}, []);

useEffect(() => {
    
    console.log(token);

    async function getData(){
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setApiDataMe(data);
    }
    getData();
    
  }, [token]);
    
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        q: searchKey,
        type: "track",
      },
    }); 
    // console.log(data.artists.items);
    setArtists(data.tracks.items);
  };
  


  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id} id={artist.id}>
        {/* {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}   */}
        {artist.name}
        <audio id={artist.id + "pre"} src={song} />

        {artist.preview_url ? (
          <button
            className="border-2"
            onClick={() => {
              setSong(artist.preview_url);
              setTimeout(() => {
                document.getElementById(artist.id+'pre').play();
              }, 200);
            }}
          >
            Preview
          </button>
        ) : (
          <p className="inline font-bold"> No preview</p>
        )}
      </div>
    ));
  };

  return (
    <div className="Data">
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      <form onSubmit={searchArtists}>
        <input
          className="border-2"
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type={"submit"}>Search</button>
      </form>
      <button
        className="border-2"
        style={{ width: "60px", height: "40px" }}
        onClick={()=>{console.log(apiDataMe)}}
      />
      {renderArtists()}
    </div>
  );
}

export default Data;