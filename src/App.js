import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

function handle_weather_error(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    } else {
        return response.json();
    }
}

function parse_seconds(secs) {
    let date = new Date(secs * 1000);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

}


class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        weather:undefined
    };

    getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        const API_KEY = "82b797b6ebc625032318e16f1b42c016";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(handle_weather_error)
            .then(response => {
                console.log(response);

                this.setState({
                    temperature: response.main.temp,
                    city: response.name,
                    country: response.sys.country,
                    sunrise: parse_seconds(response.sys.sunrise),
                    sunset: parse_seconds(response.sys.sunset),
                    weather: response.weather[0].description
                });
                console.log(this.state);

            })
            .catch(function () {
                alert("Enter valid city name");
            });
    };

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 info">
                            <Info/>
                        </div>
                        <div className="col-sm-7 form">
                            <Form getWeather={this.getWeather}/>
                            <Weather state={this.state}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
