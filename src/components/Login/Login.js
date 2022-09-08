import React, {
  // useState,
  useReducer,
  // useEffect,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  const { value } = state;
  const { type, val } = action;
  switch (type) {
    case "USER_INPUT":
      return { value: val, isValid: val.includes("@") };

    case "INPUT_BLUR":
      return { value, isValid: value.includes("@") };

    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  const { value } = state;
  const { type, val } = action;
  switch (type) {
    case "USER_INPUT":
      return { value: val, isValid: val.trim().length > 6 };

    case "INPUT_BLUR":
      return { value, isValid: value.trim().length > 6 };

    default:
      return { value: "", isValid: false };
  }
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const { onLogin } = useContext(AuthContext);

  // const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: isValidEmail } = emailState;
  const { isValid: isValidPassword } = passwordState;

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // useEffect(() => {
  //   const validateForm = setTimeout(() => {
  //     console.log("CHECK VALID FORM");
  //     setFormIsValid(isValidEmail && isValidPassword);
  //   }, 1000);

  //   return () => {
  //     console.log("CLEANUP");
  //     clearTimeout(validateForm);
  //   };
  // }, [isValidEmail, isValidPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isValidEmail) {
      emailInputRef.current.focus();
      return;
    }
    if (!isValidPassword) {
      passwordInputRef.current.focus();
      return;
    }
    onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          type="email"
          content="E-Mail"
          isValid={emailState.isValid}
          label={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          type="password"
          content="Password"
          isValid={passwordState.isValid}
          label={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
