import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Dashboard, Login } from "./pages"; 
import AuthContext from "./context/AuthContext.js"; 
import axios from "./api/axios.jsx"; 
import LetsarcApp from "../../Letsarc/src/App.jsx"; 

const App = () => {
  const [user, setUser] = useState(null); // State to store authenticated user
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle user state setting and navigating based on authentication status
  const handleUser = (user) => {
    setUser(user); // Set the user state
    if (user) {
      navigate("/letsarc"); // Navigates to Letsarc app if user is authenticated
    }
  };

  // Hook to check if user is authenticated when component mounts
  useEffect(() => {
    isAuthenticated(); // Function call to check authentication
  }, []);

  // Function to check if user is authenticated by making an API call
  const isAuthenticated = async () => {
    try {
      // Sends GET request to "/auth" endpoint with token from localStorage
      const response = await axios.get("/auth", {
        headers: { authorization: localStorage.getItem("token") },
      });
      console.log(response.data);
      handleUser(response.data.user); // Updates user state based on response
    } catch (error) {
      console.log(error); // Log any errors
    }
  };

  return (
    <div className="font-outfit">
      {/* Provides user and handleUser function to rest of app through context */}
      <AuthContext.Provider value={{ user, handleUser }}>
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Login />} /> {/* Conditionally renders Dashboard or Login based on user authentication */}
          <Route path="/letsarc" element={<LetsarcApp />} /> {/* Route to Letsarc app */}
        </Routes>
      </AuthContext.Provider>
      {/* Toaster for displaying notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          className:
            "text-lg bg-blue1/90 text-white2 tracking-wide font-outfit font-medium",
          success: {
            duration: 2000,
          },
        }}
      />
    </div>
  );
};

export default App;
