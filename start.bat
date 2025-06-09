@echo off
echo 正在启动生日惊喜预览网页服务器...
echo.
echo 请确保您已将礼物图片保存为images/gift.png
echo.
echo 服务器启动后，请在手机浏览器中访问:
echo   http://[您电脑的IP地址]:8000
echo.
echo 提示: 要找到您电脑的IP地址，可以在命令提示符中运行 "ipconfig" 命令
echo       然后查找"IPv4 地址"
echo.
echo 按Ctrl+C可以停止服务器
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    py --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo 错误: 未检测到Python安装。
        echo 请安装Python或使用其他HTTP服务器工具。
        echo 您也可以直接在浏览器中打开index.html文件，但某些功能可能无法正常工作。
        echo.
        pause
        exit /b
    ) else (
        py -m http.server 8000
    )
) else (
    python -m http.server 8000
)

pause 