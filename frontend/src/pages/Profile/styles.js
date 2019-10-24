import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    min-width: 315px;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 50px;
    padding: 0 15px;
    color: #fff;
    margin: 0 0 10px;
    font-size: 18px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 20px 0 20px;
  }

  button {
    align-self: flex-end;
    margin: 5px 0 0;
    width: 162px;
    height: 42px;
    background: #f94d6a;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#f94d6a')};
    }
  }
`;
