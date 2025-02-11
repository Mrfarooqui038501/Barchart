# Transaction Dashboard

A full-stack web application for monitoring and managing transactions with data visualization features.

## Features

- Interactive dashboard with real-time statistics
- Detailed transaction table with search and filtering capabilities
- Data visualization using charts (Bar Chart and Pie Chart)
- Responsive design for all screen sizes
- Month and year-based filtering
- Pagination support
- Advanced search functionality across multiple fields

## Tech Stack

### Frontend
- React.js
- Chart.js for data visualization
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git https://github.com/Mrfarooqui038501/Barchart.git

```

2. Install dependencies for both frontend and backend:

For backend:
```bash
cd backend
npm install
```

For frontend:
```bash
cd frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
THIRD_PARTY_API_URL=your_api_url
```

## Running the Application

1. Start the backend server:
```bash
cd backend
node app.js
```
The server will start running on http://localhost:5000

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The application will open in your default browser at http://localhost:3000

## API Endpoints

- `GET /api/transactions` - Get paginated transactions with search and filter options
- `GET /api/statistics` - Get transaction statistics
- `GET /api/barchart` - Get bar chart data
- `GET /api/piechart` - Get pie chart data
- `GET /api/combined` - Get combined dashboard data
- `GET /api/seed` - Seed the database with initial data

## Features in Detail

### Transaction Table
- Pagination with customizable items per page
- Search functionality across title, description, and price
- Month and year filters
- Sortable columns
- Status indicators for sold/unsold items

### Statistics
- Total sale amount
- Number of sold items
- Number of unsold items
- Real-time updates

### Charts
- Bar chart showing price range distribution
- Pie chart displaying category distribution
- Interactive tooltips
- Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Chart.js for the charting library
- Tailwind CSS for the styling framework
- MongoDB for the database
- Express.js for the backend framework

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.