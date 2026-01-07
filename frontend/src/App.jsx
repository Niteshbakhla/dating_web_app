import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchMe } from "./api/profile";




const DatingLandingPage = lazy(() => import("./pages/landingPage"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileDetails = lazy(() => import("./pages/ProfileDetails"));
const CreateProfile = lazy(() => import("./pages/ProfileCreate"))
const Matches = lazy(() => import("./pages/Matches"))
const Chat = lazy(() => import("./pages/Chat"))

const App = () => {


  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    retry: false,
  });


  return (

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<DatingLandingPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/matches" element={<Matches currentUser={currentUser} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </Suspense>
  );
};

export default App;
