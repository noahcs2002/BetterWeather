# BetterWeather
- CSC425: Web Based Services and Applications Term Project
- Noah Sternberg

## Overview
BetterWeather is a web application designed to view the weather. For the MVP, the app will have the ability to view the weather from any searched 
location, as well as implmenting the ability to view from the location pulled from the geolocation in the browser. There will be a 'by the hour' view as well
as a weekly outlook. It will (eventually) have the ability to show humidity, precipitation chance and wind speed in a side bar, but that is coming later.

## Services
I am not sold on a cloud service yet, however, from the development standpoint, I am using GitHub Actions, a CI/CD pipeline to maintain the app. This project isn't one that super benefits from a traditional cloud service integration, like using a cloud database as the app uses *no* database period, but I am still looking and considering. The **web service** I am using is two fold, I am using the [National Weather Service's free RESTful API](https://www.weather.gov/documentation/services-web-api) for all the weather data, as well as [Open Weather Map's free RESTful API for GeoCoding](https://openweathermap.org/api/geocoding-api). A brief section on how these are being used in conjunction with one another is provided in the [technical overview](#technical-overview-back-end) section.

## Technical Overview: Front End
The front end of this project is built using the [React.js](https://react.dev/) framework due to ease of use. Having never been solely responsible for the front end
of a project, and being *grossly* underexperienced with HTML/CSS, the styling of the site is the best I could do with my minimal knowledge. The project is broken into several small components to keep the pack time down, and to help with the ease of developement, since this is my first time with React.

## Technical Overview: Back End
The backend of this service is minimal, and I like it that way, since I don't have to find a way to host my RESTful API. I am, as previously stated, using the 
[National Weather Service's free RESTful API](https://www.weather.gov/documentation/services-web-api), as well as [Open Weather Map's free RESTful API for GeoCoding](https://openweathermap.org/api/geocoding-api). GeoCoding is the process of taking a location and turning it into its latitude and longitude. The NWS's API requires a latitute and longitudinal location to parse weather data, or the specifics of the issuing zone and the coordinates within the issuing zone. Since figuring out the intrinsic value of some unique-to-the-NWS system seemed tedious for no good reason, I implemented the GeoCoding API to turn a city into the latitude and longitude and parse the weather report that way.
