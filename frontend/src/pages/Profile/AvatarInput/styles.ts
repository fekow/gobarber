import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  label {
    position: relative;
    cursor: pointer;
    span {
      display: none;
    }
    &:hover {
      opacity: 0.7;
      span {
        display: inherit;
        position: absolute;
        left: 37px;
        bottom: 17px;
        opacity: 0.7;
        font-weight: bold;
        font-size: 80px;
      }
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }
    input {
      display: none;
    }
  }
`;
