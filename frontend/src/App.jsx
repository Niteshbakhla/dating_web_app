import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// lazy imports
const DatingLandingPage = lazy(() => import("./pages/landingPage"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileDetails = lazy(() => import("./pages/ProfileDetails"));

const App = () => {
  return (

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<DatingLandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
      </Routes>
    </Suspense>
  );
};

export default App;
