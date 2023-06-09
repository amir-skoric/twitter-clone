//imports
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import AddTweet from "../components/AddTweet";
import AllTweets from "../services/AllTweets";
import FollowingTweets from "../services/FollowingTweets"
import Search from "../components/Search";

const Frontpage = () => {
  const { currentUser } = useAuth();
  return (
    <div className="Frontpage flex flex-col px-8 space-y-4">
      <Search />
      <h1 className="text-2xl font-bold mb-4">Hello, {currentUser.email}!</h1>
      <AddTweet />
      <FollowingTweets />
      <AllTweets />
    </div>
  );
};

export default Frontpage;
