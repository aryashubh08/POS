import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/api/v1/auth/getUserData", {
          withCredentials: true,
        });
        dispatch(setUser(data.user));
      } catch (error) {
        dispatch(removeUser());
        navigate("/auth");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  return isLoading;
};

export default useLoadData;
