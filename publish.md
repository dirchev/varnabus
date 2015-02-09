export PATH=$PATH:/home/dirchev/Programs/android-sdk-linux/tools/
export PATH=$PATH:/home/dirchev/Programs/android-sdk-linux/platform-tools/

keytool -genkey -v -keystore ./varnabus2.keystore -alias VarnaBus2 -keyalg RSA -keysize 2048 -validity 10000

WORKING ONLY WITH JDK 6!!!!!

jarsigner -verbose -keystore /home/dirchev/Developement/varnabus2/varnabus2.keystore -storepass m4a1@HAHA -keypass m4a1@HAHA /home/dirchev/Developement/varnabus2/platforms/android/ant-build/CordovaApp-release-unsigned.apk VarnaBus2

/home/dirchev/Programs/android-sdk-linux/build-tools/21.0.2/zipalign -v 4 /home/dirchev/Developement/varnabus2/platforms/android/ant-build/CordovaApp-release-unsigned.apk /home/dirchev/Developement/varnabus2/VarnaBus.apk
