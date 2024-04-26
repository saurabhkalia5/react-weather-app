import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State variables to store weather data and user input location
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');


  // API URL for fetching weather data based on user location input
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  // Function to search for weather data when user presses Enter key
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          // Update state with fetched weather data
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          // Handle the error based on its response status
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Error status:", error.response.status);
            console.log("Error data:", error.response.data);
            if (error.response.status === 404) {
              alert('Location not found. Please enter a valid location.');
            } else {
              alert('An error occurred. Please try again later.');
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.log("No response received:", error.request);
            alert('No response from the server. Please check your network connection.');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            alert('Error during request setup: ' + error.message);
          }
        });
      // Clear the input field after search
      setLocation('');
    }
  };

  
  return (
    <div className="app">
      <div className="search">
        {/* Input field for user to enter location */}
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {/* Display location name */}
            <p>{data.name}</p>
          </div>
        </div>
        {/* Display weather details of location if available */}
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {/* Display feels like temperature */}
              {data.main ? <h1>{((data.main.temp - 32) * 5/9).toFixed()}°C</h1> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {/* Display humidity */}
              {data.main ? <h1 className='bold'>{data.main.humidity}%</h1> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {/* Display wind speed */}
              {data.wind ? <h1 className='bold'>{data.wind.speed.toFixed()} MPH</h1> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
