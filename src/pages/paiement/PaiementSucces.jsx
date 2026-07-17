// ============================================
// Lokatun — Page Paiement Succès
// ============================================
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import api from '../../api/axios';

const PaiementSucces = () => {
  const { id, type } = useParams();
  const [searchParams] = useSearchParams();
  const paymentRef = searchParams.get('payment_ref');
  const [statut, setStatut] = useState('chargement');

  useEffect(() => {
    const confirmer = async () => {
      try {
        await api.get(`/paiement/succes/${id}/${type}?payment_ref=${paymentRef}`);
        setStatut('succes');
      } catch {
        setStatut('erreur');
      }
    };
    if (paymentRef) confirmer();
    else setStatut('succes');
  }, []);

  if (statut === 'chargement') return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
      <div className="card p-8 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold text-secondary-500 mb-2">
          Paiement réussi !
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {type === 'locataire'
            ? 'Vos frais ont été confirmés. Le contact du propriétaire est maintenant disponible.'
            : 'Votre commission a été confirmée. Vous pouvez maintenant terminer la location.'
          }
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to={type === 'locataire' ? '/mes-reservations' : '/reservations-recues'}
            className="btn-primary"
          >
            {type === 'locataire' ? 'Voir mes réservations' : 'Voir mes locations'}
          </Link>
          <Link to="/annonces" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition">
            Retour aux annonces
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaiementSucces;