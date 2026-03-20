import { motion } from 'motion/react';
import { Sparkles, Palette, Shirt, TrendingUp } from 'lucide-react';

interface AnalyzingStateProps {
  photoUrl: string;
}

export function AnalyzingState({ photoUrl }: AnalyzingStateProps) {
  const steps = [
    { icon: Sparkles, text: '面部特征分析中...', color: 'text-pink-500' },
    { icon: Palette, text: '肤色与色彩匹配...', color: 'text-purple-500' },
    { icon: Shirt, text: '风格类型识别...', color: 'text-blue-500' },
    { icon: TrendingUp, text: '生成个性化建议...', color: 'text-green-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-200"
        >
          <img
            src={photoUrl}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <h2 className="mb-2">正在分析您的形象风格</h2>
        <p className="text-gray-600">AI 正在为您量身定制穿搭建议</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3 }}
            className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                delay: index * 0.3,
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 1.2,
              }}
            >
              <step.icon className={`w-6 h-6 ${step.color}`} />
            </motion.div>
            <span className="text-gray-700">{step.text}</span>
            <motion.div
              className="ml-auto flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3 + 0.2 }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-gray-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    delay: index * 0.3 + dot * 0.1,
                    duration: 0.6,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-purple-700">预计完成时间：3秒</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
