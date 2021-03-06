import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;
export const Content = styled.div`
  display: flex;
  height: 64px;
  /* IMPORTANTE ISSO E BEM LEGAL */
  max-width: 900px;
  margin: 0 auto;
  /* deixa no centro horizontal */
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    align-items: center;
    img {
      /* faz efeito risquinho depois */
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
    a {
      font-weight: bold;
      color: #7159c1;
    }
  }
  /* pras notificações ficarem ao lado e centralizadas */
  aside {
    display: flex;
    align-items: center;
  }
`;
export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      /* esse display block faz ocupar a linha toda e nao ficar um do lado do outro!!!!! */
      display: block;
      font-size: 14px;
      color: #333;
    }
    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
`;
