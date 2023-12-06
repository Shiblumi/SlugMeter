
# Getting Started with Running the SlugMeter Application


## <ins>Clone the Repo</ins>


## <ins>Run `npm install` in root directory</ins>




## <ins>Training Machine Learning Model</ins>
1) Go into 'backend/ML-Stuff' 
2) Open the file named: `Mongo_data.pynb`

            To Change the Number of Days Ahead to be Predicted
            Head to the section:    `OUTPUT PREDICTIONS TO JSON FILE`
            In the second code block, change the `weekday_idx` to the desired number of days. 
    **DISCLAIMER: Predicting too far ahead will result in slightly innacurate data.**
3) Run the `Mongo_data.ipynb` file
4) Your predicted data for each hour of each day is located in `model_predictions.json`

## <ins> Run 'python ./slug-start.py'</ins>
