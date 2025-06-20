REM ...existing code...
del "C:\Work\github.io\ridge\ridgejs\*.*" /Q /S

REM Sync folders to other places
xcopy "C:\Work\ridge\core\runtime" "C:\Work\github.io\ridge\core\ridgejs" /E /H /C /I /Y
xcopy "C:\Work\ridge\core\tools" "C:\Work\github.io\ridge\core\ridge-build" /E /H /C /I /Y
xcopy "C:\Work\ridge\core\externals" "C:\Work\github.io\ridge\core\ridge-externals" /E /H /C /I /Y
xcopy "C:\Work\ridge\components\container" "C:\Work\github.io\ridge\components\ridge-container" /E /H /C /I /Y
xcopy "C:\Work\ridge\components\semi" "C:\Work\github.io\ridge\components\ridge-semi" /E /H /C /I /Y
xcopy "C:\Work\ridge\components\bootstrap" "C:\Work\github.io\ridge\components\ridge-bootstrap" /E /H /C /I /Y
xcopy "C:\Work\ridge\components\highcharts" "C:\Work\github.io\ridge\components\ridge-highcharts" /E /H /C /I /Y
xcopy "C:\Work\ridge\components\marked" "C:\Work\github.io\ridge\components\ridge-marked" /E /H /C /I /Y
xcopy "C:\Work\ridge\components\material" "C:\Work\github.io\ridge\components\ridge-material" /E /H /C /I /Y
xcopy "C:\Work\ridge\components\antd" "C:\Work\github.io\ridge\components\ridge-antd" /E /H /C /I /Y

xcopy "C:\Work\ridge\public\npm\ridge-tutorial" "C:\Work\github.io\ridge\apps\ridge-tutorial" /E /H /C /I /Y
xcopy "C:\Work\ridge\public\npm\ridge-website" "C:\Work\github.io\ridge\apps\ridge-website" /E /H /C /I /Y
xcopy "C:\Work\ridge\public\npm\photo-china-poems" "C:\Work\github.io\ridge\apps\photo-china-poems" /E /H /C /I /Y
xcopy "C:\Work\ridge\public\npm\ridge-calculator" "C:\Work\github.io\ridge\apps\ridge-calculator" /E /H /C /I /Y

REM ...existing code...
