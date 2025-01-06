import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ImageClassifier from './components/ImageClassifier';
// import AdminHistory from './components/admin/AdminHistory';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                  Classifier
                </Link>
{/*                 <Link to="/admin" className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900">
                  History
                </Link> */}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<ImageClassifier />} />
{/*           <Route path="/admin" element={<AdminHistory />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
