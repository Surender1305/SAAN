Write-Host "Updating Mobi Asset..." -ForegroundColor Cyan
Set-Location "..\MobiAssetProductWebsite"
npm run build
Copy-Item "dist\index.html" "..\CompanyWebsite-main\public\DeviceManagerProductWebsite-main\index.html" -Force
if (Test-Path "public\logo.png") {
    Copy-Item "public\logo.png" "..\CompanyWebsite-main\public\DeviceManagerProductWebsite-main\logo.png" -Force
}

Write-Host "Updating Inspectra..." -ForegroundColor Cyan
Set-Location "..\InspectraProductWebsite"
npm run build
Copy-Item "dist\index.html" "..\CompanyWebsite-main\public\SafetyMonitorProductWebsite-main\index.html" -Force
if (Test-Path "public\logo.png") {
    Copy-Item "public\logo.png" "..\CompanyWebsite-main\public\SafetyMonitorProductWebsite-main\logo.png" -Force
}

Write-Host "Updating Asset Guard..." -ForegroundColor Cyan
Set-Location "..\AssetGuardProductWebsite"
npm run build
Copy-Item "dist\index.html" "..\CompanyWebsite-main\public\AssetManagerProductWebsite-main\index.html" -Force
if (Test-Path "public\logo.png") {
    Copy-Item "public\logo.png" "..\CompanyWebsite-main\public\AssetManagerProductWebsite-main\logo.png" -Force
}

Set-Location "..\CompanyWebsite-main"
Write-Host "All product websites have been successfully rebuilt and synced to the main website!" -ForegroundColor Green
