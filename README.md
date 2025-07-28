 **Smart Crop Selector Using Machine Learning**  

 **Overview**  
The **Smart Crop Selector** is an innovative web-based platform designed to empower farmers with **data-driven crop recommendations and yield predictions**. By leveraging **Random Forest**, a robust machine learning algorithm, the system analyzes **local soil and climate data** to suggest the most suitable crops based on the farmer's location, determined via GPS. Farmers can input critical details such as **soil type and cultivation area**, allowing the system to provide **precise yield predictions** and recommend the **most profitable crops**.  

 **Key Features**  
- **Intelligent Crop Recommendation:** Uses **Random Forest** to analyze environmental factors and suggest the best crop.  
- **Yield Prediction:** Estimates crop productivity based on historical data and user inputs.  
- **14-Day Weather Forecast:** Integrates **OpenWeather API** to optimize fertilizer application schedules and minimize waste due to adverse weather.  
- **Water Requirement Suggestions:** Provides **irrigation schedules** based on regional weather and soil conditions, ensuring efficient water management.  
- **GPS-Based Location Analysis:** Automatically detects the user’s location to offer **region-specific crop suggestions**.  

 **Technology Stack**  
- **Machine Learning Model:** Random Forest  
- **Frontend:** React.js  
- **Backend:** Python  / Node.js  
- **API Integrations:** OpenWeather API (for weather forecasts)  
-**csv**:kaggle  

 **How It Works**  
1. Farmers access the **Smart Crop Selector** via a web platform.  
2. They input **soil type, pH, temperature, humidity, rainfall, and cultivation area**.  
3. The system fetches **real-time weather data** and processes all inputs using **Random Forest**.  
4. The platform provides:  
   - **Best crop recommendations** for that location.  
   - **Estimated yield predictions** for selected crops.  
   - **Water and irrigation schedules** for efficient farming.  
   - **Fertilizer application suggestions** based on the 14-day weather forecast.  

 **Setup & Installation**  
1. Clone the repository.  
2. Install dependencies (`npm install` for frontend, `pip install` for backend).  
3. Configure environment variables (OpenWeather API keys, database credentials).  
4. Train and deploy the **Random Forest model**.  
5. Start the backend and frontend servers (`npm start` / `python app.py`).

## outputs
<img width="940" height="472" alt="image" src="https://github.com/user-attachments/assets/c54dd27d-e009-462f-a17c-fa9df2e3d5b2" />
<img width="897" height="645" alt="image" src="https://github.com/user-attachments/assets/e8df2b40-d40a-4950-b78b-358284509c30" />
<img width="940" height="345" alt="image" src="https://github.com/user-attachments/assets/11cd3013-0af8-4ecf-aeda-c78a2963a37c" />
<img width="847" height="614" alt="image" src="https://github.com/user-attachments/assets/91352be6-fc5b-487f-a3b9-05d696c422a3" />




 


