

## Description

SlugMeter was made by UCSC students as a proof-of-concept for a convenient way of viewing the school's gym occupancy levels. React and Chartjs are leveraged on the frontend for quick, fluid transitions with the foremost goal of delivering a delightful user experience. It also allows you to view both live and predicted occupancy levels, as well as a heatmap for intuitive monthly comparisons.

**Live demo** available online: https://slugmeter.live/

:warning: Due to the SlugMeter service being hosted on a free plan, the server spins down after some time of no use. It generally takes a minute for the backend service to start running again after visiting the site for the first time in a while.

## Demos

### Main Page
![Live-Demo](https://github.com/Shiblumi/SlugMeter/assets/70780517/3833b7c2-e624-4351-9f88-3fa98bd0858e)
Immediately see today's occupancy level of the gym with the current hour being highlighted in yellow. View the average occupancy levels of other days of the week to see which timeframe works best for your schedule.

### Trends Page
![Trends-Demo](https://github.com/Shiblumi/SlugMeter/assets/70780517/96e77437-9397-4181-8de3-131e1bc70884)
View the model's predictions for the gym's future occupancy levels. A dashboard to view data of any day in the past, with historical heatmaps per month to for an intuitive view of which days of the week are the busiest.


## Running the project locally

This section will walk you through installing and running the project.

1. Clone the Repo
2. Run `./slug-setup.py` in order to gather dependencies.
3. From the root directory, run `./slug-start.py`. This script starts the server and opens the page on port 3000.

:warning: **Note that the server is currently set to connect to the Mongo Database and uses an environment variable URI (`MONGODB_URI` in the application) and will not be able to connect if no such URI is passed.**

:warning: **A currently being worked on branch, Web_Hosting, is where I am making front-end improvements and connections to proper API endpoints, allowing the dev environment to run without the need of running the server locally.**

## Training Machine Learning Model
1) Go into 'backend/ML-Stuff' 
2) Open the file named: `Mongo_data.pynb`

            To Change the Number of Days Ahead to be Predicted
            Head to the section:    `OUTPUT PREDICTIONS TO JSON FILE`
            In the second code block, change the `weekday_idx` to the desired number of days. 
    **DISCLAIMER: Predicting too far ahead will result in slightly innacurate data.**
3) Run the `Mongo_data.ipynb` file
4) Your predicted data for each hour of each day is located in `model_predictions.json`

