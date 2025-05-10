import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../services/getAuth";
import { useSession } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import classes from "./Login.module.scss";

interface LoginFormData {
  username: string;
  password: string;
}

const mockSuperAdmin = {
  username: "superadmin@example.com",
  password: "superadmin123!",
};

const mockVisualuizer = {
  username: "visualizer1@example.com",
  password: "vis1pass456@",
};

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>(mockSuperAdmin);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useSession();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      const { username, password } = formData;
      const response = await getAuth(username, password);
      login(response);
      navigate("/orders");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    }
  }, [formData, login, navigate]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("handleSubmit");
      handleLogin();
    },
    [handleLogin]
  );

  return (
    <div className={classes.Login}>
      <section className={classes.Login__container}>
        <h1 className={classes.Login__title}>Platzi order</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className={classes.Login__input}
        />
        <form onSubmit={handleSubmit}>
          <div className={classes.Login__passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={classes.Login__input}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={classes.Login__togglePassword}
            >
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          {errorMessage && (
            <p className={classes.Login__errorMsg}>{errorMessage}</p>
          )}
          <Button label="Login" type="submit" />
        </form>
      </section>
    </div>
  );
};
