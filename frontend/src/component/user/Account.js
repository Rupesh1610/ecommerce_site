import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./account.css";
import Loading from "../layout/loader/Loading";

const Account = () => {
  const { user, status, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("inside if");
      navigate("/login");
    }
    console.log("outside if");
  }, [navigate, isAuthenticated]);
  return (
    <>
      {status === "loading" ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
