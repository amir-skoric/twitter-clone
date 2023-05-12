//imports
import SignIn from "./auth/pages/SignIn";
import SignUp from "./auth/pages/SignUp";
import LandingPage from "./pages/FrontPage";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AnonymousRoute from "./AnonymousRoute";
import NotFound from "./pages/NotFound";

export default function App() {
  /* useEffect(() => {
    setSpinner(true);
    const getUsers = async () => {
      const data = await getDocs(usersCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setSpinner(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getUsers();
  }, [toggle]);
*/
  return (
    <div className="App bg-black text-white">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<LandingPage />} exact />
            </Route>
            <Route element={<AnonymousRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
