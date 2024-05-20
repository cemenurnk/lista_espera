const showWeather = () => {
  const openWeatherQueries = {
    lat: "-26.18489", 
    lon: "-58.17313", 
    appid: "0f8a70549d8ee6decc2c8b8862ccba7e",
    units: "metric",
    lang: "es"
  }

  fetch("https://api.openweathermap.org/data/2.5/weather?" + Object.keys(openWeatherQueries).map(value => (value + "=" + openWeatherQueries[value])).join("&"))
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    const weatherContainer = document.querySelector(".encabezado__clima")

    weatherContainer.innerHTML = ""

    const icon = document.createElement("img")
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    icon.classList.add("clima__imagen")

    const temperature = document.createElement("span")
    temperature.innerHTML = data.main.temp + "°C"
    temperature.classList.add("clima__temperatura")

    weatherContainer.appendChild(icon)
    weatherContainer.appendChild(temperature)

    //Recursividad cada una hora
    setTimeout(showWeather, 60*60*1000)
  })
}

const showTime = () => {
  const date = new Date()

  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()

  if(hours < 10) hours = "0" + hours
  if(minutes < 10) minutes = "0" + minutes

  document.querySelector(".encabezado__hora").innerHTML = `${hours}:${minutes}`
  // document.querySelector(".datetime__date").innerHTML = `${days[date.getDay() - 1]} ${date.getDate()} de ${months[date.getMonth()]}`

  setTimeout(showTime, 1000 - date.getMilliseconds())
}

const playVideos = () => {
  const videos = ["Azucar.mp4", "Carne.mp4", "Dieta.mp4", "suplementos.mp4"]
  
  const videoPlayer = document.querySelector("#video-player")
  let index = 0

  const nextVideo = () =>{
    videoPlayer.src = "https://sievert-media-server.onrender.com/videos/" + videos[index]
    videoPlayer.play()

    // console.log(index)

    //si llegó al último video que vuelva al principio
    index = index < (videos.length - 1) ? index + 1 : 0
  }

  //primera reproducción
  nextVideo()

  videoPlayer.addEventListener("ended", ()=>{
    nextVideo()
  })
}

window.addEventListener("load", ()=>{
  playVideos()
  showTime()
  showWeather()
})
