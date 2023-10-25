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

## Installation and Use

### Prerequisites
1) Install Node.JS and Node Package Manager. For more information, check out [the resources found here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2) (Optionally) install [Git for the command line](https://git-scm.com/downloads) or [Github Desktop](https://desktop.github.com) to handle installing the application. Alternatively, you can just download the .zip (or appropriate archive format) from the repository.

### How to Install
1) Clone this repository. You can do so using SSH or HTTPs, whichever you prefer. Alternatively, you can download the binary files as needed, if you don't want to use Git
2) Using the command line or terminal shell of your choice, `cd` into the directory of the repository you just cloned (or downloaded and decompressed). The file tree is as follows:

```
BetterWeather
    | app
        | src
		| ...
	| public
		| ...
	| node_modules
		| ...
	| build
		| ...
	| package.JSON
	| package-lock.JSON
    | README.md (this file)
    | LICENSE.md
    | pull_request_template.md
```

Make sure you are in the `BetterWeather/app` directory. 

3) Run the console command `npm i`. This takes the package information found in the `package-lock.json` file and install them to the `node_modules` folder for the application to use
4) Still in `BetterWeather/app`, run the command `npm start`. This will start the application on the the development server (`localhost:3000`).
5) Use the App!

## Use Cases
The use case tree is really simple for an application of this scale. You can choose to search for any city you so choose, or any city and state combo if you need to get more refined. Then you'll see a readout of the hourly projection, the weekly projection, and the precipitation chances, as well as some more information, like humidity, wind speed, and a brief forecast overview. Also, if there are any weather alerts (tornado watch, flash flooding, snow warning etc) that will be displayed at the top of the screen.  
