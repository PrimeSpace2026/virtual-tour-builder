Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'Matterport') {
        $newContent = $content -replace 'Matterport', 'PrimeSpace'
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($_.Name)"
    }
}
Write-Host "Done"
