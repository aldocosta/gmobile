@echo off

set ANDROID_HOME=C:\Program Files (x86)\Android\android-sdk
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
cd\
cd program files (x86)\java\jdk1.7.0_55\bin


jarsigner -verbose -keystore d:\\gmobi.keystore  C:/Users/Aldo/Documents/GitHub/Gmobi/platforms/android/build/outputs/apk/android-release-unsigned.apk AcsMobileApps


cd..\..\..
cd android\android-sdk\build-tools\24.0.0

zipalign -f -v 4 C:/Users/Aldo/Documents/GitHub/Gmobi/platforms/android/build/outputs/apk/android-release-unsigned.apk C:/Users/Aldo/Documents/GitHub/Gmobi/platforms/android/build/outputs/apk/android-release-zipsigned.apk

echo Finalizado!
pause