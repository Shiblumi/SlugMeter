# Getting Started with Training the Machine Learning Model


## How to Train the Model

Open the file Mongo_data.pynb. 
You can train the model by simply running the file. 

## How to Change the Number of Days Ahead Predicted

Head to the section:
### `OUTPUT PREDICTIONS TO JSON FILE`
In the second code block, change the `weekday_idx` to the desired number of days. 

**DISCLAIMER: Predicting too far ahead will result in slightly innacurate data.**


## Unrequired Code  
Feel free to comment out the section:
### `Data Exploration` 
as this was simply used to visualize the data and is not required in the training of the model, doing so will increase the training speed. 


# General Information on the Training Process
The model reads in the data from the database and creates the following features: `Year`, `Month`, `Day`, `Hour`, `isWeekend`, `isHoliday`.

It then drops any unecessary features obtained from the database as well as any outliers (e.g. Hour = 26).

There are some visual graphs to help explore the data and get an understanding of the data we're working with.

The model trained is an Ensemble method `BaggingRegressor`. <br />
(See the documentation [sklearn.ensemble.BaggingRegressor](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.BaggingRegressor.html) for more information.)

The next 7 days from the current date are obtained and predicted on. The predictions are then outputted to a file `model_predictions.json`