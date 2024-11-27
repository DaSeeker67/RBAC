const ProtectedRoute = ({ children }) => {
    const isTokenValid = () => {
      const token = localStorage.getItem('token');
      console.log(token);
      
      if (!token) {
        return false;
      }
  
      try {
        const decodedToken = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp > currentTime;
      } catch (error) {
        console.error('Invalid token:', error);
        return false;
      }
    };
    return isTokenValid() ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/login" />
    );
  };
  
  export default ProtectedRoute;