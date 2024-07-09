import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const IsAuthenticated = () => {
  const [isAuth, setIsAuth] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  return <div>{isAuth ? <Outlet /> : navigate("/signin")}</div>;
};

export default IsAuthenticated;
