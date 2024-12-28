# MERN Stack Coding Challenge

This is a full-stack MERN application designed to manage product transaction data, display statistics, and visualize the data using charts. The backend is built with Node.js, Express, and MongoDB, while the frontend is developed with React. The application allows users to view product transactions, search and paginate through the data, view transaction statistics, and visualize the data using bar and pie charts.

## Features
- **Initialize Database**: Fetch product data from a third-party API and seed it into MongoDB.
- **Transaction Listing**: View all transactions for a selected month with search and pagination functionality.
- **Statistics**: View the total sale amount, total sold items, and total unsold items for the selected month.
- **Bar Chart**: Visualize the price ranges and the number of items within each price range for the selected month.
- **Pie Chart**: Display the distribution of items by category for the selected month.
- **Combined Data**: Fetch and combine all data (transactions, statistics, bar chart, and pie chart) into a single response.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, Axios
- **Frontend**: React, Axios, Chart.js, react-chartjs-2
- **Database**: MongoDB
- **Tools**: Postman (for testing APIs), Docker (optional)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (locally or MongoDB Atlas)
- npm (Node Package Manager)

### Installation

#### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd mern-stack-challenge

	2.	Install the required dependencies:

npm install


	3.	Set up your MongoDB connection:
	•	Make sure MongoDB is running locally or use MongoDB Atlas.
	•	Update the mongoose.connect URL in the server.js file with your MongoDB connection string.
	4.	Create a .env file in the root directory to store your MongoDB connection string and any other sensitive data:

MONGO_URI=mongodb://localhost:27017/mern-challenge


	5.	Start the backend server:

node server.js

The backend will be running on http://localhost:5000.

Frontend Setup
	1.	Navigate to the frontend directory:

cd frontend


	2.	Install the required dependencies:

npm install


	3.	Start the frontend server:

npm start

The frontend will be running on http://localhost:3000.

API Endpoints
	•	Initialize Database
	•	GET /initialize-db: Fetches product data from the third-party API and seeds it into the database.
	•	Transaction Listing
	•	GET /transactions?month=<month>&search=<search-term>&page=<page>&perPage=<perPage>: Lists transactions for the selected month with search and pagination.
	•	Statistics
	•	GET /statistics?month=<month>: Returns the total sale amount, total sold items, and total unsold items for the selected month.
	•	Bar Chart Data
	•	GET /bar-chart?month=<month>: Returns the distribution of items within different price ranges for the selected month.
	•	Pie Chart Data
	•	GET /pie-chart?month=<month>: Returns the distribution of items by category for the selected month.
	•	Combined Data
	•	GET /combined-stats?month=<month>: Fetches and combines the responses from the statistics, bar chart, and pie chart APIs.

Frontend Components
	•	Transaction Table: Displays transactions for the selected month with search, pagination, and filtering options.
	•	Statistics Box: Displays the total sale amount, total sold items, and total unsold items for the selected month.
	•	Bar Chart: Visualizes the price distribution in different price ranges for the selected month.
	•	Pie Chart: Visualizes the distribution of items by category for the selected month.

Usage
	1.	Select a month from the dropdown (default is March).
	2.	The transaction table will show the transactions for that month.
	3.	Use the search box to filter transactions by title, description, or price.
	4.	Use the pagination buttons to navigate through the pages of transactions.
	5.	The statistics box will display the total sale amount, total sold items, and total unsold items for the selected month.
	6.	The bar chart will display the price distribution in different price ranges.
	7.	The pie chart will display the distribution of items by category.

Project Structure

mern-stack-challenge/
├── backend/
│   ├── models/
│   │   └── Transaction.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TransactionTable.js
│   │   │   ├── StatisticsBox.js
│   │   │   ├── BarChart.js
│   │   │   ├── PieChart.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
├── README.md
└── .gitignore

Contributing

Feel free to fork the repository, make improvements, and create a pull request.

License

This project is open-source and available under the MIT License.

This `README.md` covers all the details for setting up, using, and understanding the MERN stack application, including the backend and frontend components, the structure, and API usage.
