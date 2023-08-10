import { useState, useEffect } from "react";
import styles from "./AuthenticationPage.module.scss";
import { Button } from "../../components/miscellaneous";
import Login from "../../components/Authentication/Login/Login";
import SignUp from "../../components/Authentication/SignUp/SignUp";
import CenterVerticalCardLayout from "../../layout/Card/Card";
import { useNavigate } from "react-router-dom";

const Authentication = (): JSX.Element => {
  const [isSignUpCardSelected, setIsSignUpScreenSelected] =
    useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const userData: Object = JSON.parse(
        localStorage.getItem("userInfo") || ""
      );
      if (userData) {
        navigate("/chats");
      }
    } catch (error) {}
  }, [navigate]);

  return (
    <CenterVerticalCardLayout isCenter={true}>
      <div className={`${styles.cardHeader}`}>Whatsapp</div>
      <div className={`${styles.cardSwitchContainer}`}>
        <Button
          onClick={() => {
            setIsSignUpScreenSelected(false);
          }}
          isSelected={isSignUpCardSelected}
          value={"Login"}
        />
        <Button
          onClick={() => {
            setIsSignUpScreenSelected(true);
          }}
          isSelected={!isSignUpCardSelected}
          value="Sign Up"
        />
      </div>
      <div className={`${styles.detailsContainer}`}>
        {!isSignUpCardSelected ? <Login /> : <SignUp />}
      </div>
    </CenterVerticalCardLayout>
  );
};

export default Authentication;
