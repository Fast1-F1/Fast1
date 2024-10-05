# Fast1 Formula 1 App

Seasonally updated Formula 1 races content with races, drivers, and information about races with race results. Current standings for drivers and constructors championship.

## API Reference

### Ergast API Reference

#### Overview
The Ergast API provides a comprehensive database of historical Formula 1 data, including race results, driver and constructor standings, circuit information, and more. It is a valuable resource for developers looking to access detailed information about Formula 1.

#### API Base URL
- **Base URL**: `https://ergast.com/api/f1`

#### Common Endpoints
Here are some of the commonly used endpoints for accessing specific data:

- **Current Season Races**
  - **Endpoint**: `/current.json`
  - **Description**: Retrieves data about the current season's races.

- **Race Results**
  - **Endpoint**: `/current/{raceId}/results.json`
  - **Description**: Fetches results for a specific race in the current season.
  - **Example**: To get results for the Australian Grand Prix, use `/current/1/results.json`.

- **Driver Standings**
  - **Endpoint**: `/current/driverStandings.json`
  - **Description**: Retrieves the current standings of drivers.

- **Constructor Standings**
  - **Endpoint**: `/current/constructorStandings.json`
  - **Description**: Retrieves the current standings of constructors.

- **Historical Data**
  - **Endpoint**: `/season/{year}/race/{round}.json`
  - **Description**: Fetches data for a specific race in a specific season.

---

### F1 News API Reference

#### Overview
The F1 News API allows you to fetch the latest news articles related to Formula 1 racing. It provides headlines, descriptions, links to articles, and images associated with each news item.

#### API Endpoint
- **Base URL**: `https://f1-motorsport-data.p.rapidapi.com`
- **News Endpoint**: `/news`

#### Request Method
- **GET**: This method is used to retrieve news articles.

#### Request Headers
You need to include the following headers in your request:
- **`x-rapidapi-key`**: Your API key provided by RapidAPI.
- **`x-rapidapi-host`**: `f1-motorsport-data.p.rapidapi.com`

---

## Features

- Live race list of current season
- Live race rankings and race results
- Live drivers championship standings
- Live constructors championship standings

## Screenshots

*(Insert your screenshots here)*
