import React from "react";
import Profile from "./sections/Profile";
import Auth from "../../hoc/Auth";

const Settings = () => {
  return <Profile/>
};

export default Auth(Settings);
