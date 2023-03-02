$currentPath = Get-Location | Select-Object -ExpandProperty Path;
$solutionPath = (Get-Item $currentPath).parent.FullName;

$tempDirectory = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), [System.IO.Path]::GetRandomFileName())
Write-Host ("Creating temporary folder: " + $tempDirectory) -ForegroundColor Green
[System.IO.Directory]::CreateDirectory($tempDirectory);

$clientAppPath = $solutionPath + "\Nausicaa.Green.Initiative.UI\global-green-initiative"

try
{
    Set-Location -Path $clientAppPath

    Invoke-Expression ("npm install")

	#Invoke-Expression ("npm run ng build --configuration=production --base-href=/nausicaa/ --deploy-url=/nausicaa/")

    Invoke-Expression ("npm run ng build --configuration=production")

    $distPath = $clientAppPath + "\dist"
    Write-Host ('Copy ' + $distPath + ' to ' + $tempDirectory)
    Copy-Item $distPath  -Destination $tempDirectory -Recurse 
    
    $dockerFilePath = $currentPath + "\nausicaa-green-initiative-ui.Dockerfile"
    Write-Host ('Copy ' + $dockerFilePath + ' to ' + ($tempDirectory + "/Dockerfile"))
    Copy-Item $dockerFilePath -Destination $($tempDirectory + "/Dockerfile") -Recurse 
    
    $nginxConf = $currentPath + "\nausicaa-green-initiative-ui-nginx.conf"
    Write-Host ('Copy ' + $nginxConf + ' to ' + ($tempDirectory + "/nginx.conf"))
    Copy-Item $nginxConf -Destination $($tempDirectory + "/nginx.conf") -Recurse 
    
    Invoke-Expression ("docker build -t nausicaa:v1 --force-rm " + $tempDirectory)
}
finally
{
    Set-Location -Path $currentPath
    Write-Host ("Deleting temporary folder: " + $tempDirectory) -ForegroundColor Green
    Remove-Item -Recurse -Force $tempDirectory;
}