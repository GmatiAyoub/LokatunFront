// ============================================
// Lokatun — Page Paiement Échec
// ============================================
import { useParams, Link } from 'react-router-dom';

const PaiementEchec = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
      <div className="card p-8 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">❌</span>
        </div>
        <h2 className="text-2xl font-bold text-secondary-500 mb-2">
          Paiement échoué
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Le paiement n'a pas pu être effectué. Veuillez réessayer.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to={`/paiement/${id}`}
            className="btn-primary"
          >
            Réessayer
          </Link>
          <Link to="/mes-reservations" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition">
            Mes réservations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaiementEchec;