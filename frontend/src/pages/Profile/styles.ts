import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`;

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 8px;
      box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 10px 20px;
    }
    button {
      border: 0;
      text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
      border-radius: 8px;
      height: 44px;
      margin-top: 5px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      transition: background 0.2s ease-in-out;
      box-shadow: inset 0 0 20px 10px rgba(0, 0, 0, 0.1);
      &:hover {
        background: ${darken(0.05, '#3b9eff')};
      }
      &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
      }
      svg {
        animation: ${rotate} 1s linear infinite;
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
  > button {
    width: 100%;
    border: 0;
    text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    height: 44px;
    margin: 10px 0 0;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    transition: background 0.2s ease-in-out;
    box-shadow: inset 0 0 20px 10px rgba(0, 0, 0, 0.1);
    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;
