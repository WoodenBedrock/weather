var city = document.getElementById('input')
var cityLabel = document.getElementById('city')
var countryLabel = document.getElementById('country')
var tempCLabel = document.getElementById('tempC')
var descriptionLabel = document.getElementById('description')
var icondiv = document.getElementById('icon')
var apiId = "508cadcf846952c94adda63195e5c5d5"
const Http = new XMLHttpRequest()

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }


function getWeather(x='Bangalore'){
    var link = "https://api.openweathermap.org/data/2.5/weather?q="+x+"&appid="+apiId
    Http.open('GET', link)
    Http.send()
    Http.onreadystatechange = function () {
        if (Http.readyState != 4) {
            return
        }

        if (Http.status == 404) {
            console.log('NO CITY',link,Http.status,Http.responseText,"out")
            return
        }

        fetchedData = JSON.parse(Http.responseText)
        cityLabel.innerHTML = fetchedData.name
        countryLabel.innerHTML = fetchedData.sys.country
        tempCLabel.innerHTML = parseFloat(fetchedData.main.temp - 273).toFixed(0)+'°'
        descriptionLabel.innerHTML = titleCase(fetchedData["weather"][0]["description"])
        var iconcode = fetchedData.weather[0].icon
        var iconurl = "https://openweathermap.org/img/wn/"+iconcode+"@4x.png"
        icondiv.innerHTML = `<img src=${iconurl}>`

    }
}

getWeather()
document.getElementById('submit').onclick = function(){getWeather(city.value)}


