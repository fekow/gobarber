import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`;
export const Content = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: center;
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
`;
