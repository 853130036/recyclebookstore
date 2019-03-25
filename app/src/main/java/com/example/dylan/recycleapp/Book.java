package com.example.dylan.recycleapp;

import android.content.Intent;
import android.os.Build;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class Book extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book);
        Intent intent = getIntent();
        String bookcaseId = intent.getStringExtra("bookcaseId");
        webView = (WebView) findViewById(R.id.wv_book);
        webView.loadUrl("file:///android_asset/RecycleWeb/book_rent/html/borrow.html?bookcaseId=" + bookcaseId);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                String newUrl = url.replaceAll(MainActivity.PATH + "book_rent/html/", "");
                // Toast.makeText(Book.this, newUrl, Toast.LENGTH_SHORT).show();
                if (newUrl.substring(0, 7).equals("details")) {
                    Intent intent = new Intent(Book.this, BookDetail.class);
                    intent.putExtra("url", newUrl);
                    intent.putExtra("bookcaseId", bookcaseId);
                    startActivity(intent);
                } else if (url.equals(MainActivity.PATH + "book_rent/html/jumpToMain")) {
                    Intent intent = new Intent(Book.this, MainActivity.class);
                    startActivity(intent);
                }
                return true;
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                Intent intent = new Intent(Book.this, MainActivity.class);
                startActivity(intent);
                this.finish(); // back button
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        Intent intent = new Intent(Book.this, MainActivity.class);
        startActivity(intent);
        this.finish(); // back button
        super.onBackPressed();
    }
}
