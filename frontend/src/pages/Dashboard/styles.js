import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 52px auto;

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

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 42px;
      width: 172px;
      border-radius: 4px;
      border: 0;
      background: #d44059;
      color: #fff;

      p {
        font-size: 16px;
        font-weight: bold;
        margin-left: 12px;
      }
    }
  }
`;

export const MeetupList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  border-radius: 4px;
  height: 62px;
  cursor: pointer;

  strong {
    color: #fff;
    margin: 25px;
    font-size: 18px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 20px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;
