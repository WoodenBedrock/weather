
var link
var city = document.getElementById('input')
var cityLabel = document.getElementById('city')
var countryLabel = document.getElementById('country')
var tempCLabel = document.getElementById('tempC')
var descriptionLabel = document.getElementById('description')
const Http = new XMLHttpRequest()

document.getElementById('submit').onclick = function(){
    link = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}%20&appid=4d09cd0e0c359927e26a1df8e5a0de90`
    Http.open('GET', link)
    Http.send()
    Http.onreadystatechange = function(){
        if(Http.readyState != 4) {
                return
            }
        if (Http.status == 404){
            console.log('NO CITY')
        }
        fetchedData = JSON.parse(Http.responseText)
        console.log(fetchedData.name,fetchedData.sys.country,parseFloat(fetchedData.main.temp - 273.16).toFixed(2),fetchedData["weather"][0]["description"])

        cityLabel.innerHTML = fetchedData.name
        countryLabel.innerHTML = fetchedData.sys.country
        tempCLabel.innerHTML = parseFloat(fetchedData.main.temp - 273.16).toFixed(2)
        descriptionLabel.innerHTML = fetchedData["weather"][0]["description"]

    }
}
