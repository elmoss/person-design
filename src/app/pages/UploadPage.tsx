import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PhotoUpload } from '../components/PhotoUpload';
import { AnalyzingState } from '../components/AnalyzingState';
import { analyzeStyle } from '../utils/styleAnalyzer';
import { LogOut } from 'lucide-react';
import { motion } from 'motion/react';

type PageState = 'upload' | 'analyzing';

export function UploadPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<PageState>('upload');
  const [photoUrl, setPhotoUrl] = useState<string>('');

  useEffect(() => {
    // 检查是否已登录
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const handlePhotoSelect = async (file: File) => {
    // Create URL for the uploaded photo
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    
    // Move to analyzing state
    setState('analyzing');
    
    // Simulate AI analysis
    const result = await analyzeStyle();
    
    // 保存结果并导航到结果页面
    localStorage.setItem('photoUrl', url);
    localStorage.setItem('styleData', JSON.stringify(result));
    navigate('/result');
  };

  const handleLogout = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="fixed top-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 border border-gray-200"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm">退出登录</span>
      </motion.button>

      <div className="w-full flex items-center justify-center">
        {state === 'upload' && (
          <PhotoUpload onPhotoSelect={handlePhotoSelect} />
        )}
        
        {state === 'analyzing' && photoUrl && (
          <AnalyzingState photoUrl={photoUrl} />
        )}
      </div>
    </div>
  );
}
