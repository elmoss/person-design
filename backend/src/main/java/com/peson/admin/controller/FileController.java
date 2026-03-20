package com.peson.admin.controller;

import com.peson.admin.common.Result;
import com.peson.admin.entity.SysFile;
import com.peson.admin.service.SysFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件管理控制器
 * 
 * @author peson
 * @since 2026-03-20
 */
@Slf4j
@RestController
@RequestMapping("/file")
@RequiredArgsConstructor
public class FileController {

    private final SysFileService fileService;

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    public Result<SysFile> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // 假设当前用户 ID 为 1，实际应该从登录信息中获取
            Long userId = 1L;
            SysFile sysFile = fileService.uploadFile(file, userId);
            return Result.success("文件上传成功", sysFile);
        } catch (Exception e) {
            log.error("文件上传失败", e);
            return Result.error("文件上传失败：" + e.getMessage());
        }
    }

    /**
     * 根据 ID 删除文件
     */
    @DeleteMapping("/{id}")
    public Result<String> deleteFile(@PathVariable Long id) {
        try {
            fileService.deleteFile(id);
            return Result.success("文件删除成功", "");
        } catch (Exception e) {
            log.error("文件删除失败", e);
            return Result.error("文件删除失败：" + e.getMessage());
        }
    }

    /**
     * 根据 ID 查询文件信息
     */
    @GetMapping("/{id}")
    public Result<SysFile> getFileById(@PathVariable Long id) {
        try {
            SysFile sysFile = fileService.getById(id);
            if (sysFile == null) {
                return Result.error("文件不存在");
            }
            return Result.success(sysFile);
        } catch (Exception e) {
            log.error("查询文件失败", e);
            return Result.error("查询文件失败：" + e.getMessage());
        }
    }
}
