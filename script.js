var activeSong = 1;
var playingSong = false;
var pausedSong = true;
var shuffleCounter = 0;
var shuffle = false;
var looped = false;
var randomSongOrder = [];
var timeElapsed = 0;
var progressAmount = 0;
var activeSongDuration = 249;
var songs = [{
  title: "Flip",
  artist: "Glass Animals",
  album: "Zaba",
  duration: 214,
  rating: 4,
  image: "https://upload.wikimedia.org/wikipedia/en/3/32/Glass_animals_zaba.jpg"
}, {
  title: "Black Mambo",
  artist: "Glass Animals",
  album: "Zaba",
  duration: 249,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/3/32/Glass_animals_zaba.jpg"
}, {
  title: "Stay Close",
  artist: "Flume",
  album: "Flume",
  duration: 176,
  rating: 5,
  image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Flume_album_artwork.jpg"
}, {
  title: "Loud Places",
  artist: "Romy, Jamie xx",
  album: "In Colour",
  duration: 283,
  rating: 4,
  image: "https://upload.wikimedia.org/wikipedia/en/c/c2/Jamie_xx_-_In_Colour.png"
}, {
  title: "You & Me (Flume Remix)",
  artist: "Disclosure, Flume",
  album: "Settle",
  duration: 280,
  rating: 5,
  image: "https://upload.wikimedia.org/wikipedia/en/7/76/Disclosure_-_Settle.png"
}, {
  title: "Retrograde",
  artist: "James Blake",
  album: "Overgrown",
  duration: 214,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/d/de/James_Blake_-_Overgrown_album_cover.png"
},
            {
  title: "Retrograde",
  artist: "James Blake",
  album: "Overgrown",
  duration: 214,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/d/de/James_Blake_-_Overgrown_album_cover.png"
},
            {
  title: "Retrograde",
  artist: "James Blake",
  album: "Overgrown",
  duration: 214,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/d/de/James_Blake_-_Overgrown_album_cover.png"
},
            {
  title: "Retrograde",
  artist: "James Blake",
  album: "Overgrown",
  duration: 214,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/d/de/James_Blake_-_Overgrown_album_cover.png"
},
            {
  title: "Retrograde",
  artist: "James Blake",
  album: "Overgrown",
  duration: 214,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/d/de/James_Blake_-_Overgrown_album_cover.png"
},
            {
  title: "Retrograde",
  artist: "James Blake",
  album: "Overgrown",
  duration: 214,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/d/de/James_Blake_-_Overgrown_album_cover.png"
},
            {
  title: "Retrograde",
  artist: "James Blake",
  album: "Overgrown",
  duration: 214,
  rating: 3,
  image: "https://upload.wikimedia.org/wikipedia/en/d/de/James_Blake_-_Overgrown_album_cover.png"
}]

songs.forEach(function(song, num) {
  var tr = document.createElement('tr');
  var songName = document.createElement('td');
  songName.appendChild(document.createTextNode(song.title));
  var artistName = document.createElement('td');
  artistName.appendChild(document.createTextNode(song.artist));
  var albumName = document.createElement('td');
  albumName.appendChild(document.createTextNode(song.album));
  var duration = document.createElement('td');
  duration.appendChild(document.createTextNode(beautifySeconds(song.duration)));
  var rating = document.createElement('td');
  for (var i = 0; i < 5; i++) {
    var star = document.createElement('i');
    star.classList.add('fa')
    if (song.rating > i) star.classList.add('fa-star');
    else star.classList.add('fa-star-o');
    rating.appendChild(star)
  }
  tr.appendChild(songName);
  tr.appendChild(artistName);
  tr.appendChild(albumName);
  tr.appendChild(duration);
  tr.appendChild(rating);
  tr.id = 'song-' + num;
  tr.addEventListener('click', function(e) {
    if (activeSong !== parseInt(this.id.match(/\d/g).join(''))) {
      updateSong(songs[parseInt(this.id.match(/\d/g).join(''))]);
    }
  })
  document.getElementById('song-table').appendChild(tr);
})
document.getElementById('song-' + activeSong).classList.add('selected-song');

function updateSong(song) {
     document.getElementById('song-' + activeSong).classList.remove('selected-song');
    document.getElementById('album-background-overlay').style.backgroundImage = 'url(' + songs[activeSong].image + ')';
    activeSong = songs.indexOf(song);
    resetSongProgress();
  progressAmount = document.getElementById('progress-line').clientWidth/song.duration;
  activeSongDuration = song.duration;
  document.getElementById('album-image').style.backgroundImage = 'url(' + song.image + ')';
  document.getElementById('album-background').style.backgroundImage = 'url(' + song.image + ')';
  document.getElementById('current-song-title').innerHTML = song.title;
  document.getElementById('current-song-artist').innerHTML = song.artist;
  window.requestAnimationFrame(function() {
    fadeIn(document.getElementById('album-background-overlay'), 0);
  });
  document.getElementById('song-' + activeSong).classList.add('selected-song');
  document.getElementById('total-time').innerHTML = beautifySeconds(song.duration);
      document.getElementById('progress-line-overlay').style.transition = 'all .1s linear';

}

document.getElementById('forward').addEventListener('click', function() {
  if (shuffle) {
    nextSongShuffle();
  }
  else if (activeSong < songs.length - 1) {
    updateSong(songs[activeSong+1]);
  }

})
document.getElementById('backward').addEventListener('click', function() {
  if (activeSong > 0) {
    updateSong(songs[activeSong-1]);
  }
})

function fadeIn(elm, x) {
  if (x < 1) {
    x += 0.1;
    document.getElementById('album-background-overlay').style.opacity = 1 - x;
    window.requestAnimationFrame(function() {
      fadeIn(elm, x)
    })
  } else {

  }
}

document.getElementById('play').addEventListener('click',function(){
  if(!playingSong){
    if (!pausedSong) {
      resetSongProgress();
    if (shuffle) {
      createRandomSongOrder();
    }
    }
    startSongProgress();
  document.getElementById('play').innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
  }
  else {
  pauseSong();
  }

});
document.getElementById('shuffle').addEventListener('click',function(){
 this.classList.toggle('active');
  if (!shuffle) {
    shuffle = true;
    createRandomSongOrder();
  }
  else shuffle = false;

});
document.getElementById('loop').addEventListener('click',function(){
 this.classList.toggle('active');
});
document.getElementById('progress-line').addEventListener('mousedown',function(e){
  setProgressbar(e);
})
function startSongProgress() {
  document.getElementById('progress-line-overlay').style.transition = 'all .1s linear';
    playingSong = true;
    playInterval = setInterval(function(){
    timeElapsed += 1;
    if (timeElapsed >= activeSongDuration){
    if (shuffle){
      nextSongShuffle();
    }
    else {
       updateSong(songs[activeSong+1]);
    }
    }
    updateTime();
    updateProgressbar();
    },1000);
}

function pauseSong() {
    playingSong = false;
    pausedSong = true;
    document.getElementById('play').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    clearInterval(playInterval);
}
function resetSongProgress() {
  document.getElementById('progress-line-overlay').style.transition = 'none';
     timeElapsed = 0;
      updateTime();
     document.getElementById('progress-line-overlay').style.width = document.getElementById('progress-line').clientWidth +'px';
}

function beautifySeconds(time){
  var min = Math.floor(time/60);
  var sec = Math.floor(time%60);
  if (sec < 10){
  return min+":0"+sec;
  }
  return min+":"+sec;
}
function updateTime() {
          document.getElementById('active-time').innerHTML = beautifySeconds(timeElapsed);
}
function updateProgressbar() {
      var newWidth = document.getElementById('progress-line').clientWidth - progressAmount*timeElapsed;
    document.getElementById('progress-line-overlay').style.width = newWidth +'px';

}
function setProgressbar(e) {
  var factor = e.clientX / document.getElementById('progress-line').clientWidth ;
  console.log(activeSongDuration * factor);
  timeElapsed = activeSongDuration * factor;
  updateTime();
  updateProgressbar();
}

function createRandomSongOrder() {
  randomSongOrder = [];
  while (randomSongOrder.length <songs.length){
    var nextNumber = Math.floor(Math.random()*(songs.length));
    if(randomSongOrder.indexOf(nextNumber) < 0) {
        randomSongOrder.push(nextNumber)
    }
  }
  randomSongOrder.splice(randomSongOrder.indexOf(activeSong),1);
  console.log(randomSongOrder)
}

function nextSongShuffle(){
      updateSong(songs[randomSongOrder[shuffleCounter]]);
    shuffleCounter += 1;
    if (shuffleCounter >= songs.length-1){
      createRandomSongOrder();
      shuffleCounter = 0;
    }
}
