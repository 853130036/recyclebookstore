package com.example.dylan.recycleapp;

import android.annotation.TargetApi;
import android.content.Intent;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class PostSend extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_post_send);
        webView = (WebView) findViewById(R.id.wv_post);
        webView.loadUrl("file:///android_asset/RecycleWeb/post_send/sendPost.html");
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
            @TargetApi(Build.VERSION_CODES.LOLLIPOP)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                // Toast.makeText(PostSend.this, url, Toast.LENGTH_SHORT).show();
                if (url.equals(MainActivity.PATH + "post_send/jumpToMain")) {
                    Intent intent = new Intent(PostSend.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }
                return true;
            }
        });
    }

    @Override
    public void onBackPressed() {
        Intent intent = new Intent(PostSend.this, MainActivity.class);
        startActivity(intent);
        finish();
        super.onBackPressed();
    }
}
