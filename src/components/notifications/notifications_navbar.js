import React, { useState } from 'react';
import './../../styles/Notification.css'; // Estilos CSS para el componente de notificación

const NotificationsDropdown = ({ isOpen, notifications }) => {
    return (
      <div className={`notifications-dropdown ${isOpen ? 'open' : 'closed'}`}>
        {isOpen &&
          notifications.map((notification) => (
            <div className="notification-item" key={notification.id}>
              {notification.text}
            </div>
          ))}
      </div>
    );
  };
  
  export default NotificationsDropdown;
