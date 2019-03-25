package com.example.dylan.recycleapp;

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.net.wifi.aware.DiscoverySession;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomNavigationView;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.WindowManager;
import android.webkit.ValueCallback;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.yanzhenjie.permission.AndPermission;
import com.yanzhenjie.permission.Permission;
import com.yzq.zxinglibrary.android.CaptureActivity;
import com.yzq.zxinglibrary.common.Constant;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    private List<bookStoreInformation> bookStoreInformations = new ArrayList<>();
    private static final int REQUEST_CODE_SCAN = 11;
    private static final int REQUEST_DETAILS = 12;
    public static final String EXIT = "true";
    private int userHeadId;
    private WebView webView;
    private String userName;
    private ListView listView;
    public final static int HOME = 1;
    public final static int BORROW = 2;
    public final static int ORDER = 3;
    public final static String PATH = "file:///android_asset/RecycleWeb/";

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        switch (requestCode) {
            case REQUEST_DETAILS:
                if (resultCode == RESULT_OK) {
                    if (data.getIntExtra("exit", 0) == ORDER) {
                        webView.loadUrl("file:///android_asset/RecycleWeb/order_list/index.html");
                    } else if (data.getIntExtra("options", 0) == ORDER) {
                        webView.loadUrl("file:///android_asset/RecycleWeb/order_list/index.html");
                    }
                }
                break;
            case REQUEST_CODE_SCAN:
                if (resultCode == RESULT_OK) {
                    if (data != null) {
                        // 从二维码读取书籍信息
                        // Toast.makeText(MainActivity.this, data.getStringExtra(Constant.CODED_CONTENT), Toast.LENGTH_SHORT).show();
                        Intent intent = new Intent(MainActivity.this, Book.class);
                        String bookcaseId = data.getStringExtra(Constant.CODED_CONTENT);
                        intent.putExtra("bookcaseId", bookcaseId);
                        startActivity(intent);
                    }
                }
                break;
        }
    }

    public final static int RUSULT = 1;

    /**
     * 将图片转为圆角
     *
     * @param resId
     * @return
     */
    public Drawable toRoundBitmap(int resId) {
        Bitmap bitmap = BitmapFactory.decodeResource(getResources(), resId);
        //圆形图片宽高
        int width = bitmap.getWidth() / 4;
        int height = bitmap.getHeight() / 4;
        //正方形的边长
        int r = 0;
        //取最短边做边长
        if (width > height) {
            r = height;
        } else {
            r = width;
        }
        //构建一个bitmap
        Bitmap backgroundBmp = Bitmap.createBitmap(width,
                height, Bitmap.Config.ARGB_8888);
        //new一个Canvas，在backgroundBmp上画图
        Canvas canvas = new Canvas(backgroundBmp);
        Paint paint = new Paint();
        //设置边缘光滑，去掉锯齿
        paint.setAntiAlias(true);
        //宽高相等，即正方形
        RectF rect = new RectF(0, 0, r, r);
        //通过制定的rect画一个圆角矩形，当圆角X轴方向的半径等于Y轴方向的半径时，
        //且都等于r/2时，画出来的圆角矩形就是圆形
        canvas.drawRoundRect(rect, r / 2, r / 2, paint);
        //设置当两个图形相交时的模式，SRC_IN为取SRC图形相交的部分，多余的将被去掉
        paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
        //canvas将bitmap画在backgroundBmp上
        canvas.drawBitmap(bitmap, null, rect, paint);
        //返回已经绘画好的backgroundBmp
        Drawable headDraw = new BitmapDrawable(getResources(), backgroundBmp);
        return headDraw;
    }

    @TargetApi(Build.VERSION_CODES.KITKAT)
    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        userHeadId = R.drawable.book;
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.setDrawerIndicatorEnabled(false);
        Drawable headDraw = toRoundBitmap(userHeadId);
        // 设置toggle的头像图标
        toggle.setHomeAsUpIndicator(headDraw);
        toggle.setToolbarNavigationClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                drawer.openDrawer(Gravity.START);
            }
        });
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        // 动态改变个人信息

        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        listView = (ListView) findViewById(R.id.list_view);
        webView = (WebView) findViewById(R.id.webView);
        webView.loadUrl("file:///android_asset/RecycleWeb/index.html");
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
            // 解决html文件不能跳转的问题，需要加入此方法
            @TargetApi(Build.VERSION_CODES.LOLLIPOP)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String url = request.getUrl().toString();
                String newUrl = url.replaceAll(PATH + "order_list/", "");
                String postUrl = url.replaceAll(PATH, "");
                // 3032.
                // 3
                // Toast.makeText(MainActivity.this, postUrl, Toast.LENGTH_SHORT).show();
                if (url.equals(PATH + "refresh")) {
                    webView.loadUrl("file:///android_asset/RecycleWeb/index.html");
                } else if (url.equals(PATH + "sendPost")) {
                    Intent intent = new Intent(MainActivity.this, PostSend.class);
                    startActivity(intent);
                } else if (newUrl.substring(0, 10).equals("index.html")) {
                    Intent intent = new Intent(MainActivity.this, DetailShow.class);
                    intent.putExtra("url", newUrl);
                    startActivityForResult(intent, REQUEST_DETAILS);
                } else if (url.equals(PATH + "postShow")) {
                    Intent intent = new Intent(MainActivity.this, PostShow.class);
                    startActivity(intent);
                } else if (postUrl.substring(0, 6).equals("talkId")) {
                    Intent intent = new Intent(MainActivity.this, PostShow.class);
                    intent.putExtra("url", postUrl);
                    startActivity(intent);
                }
                return true;
            }

            /**
             * 页面加载完成执行
             * @param view
             * @param url
             */
            @Override
            public void onPageFinished(WebView view, String url) {
                // Toast.makeText(MainActivity.this, url, Toast.LENGTH_SHORT).show();
                if (url.equals(PATH + "index.html")) {
                    webView.evaluateJavascript("javascript:getUserInfo()", new ValueCallback<String>() {
                        @Override
                        public void onReceiveValue(String value) {
                            // 从js代码中获取用户登陆信息
                            com.alibaba.fastjson.JSONObject jsonObject = com.alibaba.fastjson.JSONObject.parseObject(value);
                            userName = jsonObject.getString("userName");
                            // 设置导航用户的基本属性
                            if (navigationView.getHeaderCount() > 0) {
                                View header = navigationView.getHeaderView(0);
                                // 设置头像
                                ImageView iv_userHead = (ImageView) header.findViewById(R.id.userHead);
                                iv_userHead.setImageResource(R.drawable.book);
                                // 名字
                                TextView tv_userName = (TextView) header.findViewById(R.id.userName);
                                tv_userName.setText(userName);
                                // 币
                                TextView tv_userCoin = (TextView) header.findViewById(R.id.userCoin);
                                tv_userCoin.setText("赛客币：5");
                                // 爱心值
                                TextView tv_userLove = (TextView) header.findViewById(R.id.userLove);
                                tv_userLove.setText("爱心值：10");
                            }
                        }
                    });
                }
            }
        });
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            moveTaskToBack(true);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    /**
     * 右上角菜单栏的选项事件
     *
     * @param item
     * @return
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_scan) {
            scan();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action
            scan();
        } else if (id == R.id.nav_slideshow) {
            Intent intent = new Intent(MainActivity.this, PostSend.class);
            startActivity(intent);
        } else if (id == R.id.nav_manage) {
            Intent intent = new Intent(MainActivity.this, Info.class);
            startActivity(intent);
        } else if (id == R.id.nav_exit) {
            Intent intent = new Intent(MainActivity.this, Login.class);
            intent.putExtra("exit", EXIT);
            startActivity(intent);
            this.finish();
        } else if (id == R.id.nav_donate) {
            Intent intent = new Intent(MainActivity.this, Donate.class);
            startActivity(intent);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @SuppressLint("JavascriptInterface")
        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_square:
                    // 写点击进入相应page的方法
                    webView.setVisibility(View.VISIBLE);
                    listView.setVisibility(View.INVISIBLE);
                    webView.loadUrl("file:///android_asset/RecycleWeb/index.html");
                    return true;
                case R.id.navigation_dashboard:
                    listView.setVisibility(View.VISIBLE);
                    webView.setVisibility(View.INVISIBLE);
                    initlist();
                    bookStoreInformationAdapter adapter = new bookStoreInformationAdapter(MainActivity.this, R.layout.book_case, bookStoreInformations);
                    listView.setAdapter(adapter);
                    listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                        @Override
                        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                            bookStoreInformation bookStoreInformation = bookStoreInformations.get(position);
                            Toast.makeText(MainActivity.this, bookStoreInformation.getBook_store_location(), Toast.LENGTH_SHORT).show();
                        }
                    });
                    return true;
                case R.id.navigation_notifications:
                    webView.setVisibility(View.VISIBLE);
                    listView.setVisibility(View.INVISIBLE);
                    webView.loadUrl("file:///android_asset/RecycleWeb/order_list/index.html");
                    return true;
            }
            return false;
        }
    };

    private void scan() {
        AndPermission.with(this)
                .runtime()
                .permission(Permission.CAMERA, Permission.READ_EXTERNAL_STORAGE)
                .onGranted(permissions -> {
                    // Storage permission are allowed.
                    Intent intent = new Intent(MainActivity.this, CaptureActivity.class);
                    startActivityForResult(intent, REQUEST_CODE_SCAN);
                })
                .onDenied(permissions -> {
                    // Storage permission are not allowed.
                })
                .start();
    }

    void initlist() {
        int max = 30;
        int[] ts = new int[30];
        for (int te = 0; te < max; te++) {
            ts[te] = (int) (1 + Math.random() * 10000000);

        }
        for (int i = 0; i < max; i++) {

            int[] sortts = new int[30];

            String[] malocations = {"明理楼A区1楼", "明理楼B区1楼", "明理楼C区1楼", "明德楼A区3楼", "明德楼B区2楼",
                    "明志楼A区3楼", "明志楼B区4楼", "明辨楼A区1楼", "明辨楼B区1楼", "明辨楼C区1楼", "思学楼A区1楼", "思学楼B区1楼", "思学楼D区1楼", "博学楼A区1楼"};
            String[] locations = {"明理楼", "明德楼", "明志楼", "明辨楼", "思学楼", "博学楼"};
            int t = (int) (Math.random() * 13);

            int temp = (int) (1 + Math.random() * 5);
            int distance = (int) (1 + Math.random() * 3000);
            String nametemp = "null";
            if (t <= 2) {
                nametemp = locations[0];
            }
            if (t <= 4 && t >= 3) {
                nametemp = locations[1];
            }
            if (t <= 6 && t >= 5) {
                nametemp = locations[2];
            }
            if (t <= 9 && t >= 7) {
                nametemp = locations[3];
            }
            if (t <= 12 && t >= 10) {
                nametemp = locations[4];
            }
            if (t == 13) {
                nametemp = locations[5];
            }
            String sout = "机器编号：" + ts[i] + "\n机器名称：" + nametemp + temp + "号机" + "\n机器位置：" + malocations[t] + "\n机器距离：" + distance + "米";

           if (nametemp == locations[0]) {
                bookStoreInformation bookStoreInformation = new bookStoreInformation(sout, R.drawable.li);
                bookStoreInformations.add(bookStoreInformation);

            }
            if (nametemp == locations[1]) {
                bookStoreInformation bookStoreInformation = new bookStoreInformation(sout, R.drawable.de);
                bookStoreInformations.add(bookStoreInformation);

            }
            if (nametemp == locations[2]) {
                bookStoreInformation bookStoreInformation = new bookStoreInformation(sout, R.drawable.zhi);
                bookStoreInformations.add(bookStoreInformation);

            }
            if (nametemp == locations[3]) {
                bookStoreInformation bookStoreInformation = new bookStoreInformation(sout, R.drawable.bian);
                bookStoreInformations.add(bookStoreInformation);

            }
            if (nametemp == locations[4]) {
                bookStoreInformation bookStoreInformation = new bookStoreInformation(sout, R.drawable.si);
                bookStoreInformations.add(bookStoreInformation);

            }
            if (nametemp == locations[5]) {
                bookStoreInformation bookStoreInformation = new bookStoreInformation(sout, R.drawable.bo);
                bookStoreInformations.add(bookStoreInformation);

            }



        }

    }

}
