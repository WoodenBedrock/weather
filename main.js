var city = document.getElementById('autoComplete')
var cityIn = ''
var cityLabel = document.getElementById('city')
var countryLabel = document.getElementById('country')
var tempCLabel = document.getElementById('tempC')
var descriptionLabel = document.getElementById('description')
var icondiv = document.getElementById('icon')
var animSearch = document.getElementById('SS')
var asvg = document.getElementById('asvg')
const apiId = "508cadcf846952c94adda63195e5c5d5"
const Http = new XMLHttpRequest()

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

function animarrOn(){
    asvg.classList.add("ansvg")
    setTimeout(animarrOff,853)
    return
}

function animarrOff(){
    asvg.classList.remove("ansvg")
    return
}


function animInvOn() {
    city.blur()
    cityIn = city.value
    city.value = ""
    animSearch.classList.add("searchEx")
    if (cityIn != ""){
        city.placeholder = 'City Not Found'
    }
    setTimeout(animInvOff, 2701)
    return
}

function animInvOff() {
    animSearch.classList.remove("searchEx")
    city.focus()
    city.placeholder = 'Enter City'
    city.value = cityIn
    return
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
            console.log('NO CITY')
            animInvOn()
            return
        }

        fetchedData = JSON.parse(Http.responseText)
        
        if (fetchedData.message == "Nothing to geocode") {
            console.log('NO CITY')
            animInvOn()
            return
        }
        animarrOn()
        
        cityLabel.innerHTML = fetchedData.name
        countryLabel.innerHTML = fetchedData.sys.country
        tempCLabel.innerHTML = parseFloat(fetchedData.main.temp - 273).toFixed(0)+'°'
        descriptionLabel.innerHTML = titleCase(fetchedData["weather"][0]["description"])
        var iconcode = fetchedData.weather[0].icon
        var iconurl = "https://openweathermap.org/img/wn/"+iconcode+"@4x.png"
        icondiv.innerHTML = `<img src=${iconurl}>`

    }
}

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        getWeather(city.value);
    }
});


getWeather()
document.getElementById('submit').onclick = function(){getWeather(city.value)}
