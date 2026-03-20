import { motion } from 'motion/react';
import { Sparkles, Heart, ShoppingBag, RefreshCw, Share2 } from 'lucide-react';

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

interface StyleResultProps {
  photoUrl: string;
  styleData: StyleData;
  onRetry: () => void;
}

export function StyleResult({ photoUrl, styleData, onRetry }: StyleResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <h1>您的专属风格诊断</h1>
          </div>
          <p className="text-gray-600">基于智能分析为您打造个性化穿搭方案</p>
        </motion.div>

        {/* Main Style Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-6 md:p-10 mb-8 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0"
            >
              <img src={photoUrl} alt="User" className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <Heart className="w-5 h-5" />
                <span className="text-sm opacity-90">您的风格类型</span>
              </div>
              <h2 className="mb-3 text-3xl md:text-4xl">{styleData.mainStyle}</h2>
              <p className="text-white/90 leading-relaxed text-lg">{styleData.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Traits */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-4 md:mb-6 flex items-center gap-2 text-xl md:text-2xl">
              <Sparkles className="w-6 h-6 text-purple-500" />
              风格特点
            </h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {styleData.traits.map((trait, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 md:p-6 text-center border border-purple-100"
                >
                  <span className="text-purple-900 text-base md:text-lg">{trait}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Color Palette */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="mb-4 md:mb-6 text-xl md:text-2xl">专属色彩搭配</h3>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 h-full flex items-center">
              <div className="flex gap-3 md:gap-4 justify-center flex-wrap w-full">
                {styleData.colorPalette.map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md border-2 border-white ring-2 ring-gray-200"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-gray-600">{color}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="mb-4 md:mb-6 flex items-center gap-2 text-xl md:text-2xl">
            <ShoppingBag className="w-6 h-6 text-purple-500" />
            穿搭建议
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {styleData.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className="h-56 md:h-64 overflow-hidden bg-gray-100">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h4 className="mb-4 text-lg md:text-xl">{rec.title}</h4>
                  <ul className="space-y-2">
                    {rec.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm md:text-base text-gray-600">
                        <span className="text-purple-500 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <h3 className="mb-4 md:mb-6 text-xl md:text-2xl">搭配小技巧</h3>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-100">
            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              {styleData.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-amber-600 text-lg flex-shrink-0">✨</span>
                  <p className="text-gray-700 text-sm md:text-base">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-purple-500 text-purple-600 rounded-full shadow-sm hover:bg-purple-50 transition-colors text-base md:text-lg"
          >
            <RefreshCw className="w-5 h-5" />
            重新诊断
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-shadow text-base md:text-lg"
          >
            <Share2 className="w-5 h-5" />
            分享结果
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}