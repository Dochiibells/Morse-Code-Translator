const temperature = document.getElementById("numbertxtbox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const result = document.getElementById("result");

function Convert() {
    let temp = Number(temperature.value);

    if(toFahrenheit.checked) {
        CelciustoFarenheit(temp);
    }else if(toCelsius.checked) {
        FahrenheitCelcius(temp);
    }else{
        result.textContent = "Select a Unit";
    }
}

function CelciustoFarenheit(tempCelsius) {
    let tempFahrenheit = tempCelsius * 9 / 5 + 32;
    result.textContent = tempFahrenheit.toFixed(1) + "°F";
}

function FahrenheitCelcius(tempFahrenheit) {
    let tempCelsius = (tempFahrenheit - 32) * 5 / 9;
    result.textContent = tempCelsius.toFixed(1) + "°C";

}