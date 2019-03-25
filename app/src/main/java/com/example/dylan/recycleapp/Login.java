package com.example.dylan.recycleapp;

import android.annotation.TargetApi;
import android.content.Intent;
import android.os.Build;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class Login extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        webView = (WebView) findViewById(R.id.wv_login);
        try {
            Intent intent = getIntent();
            if (intent.getStringExtra("exit").equals("true")) {
                webView.loadUrl("file:///android_asset/RecycleWeb/login_register/login.html?exit=true");
            }
        } catch (Exception e) {
            webView.loadUrl("file:///android_asset/RecycleWeb/login_register/login.html");
        }
        webView.getSettings().setJavaScriptEnabled(true);
        // 开启 DOM storage 功能
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
            // 解决html文件不能跳转的问题，需要加入此方法
            @TargetApi(Build.VERSION_CODES.LOLLIPOP)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                // ..................0Toast.makeText(Login.this, url, Toast.LENGTH_SHORT).show();
                if (url.equals(MainActivity.PATH + "login_register/jumpToMain")) {
                    Intent intent = new Intent(Login.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                } else if (url.equals(MainActivity.PATH + "login_register/jumpToRegister")) {
                    webView.loadUrl("file:///android_asset/RecycleWeb/login_register/register.html");
                } else if (url.equals(MainActivity.PATH + "login_register/jumpToLogin")) {
                    webView.loadUrl("file:///android_asset/RecycleWeb/login_register/login.html");
                }
                return true;
            }
        });
    }
}
