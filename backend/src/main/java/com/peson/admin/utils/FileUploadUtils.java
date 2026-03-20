package com.peson.admin.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 文件上传工具类
 * 
 * @author peson
 * @since 2026-03-20
 */
@Slf4j
@Component
public class FileUploadUtils {

    /**
     * 默认上传路径
     */
    @Value("${peson.upload.path}")
    private String uploadPath;

    /**
     * 允许上传的后缀
     */
    @Value("${peson.upload.allowedExtensions}")
    private String allowedExtensions;

    /**
     * 最大文件大小
     */
    @Value("${peson.upload.maxSize}")
    private long maxSize;

    /**
     * 默认大小 10MB
     */
    public static final long DEFAULT_MAX_SIZE = 10 * 1024 * 1024;

    /**
     * 上传文件
     *
     * @param file 上传的文件
     * @return 文件信息
     * @throws IOException IO 异常
     */
    public Map<String, String> upload(MultipartFile file) throws IOException {
        // 验证文件
        this.validate(file);
        
        // 生成文件名
        String originalName = file.getOriginalFilename();
        String extension = getExtension(originalName);
        String fileName = generateFileName(extension);
        
        // 生成路径
        String filePath = generatePath();
        
        // 完整路径
        String fullPath = uploadPath + filePath;
        
        // 创建目录
        File dest = new File(fullPath);
        if (!dest.exists()) {
            if (!dest.mkdirs()) {
                throw new IOException("创建目录失败：" + fullPath);
            }
        }
        
        // 保存文件
        String saveFileName = UUID.randomUUID().toString().replace("-", "") + "." + extension;
        File saveFile = new File(fullPath + "/" + saveFileName);
        file.transferTo(saveFile);
        
        // 构建返回信息
        Map<String, String> result = new HashMap<>();
        result.put("fileName", saveFileName);
        result.put("originalName", originalName);
        result.put("filePath", fullPath + "/" + saveFileName);
        result.put("fileUrl", "/upload/" + filePath + "/" + saveFileName);
        result.put("fileType", getFileType(extension));
        result.put("fileSize", String.valueOf(file.getSize()));
        result.put("fileExt", extension);
        
        log.info("文件上传成功：{}, 路径：{}", originalName, result.get("fileUrl"));
        
        return result;
    }

    /**
     * 删除文件
     *
     * @param filePath 文件路径
     * @throws IOException IO 异常
     */
    public void delete(String filePath) throws IOException {
        File file = new File(filePath);
        if (file.exists() && file.isFile()) {
            if (!file.delete()) {
                throw new IOException("删除文件失败：" + filePath);
            }
            log.info("文件删除成功：{}", filePath);
        }
    }

    /**
     * 验证文件
     *
     * @param file 上传的文件
     */
    private void validate(MultipartFile file) {
        String originalName = file.getOriginalFilename();
        
        // 检查文件大小
        if (file.getSize() > maxSize) {
            throw new RuntimeException("文件大小超过限制：" + (maxSize / 1024 / 1024) + "MB");
        }
        
        // 检查后缀
        String extension = getExtension(originalName);
        List<String> allowedList = Arrays.asList(allowedExtensions.split(","));
        if (!allowedList.contains(extension.toLowerCase())) {
            throw new RuntimeException("不允许的文件类型：" + extension);
        }
    }

    /**
     * 获取文件扩展名
     *
     * @param fileName 文件名
     * @return 扩展名
     */
    private String getExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex == -1 || lastDotIndex == fileName.length() - 1) {
            return "";
        }
        return fileName.substring(lastDotIndex + 1).toLowerCase();
    }

    /**
     * 生成文件名
     *
     * @param extension 扩展名
     * @return 文件名
     */
    private String generateFileName(String extension) {
        return LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE) + "_" + 
               UUID.randomUUID().toString().replace("-", "") + "." + extension;
    }

    /**
     * 生成路径
     *
     * @return 路径
     */
    private String generatePath() {
        LocalDate date = LocalDate.now();
        return date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    /**
     * 获取文件类型
     *
     * @param extension 扩展名
     * @return 文件类型
     */
    private String getFileType(String extension) {
        if (extension == null || extension.isEmpty()) {
            return "other";
        }
        
        switch (extension.toLowerCase()) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "webp":
                return "image";
            case "pdf":
                return "pdf";
            case "doc":
            case "docx":
                return "word";
            case "xls":
            case "xlsx":
                return "excel";
            case "zip":
            case "rar":
                return "archive";
            default:
                return "other";
        }
    }
}
