import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';
export const Container = styled.div`
  position: relative;
`;
export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
  /* CRIA UMA BOLINHA BONITINHA */
  ${(props: { hasUnread: boolean }) =>
    props.hasUnread &&
    css`
      &&::after {
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff892e;
        content: '';
        border-radius: 50%;
      }
    `}
`;
export const NotificationList = styled.div`
  /* coloco como dependente do badge e calculo a posisao a partir da metade da largura
isso deixa a div exatamente no meio  */
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 15px 5px;
  /* FAZ AQUELE TRIANGULO MALUCO */
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: calc(50% - 20px);
    top: -20px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }
  display: ${(props: { visible: boolean }) =>
    props.visible ? 'block' : 'none'};
`;

export const Notification = styled.div`
  color: white;

  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }
  time {
    font-size: 12px;
    opacity: 0.6;
    display: block;
    margin-bottom: 5px;
  }
  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }
  /* faz a bolinha do nao lido */
  ${(props: { unread?: boolean }) =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #ff892e;
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;
export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;
