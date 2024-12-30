import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/transactions";

export const initializeDB = async () => {
  const response = await axios.get(`${API_BASE_URL}/initialize-db`);
  return response.data;
};



export const getTransactions = async (month, search, page) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        search : search,
        month : month ,
        page: page,
        perPage: 10, // Adjust number of records per page
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], totalPages: 1 }; // Ensure no errors crash the app
  }
};


export const getStatistics = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics`, {
      params: { month }, // Pass the month as a query parameter
    });
    console.log("API Response:", response.data); // Log for debugging
    return response.data; // Ensure data matches the frontend's expected format
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return { totalSale: 0, totalSold: 0, totalNotSold: 0 }; // Fallback data
  }
};


export const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};

export const getPieChartData = async (month) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/pie-chart?month=${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw error;
  }
};

export const getCombinedData = async (month) => {
  const response = await axios.get(`${API_BASE_URL}/combined-stats`, { params: { month } });
  return response.data;
};