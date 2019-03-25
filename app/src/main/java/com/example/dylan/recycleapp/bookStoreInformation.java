package com.example.dylan.recycleapp;

public class bookStoreInformation
{
    private String book_store_image;
    private String book_store_location;
    private int book_stroe_id;

    public bookStoreInformation(String book_stroe_location,int book_stroe_id)
    {
        this.book_store_location=book_stroe_location;
        this.book_stroe_id=book_stroe_id;

    }
    public String getBook_store_image() {
        return book_store_image;
    }

    public void setBook_store_image(String book_store_image) {
        this.book_store_image = book_store_image;
    }

    public String getBook_store_location() {
        return book_store_location;
    }

    public void setBook_store_location(String book_store_location) {
        this.book_store_location = book_store_location;
    }

    public int getBook_stroe_id() {
        return book_stroe_id;
    }

    public void setBook_stroe_id(int book_stroe_id) {
        this.book_stroe_id = book_stroe_id;
    }
}
