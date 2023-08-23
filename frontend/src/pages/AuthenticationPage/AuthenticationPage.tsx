import { useState, useEffect } from "react";
import styles from "./AuthenticationPage.module.scss";
import { Button } from "../../components/miscellaneous";
import Login from "../../components/Authentication/Login/Login";
import SignUp from "../../components/Authentication/SignUp/SignUp";
import CenterVerticalCardLayout from "../../layout/Card/Card";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { useChatState } from "../../context/ChatProvider";

const Authentication = (): JSX.Element => {
  const [isSignUpCardSelected, setIsSignUpScreenSelected] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const { user, setUser }: any = useChatState();

  //! feature implementation
  //! imp code start
  // const callLoginApi = async (payload: any) => {
  //   if (!payload) {
  //     return;
  //   }

  //   try {
  //     // const decode = jwt.verify(token, process.env.JWT_SECRET || "");
  //     const axiosConfig: AxiosRequestConfig<any> = {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const { data } = await axios.post(
  //       "/api/user/login",
  //       {
  //         email: payload.email,
  //         password: "12345678",
  //       },
  //       axiosConfig
  //     );
  //     if (data) {
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //       setUser(data);
  //       // navigate("/chats");
  //     }
  //   } catch (e: any) {
  //   } finally {
  //   }
  // };
  //! imp code end

  useEffect(() => {
    try {
      const userData: Object = JSON.parse(
        localStorage.getItem("userInfo") || ""
      );
      if (userData) {
        // callLoginApi(userData);
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
