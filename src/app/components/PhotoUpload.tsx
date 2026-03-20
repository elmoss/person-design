import { Upload, Camera } from 'lucide-react';
import { motion } from 'motion/react';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
}

export function PhotoUpload({ onPhotoSelect }: PhotoUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-4"
        >
          <Camera className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="mb-2">形象风格诊断</h1>
        <p className="text-gray-600">上传您的照片，获得专属穿搭风格建议</p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gradient-to-b from-white to-purple-50/30"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="photo-upload"
        />
        <Upload className="w-12 h-12 mx-auto mb-4 text-purple-500" />
        <p className="mb-2 text-gray-700">点击或拖拽上传照片</p>
        <p className="text-sm text-gray-500">支持 JPG、PNG 格式</p>
      </div>

      <div className="mt-6 flex items-start gap-2 p-4 bg-blue-50 rounded-lg">
        <div className="text-blue-500 mt-0.5">💡</div>
        <p className="text-sm text-blue-900">
          为获得最佳效果，建议上传清晰的正面照片，光线充足且背景简洁。
        </p>
      </div>
    </motion.div>
  );
}
