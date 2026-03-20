import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { StyleResult } from '../components/StyleResult';
import { LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface StyleData {
  mainStyle: string;
  description: string;
  traits: string[];
  colorPalette: string[];
  recommendations: {
    title: string;
    items: string[];
    image: string;
  }[];
  tips: string[];
}

export function ResultPage() {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [styleData, setStyleData] = useState<StyleData | null>(null);

  useEffect(() => {
    // 检查是否已登录
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    // 获取保存的结果数据
    const savedPhotoUrl = localStorage.getItem('photoUrl');
    const savedStyleData = localStorage.getItem('styleData');

    if (!savedPhotoUrl || !savedStyleData) {
      navigate('/upload');
      return;
    }

    setPhotoUrl(savedPhotoUrl);
    setStyleData(JSON.parse(savedStyleData));
  }, [navigate]);

  const handleRetry = () => {
    navigate('/upload');
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
    localStorage.removeItem('photoUrl');
    localStorage.removeItem('styleData');
    navigate('/');
  };

  if (!photoUrl || !styleData) {
    return null;
  }

  return (
    <div className="relative">
      {/* Logout Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 border border-gray-200"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm">退出登录</span>
      </motion.button>

      <StyleResult 
        photoUrl={photoUrl} 
        styleData={styleData}
        onRetry={handleRetry}
      />
    </div>
  );
}
