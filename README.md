# Youtube API Scraper

Youtube API scraper

## Setting up env variables
Copy the ```.env.sample``` to ```.env``` and poulate it with the required values.

DATABASE_URL is the connection string of the database, it is prepolulated and needs not to be changes as it is in sync with the docker image of the database.

KEY is an array of google API keys

PARAM is the parameter which youtube is to be scraped for

FETCH_INTERVAL is the time interval in seconds the app will query the yt api.

MAX_ENTRIES_PER_PAGE is the number of entries returned in a pageinated response.

## Installation And Running

Make sure you have docker and docker compose installed in your computer.

```bash
docker compose up
```

```bash
docker exec fampay_yt_api npx prisma migrate dev
```

This will expose the app on http://localhost:6060

## Usage

This api contains two routes

1. ```/api/get/:page_number``` - will return the saved video details in desc order of their publish time, page number specifying the page(default is 1).
2. ```/api/search/:query/:page_number``` - will return the saved video details according to the search query in desc order of their publish time, page number specifying the page(default is 1).
