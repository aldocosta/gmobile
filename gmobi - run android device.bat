@echo off
cd/
cd users\aldo\documents\github\gmobile

set ANDROID_HOME=C:\Program Files (x86)\Android\android-sdk
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
cordova run android --device

echo Running!
pause