import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/AuthService";

export default function LoginPage({onLogin}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(values) {
    const { email, password } = values;
    let username = sessionStorage.getItem("username");
    let passwrd =  sessionStorage.getItem("password");
      if (username === null && passwrd === null) {
      AuthService.login(email, password);
      onLogin()
      navigate("/agspert/homepage");
    } else if (username !== email || passwrd !== password) {
      AuthService.login(email, password);
      onLogin()
      navigate("/agspert/homepage");
    } else {
      onLogin()
      navigate("/agspert/homepage");
    }
  }

  return (
      <Flex bg="gray.100" align="center" justify="center" h="100vh">
        <Box bg="white" p={4} rounded="md" w={80}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl m={1} isInvalid={errors.email}>
              <FormLabel htmlFor="email">Username</FormLabel>
              <Input
                id="email"
                placeholder="Username/email"
                {...register("email", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl m={1} isInvalid={errors.password}>
              <FormLabel htmlFor="passowrd">Passoword</FormLabel>
              <Input
                id="passowrd"
                placeholder="password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 6,
                    message: "Minimum length should be 6",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Box>
      </Flex>
  );
}
