import styled from 'styled-components';

export const Container = styled.div`
  height: 92px;
  background: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  padding: 30px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 30px;
  padding-left: 30px;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 5px;
      font-size: 14px;
      color: #999;
    }
  }

  button {
    height: 42px;
    width: 71px;
    border-radius: 4px;
    border: 0;
    background: #d44059;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
`;
