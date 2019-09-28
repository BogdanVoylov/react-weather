import React from "react";

class Weather extends React.Component{
    render(){
        return(
            <div>
                { this.props.state.city &&
                    <div>
                        <p>Location: {this.props.state.city}, {this.props.state.country}</p>
                        <p>Temperature: {this.props.state.temperature}</p>
                        <p>Weather: {this.props.state.weather}</p>
                        <p>Sunrize (at GMT 0): {this.props.state.sunrise}</p>
                        <p>Sunset (at GMT 0): {this.props.state.sunset}</p>
                    </div>   
                }
            </div>
        )
    }
}

export default Weather;