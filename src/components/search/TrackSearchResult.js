import React, { useState, useEffect } from "react";
import { GoPlay } from "react-icons/go";
import { HiDotsVertical } from "react-icons/hi";

const Tracksearchresult = ({ name, image, artist, song, songId }) => {
  const [prev, setPrev] = useState("");
  const [currSong, setCurrSong] = useState("");

  return (
    <>
      <div
        id={songId}
        className="slideable flex m-2 items-center justify-between w-[327]"
      >
        <div className="flex items-center">
          <div
            className="min-h-[4rem] min-w-[4rem] max-h-[4rem] max-w-[4rem] bg-contain flex justify-center items-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
            onClick={() => {
              document.querySelectorAll("audio").forEach((el) => el.pause());
              setCurrSong(song);
              console.log(currSong);
              console.log(document.getElementById(songId + "pre"));
              setTimeout(() => {
                document.getElementById(songId + "pre").load();
                document.getElementById(songId + "pre").play();
              }, 200);
            }}
          >
            {song ? (
              <svg width="0" height="0">
                <linearGradient
                  id="gradient"
                  x1="100%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop stopColor="#FF6A00" offset="0%" />
                  <stop stopColor="#EE0979" offset="100%" />
                </linearGradient>
              </svg>
            ) : null}

            <GoPlay
              className={`${
                song ? null : "opacity-40"
              } min-w-[2rem] min-h-[2rem] z-10 relative left-4`}
              style={{ fill: "url(#gradient)" }}
            />
            <div
              className={`min-h-[2rem] min-w-[2rem] ${
                song ? null : "bg-opacity-40"
              } bg-white -z-0 relative right-4 rounded-full`}
            />
          </div>
          <div className="ml-3">
            <div className="max-h-[24px] max-w-[208px] overflow-hidden">
              {name}
            </div>
            <div className="text-black/50">{artist}</div>
          </div>
        </div>
        <HiDotsVertical
          onClick={(e) => {
            if (document.getElementById(songId).classList.contains("slide_left")) {
              console.log('yes');
              document.getElementById(songId).classList.remove("slide_left");
              return
            }
            for (var i =0; i < document.getElementsByClassName("slide_left").length; i++) {
              document.getElementsByClassName('slide_left')[i].classList.remove("slide_left");
            }
            document.getElementById(songId).classList.add("slide_left");
          }}
        />
      </div>
      <audio id={songId + "pre"} src={currSong}></audio>
    </>
  );
};

export default Tracksearchresult;
