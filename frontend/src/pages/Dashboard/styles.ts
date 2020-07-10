import styled, { keyframes } from 'styled-components';

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

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }
    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
  > svg {
    animation: ${rotate} 1.5s linear infinite;
    align-self: center;
    margin-top: 30px;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  opacity: ${(props: { available?: boolean; past?: boolean }) =>
    props.past ? '0.5' : '1'};
  strong {
    display: block;
    color: ${(props: { past?: boolean; available?: boolean }) =>
      props.available ? '#999' : '#7159c1'};
    font-size: 20px;
    font-weight: normal;
  }
  span {
    display: block;
    margin-top: 3px;
    color: ${(props: { past?: boolean; available?: boolean }) =>
      props.available ? '#999' : '#666'};
  }
`;
