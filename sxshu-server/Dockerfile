FROM node:lts-alpine


# 设置容器内工作目录
WORKDIR /app

# 复制你的业务脚本（替换xx.js为实际文件名）
COPY . ./

# 暴露端口（若脚本监听端口，如3000；无监听则注释此行）
EXPOSE 7080

# 前台启动Node脚本（Docker监控此进程，必须前台运行）
CMD ["node", "./boot.js"]