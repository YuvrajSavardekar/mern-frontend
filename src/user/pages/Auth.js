import React, { useState, useContext } from "react";
import axios from "axios";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLogiMode] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      // switching from signup to login
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // switching from login to signup
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLogiMode((preMode) => !preMode);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    if (isLoginMode) {
      try {
        // in axios 1st argu is URL 2nd body and 3rd is options where we can pass headers
        // let response = await axios.post(
        //   "http://localhost:5000/api/users/login",
        //   JSON.stringify({
        //     email: formState.inputs.email.value,
        //     password: formState.inputs.password.value,
        //   }),
        //   {
        //     headers: {
              // "Content-Type": "application/json",
            // },
            // if axios detects we send response with status > 400 then will throw its own error
            // so our msg not shown from backend, validate status and throw manualy in if() block
            // if there is response.status > 400
            // validateStatus: (status) => status < 510,
            // signal: null

          // }
        // );
        await sendRequest({
          url: "http://localhost:5000/api/users/login",
          method: "POST",
          data: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          header: { 
            "Content-Type": "application/json" 
          },
          // signal: null,
          validateStatus: (status) => status < 510
        });
        // in axios incoming response in served as plain JS object
        // so, no need to parse like response.json()
        // const responseData = response.data;
        // console.log(responseData);
        // if (response.status > 400) {
        // throw new Error(responseData.message);
        // }

        // setIsLoading(false);
        auth.login();
      } catch (err) {
        // setIsLoading(false);
        // setError(err.message);
      }
    }
    // } else {
      // try {
        // let response = await axios.post(
          // "http://localhost:5000/api/users/signup",
          // JSON.stringify({
          //   name: formState.inputs.name.value,
            // email: formState.inputs.email.value,
            // password: formState.inputs.password.value,
          // }),
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     validateStatus: (status) => status < 510,
        //   }
        // );

        // const responseData = response.data;
        // console.log(responseData);
        // if (response.status > 400) {
        //   throw new Error(responseData.message);
        // }

        // setIsLoading(false);
        // auth.login();
      // } catch (err) {
        // setIsLoading(false);
        // setError(err.message);
      // }
    // }
  };

  const errorHandler = () => {
    // setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SINGUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
