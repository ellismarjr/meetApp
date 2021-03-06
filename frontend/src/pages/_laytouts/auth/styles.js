import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(180deg, #22202c, #402845);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 50px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 15px;
    font-size: 18px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  button {
    margin: 5px 0 0;
    height: 50px;
    background: #f94d6a;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#f94d6a')};
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
`;
