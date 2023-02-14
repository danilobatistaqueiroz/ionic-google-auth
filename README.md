ionic start glogin blank --type=angular --capacitor
cd glogin

npm i @codetrix-studio/capacitor-google-auth
npx cap sync
ionic cap sync

ionic build

ionic cap add android
ionic cap copy

export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ionic capacitor run android --livereload --external




Para debugar é necessário ativar o modo debug (usb ou wifi) nas opções de desenvolvedor no Android, ao conectar, será perguntado se quer se conectar na rede, irá apresentar um RSA finger print, esse número é possível avaliar se está correto olhando em:  
`echo ~/.android/adbkey.pub | awk '{print $1}' < ~/.android/adbkey.pub | base64 --decode | md5sum`  
`echo ~/.android/adbkey.pub | awk '{print $1}' < ~/.android/adbkey.pub | base64 --decode | openssl md5 -c | tr a-z A-Z`  

O correto é não aceitar ler os arquivos do dispositivo ao ser questionado se abre o Android em modo leitura de arquivos.  

Pode ser que apareçam mais de uma rede ao conectar, e deve-se negar as outras.  

Para inspecionar no Browser, é necessário selecionar nas opções de desenvolvedor "Aguardar depurador", depois entrar no Android Studio, selecionar "Run" -> Attach Debug to Android Process"  

Entrar no Browser e selecionar:  

debugar celular Android:  
vivaldi://inspect/device#devices  
chrome://inspect/device#devices




`keytool -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore`  
senha default é android

Android - ClientID:  
760929459670-q4jgj7lpbs7s2585hkb0sr7saqai7fiu.apps.googleusercontent.com

Web - Client ID:  
760929459670-bm64fkpue0i3c06160v5l6jgnvma1so5.apps.googleusercontent.com

Web -  Client Secret:  
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

No arquivo adroid/app/src/main/res/values/strings.xml adicionar Web Client ID credencial criada para Web em:  
<string name="server_client_id">  

Em androi/app/src/main/java/.../MainActivity.java adicionar:  
```java
import android.os.Bundle;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    this.registerPlugin(GoogleAuth.class);
  }
}
```

Em capacitor.config.json adicionar:  
```json
  "androidClientId": "760929459670-q4jgj7lpbs7s2585hkb0sr7saqai7fiu.apps.googleusercontent.com",
  "plugins": {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "760929459670-q4jgj7lpbs7s2585hkb0sr7saqai7fiu.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
```
androidClientId é o Client Id na credencial para Android, e serverClientId do mesmo modo.  





### PROBLEMS:  
Usando Web:  
No Chrome e Vivaldi ocorre o erro:  
`{error: "popup_closed_by_user"}`  
No Edge é possível abrir normalmente. Isso ocorre quando um Google Cliend ID acabou de ser criado no Google Console.  

A foto em User.imageUrl pode não vir, também é porque a imagem foi feito upload a pouco tempo, é necessário limpar o cache ou abrir a imagem inspecionando, em redes irá aparecer erro 403, clique no link, abra a imagem, e depois será liberado.  

https://stackoverflow.com/questions/48683320/google-sso-login-error-popup-closed-by-user  
https://stackoverflow.com/questions/72770573/error-uncaught-in-promise-object-errorpopup-closed-by-user  


### TUTORIALS:  
https://www.youtube.com/watch?v=GwtpoWZ_78E

https://enappd.com/blog/google-login-in-ionic-capacitor-app-with-angular/178/

https://github.com/CodetrixStudio/CapacitorGoogleAuth