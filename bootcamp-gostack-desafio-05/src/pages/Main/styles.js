import styled, { keyframes, css } from 'styled-components';

const bounce = keyframes`
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
    `;

export const Form = styled.form.attrs(props => ({
  error: props.error,
}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1; /* Ocupar todo o espaço no div*/
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;

    ${props =>
      props.error &&
      css`
        border: 1px solid #ff2934;
        animation: ${bounce};
        animation-duration: 0.5s;
        animation-delay: 0.25s;
      `}
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    /**
    * Applies styling to all li's minus on the first
    */
    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;

export const Error = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 40px;
  color: #ff2934;
  border-radius: 5%;
`;

/*
font-size: 24px;
  color: ${props => (props.error ? 'red' : '#7159c1')};
  font-family: Arial, Helvetica, sans-serif;

  small {
    font-size: 14px;
    color: #333;
  }
  */
