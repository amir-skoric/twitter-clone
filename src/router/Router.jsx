//imports
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

import ProfileSettings from "../pages/ProfileSettings";
import Frontpage from "../pages/Frontpage";

import { AuthProvider } from "../contexts/AuthContext";
import { TweetProvider } from "../contexts/TweetContext";

import { useTweet } from "../contexts/TweetContext";

import {
  BrowserRouter as RouterContainer,
  Routes,
  Route,
} from "react-router-dom";

import PrivateRoute from "../routes/PrivateRoute";
import AnonymousRoute from "../routes/AnonymousRoute";
import NotFound from "../pages/NotFound";
import Layout from "../Layout";
import User from "../pages/User";
export default function Router() {
  
  return (
    <RouterContainer>
      <AuthProvider>
        <TweetProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Frontpage />} exact />
                <Route
                  path="user/:id"
                  element={<User />}
                />
                <Route path="/settings" element={<ProfileSettings />} exact />
              </Route>
            </Route>
            <Route element={<AnonymousRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TweetProvider>
      </AuthProvider>
    </RouterContainer>
  );
}
