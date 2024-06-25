import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1.Load the authenticated user

  const { isLoading, isAuthenticated } = useUser();

  //3.If there is not authenticated user redirect to the login page

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //2.While Loading show a spinner
  if (isLoading) {
    return (
      <FullSpinner>
        <Spinner />
      </FullSpinner>
    );
  }

  //4. if there is a user render the app
  console.log(isAuthenticated);
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
