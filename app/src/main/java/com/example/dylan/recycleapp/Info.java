package com.example.dylan.recycleapp;

import android.content.Intent;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class Info extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info);
        webView = (WebView) findViewById(R.id.wv_info);
        webView.loadUrl("file:///android_asset/RecycleWeb/web/userinfo.html");
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                if (url.equals(MainActivity.PATH + "web/edit")) {
                    webView.loadUrl("file:///android_asset/RecycleWeb/web/updateinfo.html");
                } else if (url.equals(MainActivity.PATH + "web/back")) {
                    webView.loadUrl("file:///android_asset/RecycleWeb/web/userinfo.html");
                } else if (url.equals(MainActivity.PATH + "web/backToMain")) {
                    Intent intent = new Intent(Info.this, MainActivity.class);
                    startActivity(intent);
                }
                return true;
            }
        });
    }
}
