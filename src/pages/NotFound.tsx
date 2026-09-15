import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-stellar-500 mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 bg-stellar-500 hover:bg-stellar-600 text-white rounded-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
