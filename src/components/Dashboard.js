import React from "react";
import { useSpring, animated } from "react-spring";
import { Card, CardContent, Typography, Container, Paper } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../styles/Dashboard.css";  

const Dashboard = () => {
  // Retrieve user data and count value from localStorage
  const userData = JSON.parse(localStorage.getItem("userFormData") || "{}");
  const count = parseInt(localStorage.getItem("count") || "0", 10);

  // Set up a spring animation for the background color based on the count value
  const backgroundSpring = useSpring({
    background: `rgba(100, 181, 246, ${Math.min(count / 100, 1)})`, // Adjust background opacity based on count
    config: { tension: 200, friction: 20 }, // Animation configuration
  });

  // Chart data for the user growth trend
  const chartData = [
    { name: "Jan", users: 40 },
    { name: "Feb", users: 45 },
    { name: "Mar", users: 35 },
    { name: "Apr", users: 43 },
    { name: "May", users: 50 },
  ];

  return (
    // Apply animated styles to the outer container based on backgroundSpring
    <animated.div style={{ ...backgroundSpring }} className="dashboard-container">
      <Container maxWidth="md">
        {/* Paper component to give a card-like appearance */}
        <Paper elevation={6} className="dashboard-paper">
          {/* Dashboard header */}
          <Typography variant="h4" className="dashboard-header">
            Dashboard
          </Typography>

          {/* Card container to hold multiple cards */}
          <div className="card-container">
            {/* Card for displaying the counter value */}
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h5">Counter Value</Typography>
                <Typography variant="h4" color="primary">{count}</Typography>
              </CardContent>
            </Card>

            {/* Card for displaying the user profile data */}
            <Card className="dashboard-card">
              <CardContent>
                <Typography variant="h5">User Profile</Typography>
                {/* Display user information if available, or "N/A" */}
                <Typography variant="body1"><strong>Name:</strong> {userData.name || "N/A"}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {userData.email || "N/A"}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {userData.phone || "N/A"}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {userData.address || "N/A"}</Typography>
              </CardContent>
            </Card>
          </div>

          {/* User growth trends chart */}
          <Typography variant="h5" align="center" sx={{ mt: 4 }}>
            User Growth Trends
          </Typography>

          {/* Responsive container for the chart */}
          <div className="dashboard-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                {/* Add grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" />
                {/* X-axis to display months */}
                <XAxis dataKey="name" />
                {/* Y-axis to represent user count */}
                <YAxis />
                {/* Tooltip to show detailed info on hover */}
                <Tooltip />
                {/* Line graph to represent user growth */}
                <Line type="monotone" dataKey="users" stroke="#3f51b5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Container>
    </animated.div>
  );
};

export default Dashboard;
