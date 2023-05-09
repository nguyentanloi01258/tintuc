package com.webtt.webtintuc.repositories;

import com.webtt.webtintuc.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findBytitle(String title);
}
