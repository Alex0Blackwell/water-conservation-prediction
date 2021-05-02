<u><h1 align="center">🌊New York Water Consumption🌊</h1></u>

<p align="center">
<a href="https://github.com/Alex0Blackwell/water-conservation-prediction">
<img src="https://user-images.githubusercontent.com/31634087/116801427-ce80fc80-aabe-11eb-8548-9c8e058e1f8e.png" width="250px">
</a>
</p>


<p align="center">
  <a href="#overview">Overview</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#examples">Examples</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#development-setup">Development Setup</a>
</p>

## Overview

#### Introduction
The recent frequency of climate issues has risen, and with this topical issue is the concern of droughts. Every summer season in the New York area comes with the possibility of water sparseness. Often, water restrictions must be invoked, causing civil unrest and raising concerns over whether or not the constraints are of an appropriate scale. Our project forecasts water consumption so that civilians have more time to prepare for water restrictions. Additionally, our prediction software could provide insight regarding the most suitable magnitude of restrictions. 

#### How We Present Our Solution
A web application is hosted at [nywater.ml](www.nywater.ml) with an interactive graph displaying water consumption over time in New York regions. The regions include New York City itself, and the boroughs: Brooklyn, Bronx, Manhattan, Queens, Staten Island, and the Federal Housing Administration (FHA). For each region, the time span may be selected. For New York itself, a prediction can be cast into the future by applying a machine-learning algorithm to forecast the expected water consumption trend for a given period. When a time is selected, aggregate values corresponding to statistics on water consumption and charges are updated.

#### What We Found
Four time-series machine learning models were used on our data: exponential smoothing, ARIMA, SARIMA, and LSTM. The seasonality of the data was represented best by Holt-Winter’s seasonal extension to exponential smoothing and the seasonality captured in SARIMA. The ARIMA model failed to determine a pattern and suffered from underfitting. The LSTM model had issues generalizing to the test set and resulted in poor performance on our data. The best fit model to our data was SARIMA, achieving the lowest median absolute error of all the considered machine learning models.

## Examples

> A demonstration of how the web application reacts to requesting different regions, time-spans, and predicting forecasts

![nyWaterConsumption](https://user-images.githubusercontent.com/31634087/116801025-01c18c80-aabb-11eb-8236-38af8e6e57e2.gif)

## Technologies
#### Frontend
- JavaScript
- Chart.js
- HTML
- CSS
#### Backend
- Flask
- Python
- MySQL
- AWS
### Machine Learning
Used:
- SARIMA  

Evaluated but not used:
- ARIMA
- Exponential Smoothing
- LSTM

## Development Setup
#### Python Virtual Environment
In the `./water-conservation-prediction` parent folder, create a virtual environment in Python so we can keep track of libraries.  
To create a virtual environment:

    python3 -m venv env

Where `env` is the name of your environment; however, if you choose something other than `env` you may need to update the `.gitignore` file.  

Now activate the virtual environment:  
**Windows**

    env\Scripts\activate.bat

**Unix or MacOS**

    source env/bin/activate
    
... and install the requirements:

    pip install -r requirements.txt
    
#### Host Backend
Navigate to `Backend/` and run `python app.py` to connect to the database and activate the API endpoints.

#### Access Frontend
Navigate to `App/` and open `index.html` in your web browser.
