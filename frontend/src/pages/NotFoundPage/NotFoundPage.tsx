import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }, [navigate]);
  return <></>;
}
