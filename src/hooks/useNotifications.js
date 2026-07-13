// ============================================
// Lokatun — Hook Notifications
// ============================================
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const useNotifications = () => {
  const { utilisateur } = useAuth();
  const [notifications, setNotifications] = useState({
    enAttente: 0,
    payees: 0,
    aPayerLocataire: 0,
    total: 0,
  });

  const charger = async () => {
    if (!utilisateur) return;
    try {
      const res = await api.get('/reservations/notifications');
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    charger();
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(charger, 30000);
    return () => clearInterval(interval);
  }, [utilisateur]);

  return { notifications, rafraichir: charger };
};

export default useNotifications;