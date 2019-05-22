package com.workwith;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true); // here
        super.onCreate(savedInstanceState);
    }
    @Override
    protected String getMainComponentName() {
        return "workwith";
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
