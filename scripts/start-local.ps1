$ErrorActionPreference = 'Stop'

try {
    $projectRoot = Split-Path -Parent $PSScriptRoot
    Set-Location -LiteralPath $projectRoot

    $nodeCommand = Get-Command node -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    $nodePath = if ($nodeCommand) { $nodeCommand.Source } else { $null }

    if (-not $nodePath) {
        $bundledNode = Join-Path -Path $env:USERPROFILE -ChildPath '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
        if (Test-Path -LiteralPath $bundledNode -PathType Leaf) {
            $nodePath = $bundledNode
        }
    }

    if (-not $nodePath) {
        throw 'Не найден Node.js. Установите Node.js LTS с сайта nodejs.org, затем повторите запуск. Подробные шаги есть в README.md.'
    }

    $nodeVersion = & $nodePath -p 'process.versions.node'
    if ($LASTEXITCODE -ne 0) {
        throw 'Не удалось запустить Node.js. Установите Node.js LTS с сайта nodejs.org и повторите запуск.'
    }

    $versionParts = $nodeVersion.Trim().Split('.')
    if ([int]$versionParts[0] -lt 20 -or ([int]$versionParts[0] -eq 20 -and [int]$versionParts[1] -lt 9)) {
        throw 'Установленная версия Node.js слишком старая. Нужна версия 20.9 или новее. Установите Node.js LTS с сайта nodejs.org.'
    }

    $nextPath = Join-Path -Path $projectRoot -ChildPath 'node_modules\next\dist\bin\next'
    if (-not (Test-Path -LiteralPath $nextPath -PathType Leaf)) {
        throw 'Не найдены зависимости проекта. Откройте README.md и выполните обычный запуск: npm install, затем npm run dev. Для этого нужен Node.js с npm.'
    }

    $occupiedPorts = @([System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners() | ForEach-Object { $_.Port })
    $existingServerMarker = Join-Path -Path $projectRoot -ChildPath '.next\dev\lock'
    if (Test-Path -LiteralPath $existingServerMarker -PathType Leaf) {
        for ($candidate = 3000; $candidate -le 3010; $candidate++) {
            if ($occupiedPorts -notcontains $candidate) {
                continue
            }

            try {
                $response = Invoke-WebRequest -Uri "http://localhost:$candidate" -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
            }
            catch {
                continue
            }

            if ($response.Content -match 'Glory IOS') {
                Write-Host ''
                Write-Host 'Сайт уже запущен.' -ForegroundColor Cyan
                Write-Host "Local: http://localhost:$candidate" -ForegroundColor Green
                Write-Host 'Откройте этот адрес в браузере. Первое окно запуска оставьте открытым.'
                Read-Host 'Нажмите Enter, чтобы закрыть это окно' > $null
                exit 0
            }
        }

        throw 'Другой запуск сайта ещё не завершён или не отвечает. Закройте предыдущее окно запуска и попробуйте снова. Если такого окна нет, сообщите об этом Codex.'
    }

    $port = $null
    for ($candidate = 3000; $candidate -le 3010; $candidate++) {
        if ($occupiedPorts -notcontains $candidate) {
            $port = $candidate
            break
        }
    }

    if (-not $port) {
        throw 'Порты 3000–3010 уже заняты. Закройте другие окна запуска сайта и повторите попытку.'
    }

    $env:NEXT_TELEMETRY_DISABLED = '1'
    Write-Host ''
    Write-Host 'Glory IOS' -ForegroundColor Cyan
    Write-Host "Local: http://localhost:$port" -ForegroundColor Green
    Write-Host 'Дождитесь сообщения Ready, затем откройте этот адрес в браузере.'
    Write-Host 'Оставьте это окно открытым. Для остановки сайта нажмите Ctrl + C.'
    Write-Host ''

    & $nodePath $nextPath dev --hostname '0.0.0.0' --port $port
    exit $LASTEXITCODE
}
catch {
    Write-Host ''
    Write-Host 'Не удалось запустить Glory IOS.' -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    exit 1
}
