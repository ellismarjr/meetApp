import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  align-self: stretch;

  label {
    cursor: pointer;
    width: 100%;
    height: 300px;

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 50px 0;
      z-index: 3;
    }

    h2 {
      color: rgba(255, 255, 255, 0.3);
    }

    input {
      display: none;
    }
  }
`;
