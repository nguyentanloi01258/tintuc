package com.webtt.webtintuc.models;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;

@Entity
@Table(name="posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private String content;



    private String imagB64_1;
    private String imagB64_2;
    private String imagB64_3;
    private LocalDateTime date;
    private int favorite;
    private String category;
    private String author;

    public Post() {
//        Date dateNow =  new java.util.Date();
        LocalDateTime instant = LocalDateTime.now();
        Random rand = new Random(); //instance of random class
        int upperbound = 10000;
        //generate random values from 0-10000
        int int_random = rand.nextInt(upperbound);
        this.date = instant;
        this.favorite = int_random;
    }

    public Post(Long id, String title, String description, String content, String imagB64_1, String imagB64_2, String imagB64_3, LocalDateTime date, int favorite, String category, String author) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.imagB64_1 = imagB64_1;
        this.imagB64_2 = imagB64_2;
        this.imagB64_3 = imagB64_3;
        this.date = date;
        this.favorite = favorite;
        this.category = category;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImagB64_1() {
        return imagB64_1;
    }

    public void setImagB64_1(String imagB64_1) {
        this.imagB64_1 = imagB64_1;
    }

    public String getImagB64_2() {
        return imagB64_2;
    }

    public void setImagB64_2(String imagB64_2) {
        this.imagB64_2 = imagB64_2;
    }

    public String getImagB64_3() {
        return imagB64_3;
    }

    public void setImagB64_3(String imagB64_3) {
        this.imagB64_3 = imagB64_3;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getFavorite() {
        return favorite;
    }

    public void setFavorite(int favorite) {
        this.favorite = favorite;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
