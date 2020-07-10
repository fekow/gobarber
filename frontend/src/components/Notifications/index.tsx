import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';
import api from 'services/api';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdNotifications } from 'react-icons/md';

interface Notifications {
  _id: string;
  read: boolean;
  content: string;
  createdAt: string;
  timeDistance?: string;
}

const Notifications: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  // faço esse calculo toda vez que tiver alteração nesse state
  const hasUnread = useMemo(
    // faz me retornar um valor Booleano, baseado se existe ou nao!!!!!!!!!!!
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );
  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('/notifications');

      const data = response.data.map((notification: Notifications) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  async function handleMarkAsRead(id: string) {
    await api.put(`/notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id
          ? { ...notification, read: true }
          : { ...notification }
      )
    );
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge hasUnread={hasUnread} onClick={handleToggleVisible}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification._id)}
                  type="button"
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
};

export default Notifications;
