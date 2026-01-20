param(
    [string]$User = "root",
    [string]$Password,
    [string]$DbName = "financial_crm_db"
)

$workspace = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$usersSql = Join-Path $workspace "financial_crm_db_users.sql"
$ticketsSql = Join-Path $workspace "financial_crm_db_tickets.sql"

if (-not (Get-Command mysql -ErrorAction SilentlyContinue)) {
    Write-Host "MySQL CLI (mysql) not found. Install MySQL server first." -ForegroundColor Yellow
    exit 1
}

Write-Host "Creating database '$DbName'..."
if ($Password) {
    cmd /c "mysql -u $User -p$Password -e \"CREATE DATABASE IF NOT EXISTS $DbName;\""
} else {
    cmd /c "mysql -u $User -e \"CREATE DATABASE IF NOT EXISTS $DbName;\""
}

Write-Host "Importing users schema/data..." -ForegroundColor Cyan
if ($Password) {
    cmd /c "mysql -u $User -p$Password $DbName < \"$usersSql\""
} else {
    cmd /c "mysql -u $User $DbName < \"$usersSql\""
}

Write-Host "Importing tickets schema/data..." -ForegroundColor Cyan
if ($Password) {
    cmd /c "mysql -u $User -p$Password $DbName < \"$ticketsSql\""
} else {
    cmd /c "mysql -u $User $DbName < \"$ticketsSql\""
}

Write-Host "Import complete." -ForegroundColor Green
