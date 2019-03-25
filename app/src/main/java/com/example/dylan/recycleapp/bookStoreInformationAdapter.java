package com.example.dylan.recycleapp;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

public class bookStoreInformationAdapter extends ArrayAdapter<bookStoreInformation> {
    private int resourceId;
    public bookStoreInformationAdapter(Context context, int resource, List<bookStoreInformation> objects) {
        super(context, resource,objects);
        resourceId=resource;
    }
    @Override
    public View getView(int position, View convertView, ViewGroup parent)
    {

        bookStoreInformation bookStoreInformation=getItem(position);
        View view =LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
        ImageView bookcaseiamge=(ImageView)view.findViewById(R.id.image);
        TextView book_location=(TextView)view.findViewById(R.id.location_text);
        bookcaseiamge.setImageResource(bookStoreInformation.getBook_stroe_id());
        book_location.setText(bookStoreInformation.getBook_store_location());
        return view;
    }
}
