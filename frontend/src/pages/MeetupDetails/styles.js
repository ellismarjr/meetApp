import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 52px auto;
  height: 100%;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    div {
      display: flex;
      justify-content: center;

      button#edit {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 42px;
        width: 116px;
        border-radius: 4px;
        border: 0;
        color: #fff;
        background: #4dbaf9;

        p {
          font-size: 16px;
          font-weight: bold;
          margin-left: 12px;
        }
      }

      button#delete {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 42px;
        width: 116px;
        border-radius: 4px;
        border: 0;
        background: #d44059;

        color: #fff;
        margin-left: 15px;

        p {
          font-size: 16px;
          font-weight: bold;
          margin-left: 12px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 52px auto;

  img {
    width: 940px;
    height: 300px;
    border-radius: 4px;
  }

  p {
    margin-top: 25px;
    font-size: 18px;
    color: #fff;
    font-weight: normal;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  opacity: 0.6;

  time {
    display: flex;
    align-items: center;
    margin-right: 30px;

    p {
      font-size: 16px;
      color: #fff;
      margin-left: 8px;
    }
  }

  p {
    display: flex;
    align-items: center;

    span {
      font-size: 16px;
      color: #fff;
      margin-left: 8px;
    }
  }
`;
