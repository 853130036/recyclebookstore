package com.example.dylan.recycleapp;

import android.content.Intent;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class BookDetail extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_detail);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        webView = (WebView) findViewById(R.id.wv_book_detail);
        Intent intent = getIntent();
        String detailUrl = intent.getStringExtra("url");
        webView.loadUrl("file:///android_asset/RecycleWeb/book_rent/html/" + detailUrl);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                return super.shouldOverrideUrlLoading(view, request);
            }
        });
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                Intent intent = new Intent(BookDetail.this, Book.class);
                intent.putExtra("bookcaseId", getIntent().getStringExtra("bookcaseId"));
                startActivity(intent);
                this.finish(); // back button
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        Intent intent = new Intent(BookDetail.this, Book.class);
        intent.putExtra("bookcaseId", getIntent().getStringExtra("bookcaseId"));
        startActivity(intent);
        this.finish(); // back button
        super.onBackPressed();
    }
}
