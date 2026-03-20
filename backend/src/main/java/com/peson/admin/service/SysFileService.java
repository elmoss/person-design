package com.peson.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.peson.admin.entity.SysFile;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件服务接口
 * 
 * @author peson
 * @since 2026-03-20
 */
public interface SysFileService extends IService<SysFile> {

    /**
     * 上传文件
     * 
     * @param file 上传的文件
     * @param uploadBy 上传者 ID
     * @return 文件信息
     */
    SysFile uploadFile(MultipartFile file, Long uploadBy);

    /**
     * 删除文件
     * 
     * @param fileId 文件 ID
     */
    void deleteFile(Long fileId);
}
