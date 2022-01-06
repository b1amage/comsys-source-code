const displayTemp = temp => {
    if (temp > 30) {
        return "Above the maximum temperature that plants can grow.";
    } else if (temp > 24 && temp <= 30) {
        return "The temperature is good for outdoor plants but not indoor plants.";
    } else if (temp > 15 && temp <= 24) {
        return "The temperature is good for most plants.";
    } else if (temp > 13 && temp <= 15) {
        return "The temperature is not good for tender plants.";
    } else if (temp > 10 && temp <= 13) {
        return "The temperature is not good for half-hardy plants.";
    } else if (temp > 7 && temp <= 10) {
        return "The temperature is only suitable for hardy plants.";
    } else if (temp <= 7) {
        return "The temperature is not good for most plants.";
    }
}

const displayHumid = humid => {
    if (humid === 0) {
        return "No moisture in the air. Difficult even for cacti to survive."
    } else if (humid >= 10 && humid < 20) {
        return "Cacti and succulents can survive. Air this dry will injure most houseplants.";
    } else if (humid >= 20 && humid < 30) {
        return "This is the humidity level of an average home. Some plants will be able to live, including cacti and succulents.";
    } else if (humid >= 40 && humid < 50) {
        return "This is ideal for the flowering stage of mature plants.";
    } else if (humid >= 50 && humid < 60) {
        return "This is ideal for the vegetative stage of growing plants.";
    } else if (humid >= 60 && humid < 80) {
        return "This is ideal for a greenhouse, which can be used to grow various plants, both tropical and otherwise.";
    } else if (humid >= 90 && humid <= 100) {
        return "This is ideal for the germination of seeds and growth of some seedlings. People would find it uncomfortable.";
    }

    return "The humidity is normal for most of agricultural activities";
}

const displayPressure = pressure => {
    if (pressure > 1022) {
        return "The weather is calm with clear sky, suitable for agriculture.";
    }

    if (pressure > 1009) {
        return "The weather is steady, suitable for agriculture.";
    }

    return "There can be rain, check if plants are flooded.";
}

const render = (res, command) => {
    let info;
    let name;
    let display;
    if (command === "temp") {
        name = "Temperature";
        info = res.temperature + "&degC";
        display = displayTemp(res.temperature);
    } else if (command === "humid") {
        name = "Humidity";
        info = res.humidity + "%";
        display = displayHumid(res.humidity);
    } else if (command === "pressure") {
        name = "Pressure";
        info = res.pressure + "mb";
        display = displayPressure(res.pressure);
    }

    if (res.temperature === undefined || res.humidity === undefined || res.pressure === undefined) {
        responseField.innerHTML = `<h2>Sensor does not respond</h2>`;
        return;
    }

    responseField.innerHTML = `<h2>${name}: ${info}</h2><h2>${display}</h2>`;
}

const warningSurrounding = () => {
    responseField.innerHTML = `<h2>Server does not respond</h2>`;
}

const warningSpecificLocation = () => {
    responseField.innerHTML = `<h2>Location not found</h2>`;
}

const warning = measurement => {
    if (measurement === "surrounding") {
        warningSurrounding();
    } else if (measurement === "specific") {
        warningSpecificLocation();
    }
}

function showAndHideElement(element) {
    if (element.value === "specific") {
        document.getElementById("location").style.display = 'block';
        document.getElementById("chart").style.display = 'none';
    } else if (element.value === "surrounding"){
        document.getElementById("location").style.display = 'none';
        document.getElementById("chart").style.display = 'block';
    }
    inputField.value = "";
}

function clearText() {
    responseField.innerHTML = "";
    chartField.innerHTML = "";
}