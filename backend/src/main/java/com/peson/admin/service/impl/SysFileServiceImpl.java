package com.peson.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.peson.admin.entity.SysFile;
import com.peson.admin.mapper.SysFileMapper;
import com.peson.admin.service.SysFileService;
import com.peson.admin.utils.FileUploadUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * 文件服务实现类
 * 
 * @author peson
 * @since 2026-03-20
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SysFileServiceImpl extends ServiceImpl<SysFileMapper, SysFile> implements SysFileService {

    private final FileUploadUtils fileUploadUtils;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public SysFile uploadFile(MultipartFile file, Long uploadBy) {
        try {
            // 上传文件
            Map<String, String> uploadInfo = fileUploadUtils.upload(file);
            
            // 创建文件记录
            SysFile sysFile = new SysFile();
            sysFile.setFileName(uploadInfo.get("fileName"));
            sysFile.setOriginalName(uploadInfo.get("originalName"));
            sysFile.setFilePath(uploadInfo.get("filePath"));
            sysFile.setFileUrl(uploadInfo.get("fileUrl"));
            sysFile.setFileType(uploadInfo.get("fileType"));
            sysFile.setFileSize(Long.parseLong(uploadInfo.get("fileSize")));
            sysFile.setFileExt(uploadInfo.get("fileExt"));
            sysFile.setUploadBy(uploadBy);
            
            this.save(sysFile);
            
            log.info("文件上传成功：{}", sysFile.getOriginalName());
            return sysFile;
            
        } catch (IOException e) {
            log.error("文件上传失败", e);
            throw new RuntimeException("文件上传失败：" + e.getMessage());
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteFile(Long fileId) {
        SysFile sysFile = this.getById(fileId);
        if (sysFile == null) {
            throw new RuntimeException("文件不存在");
        }
        
        // 删除物理文件
        try {
            fileUploadUtils.delete(sysFile.getFilePath());
        } catch (IOException e) {
            log.error("删除物理文件失败", e);
        }
        
        // 删除数据库记录
        this.removeById(fileId);
        
        log.info("文件删除成功：{}", sysFile.getOriginalName());
    }
}
