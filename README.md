# Overview

SlugMeter was made by UCSC students as a proof-of-concept for a crowd meter for the UCSC gym. SlugMeter uses machine learning to predict the occupancy of the gym for any given day. It also allows you to view live and historical true occupancy (i.e. not predictive), as well as a heatmap for intuitive monthly relative comparisons. SlugMeter was created with a privacy-forward design, as it utilizes only timestamps to generate charts, and knows nothing about who is actually using the gym. React and Chartjs are leveraged on the frontend for quick, fluid transitions with the foremost goal of delivering a delightful user experience.


# Getting Started

This section will walk you through installing and running the project.

1. Clone the Repo
2. Run `npm install` in order to gather dependencies.
3. From the root directory, run `./slug-start.py`. This script starts the server and opens the page on port 3000.

## **Note that the server is currently set to connect to our Mongo Database and uses an environment variable URI (`MONGODB_URI` in the application) and will not be able to connect if no such URI is passed.**

## Training Machine Learning Model
1) Go into 'backend/ML-Stuff' 
2) Open the file named: `Mongo_data.pynb`

            To Change the Number of Days Ahead to be Predicted
            Head to the section:    `OUTPUT PREDICTIONS TO JSON FILE`
            In the second code block, change the `weekday_idx` to the desired number of days. 
    **DISCLAIMER: Predicting too far ahead will result in slightly innacurate data.**
3) Run the `Mongo_data.ipynb` file
4) Your predicted data for each hour of each day is located in `model_predictions.json`

