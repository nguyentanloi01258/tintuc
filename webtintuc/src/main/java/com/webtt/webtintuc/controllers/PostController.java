package com.webtt.webtintuc.controllers;

import com.webtt.webtintuc.models.Post;
import com.webtt.webtintuc.models.ResponseObject;
import com.webtt.webtintuc.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@CrossOrigin
@RequestMapping(path = "post")
public class PostController {
    @Autowired
    private PostRepository repository;

    @GetMapping("")
        //http://localhost:8080/api/v1/Products
    List<Post> getAllPost(){
        return  repository.findAll();
    }

    //Optional có thể NULL
    //Trả về một cái object với: data, message, status
    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> findById(@PathVariable Long id){
        Optional<Post> foundProducts = repository.findById(id);
        return foundProducts.isPresent() ?
                ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok","Query product successfully", foundProducts)
                ):
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed","Cannot find product with id = "+id, "")
                );

    }

    //POST
    //Postman : Raw, JSON
    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertPost(@RequestBody Post newPost){
        //Kiểm tra trùng tên
        List<Post> foundTitle = repository.findBytitle(newPost.getTitle().trim());
        if(foundTitle.size() > 0 || newPost.getTitle().trim() == ""){
            //System.out.println(newProduct.getProductName().trim());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("failed","Bài viết đã tồn tại","")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok","Insert Post successfully",repository.save(newPost))
        );
    }
//    @PostMapping("/insert2")
//    ResponseEntity<ResponseObject> insertPost2(@RequestBody Post newPost){
//        //Kiểm tra trùng tên
//        List<Post> foundTitle = repository.findBytitle(newPost.getTitle().trim());
//        if(foundTitle.size() > 0){
//            //System.out.println(newProduct.getProductName().trim());
//            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
//                    new ResponseObject("failed","Post name already taken","")
//            );
//        }
//        Long id = 22L;
//        Optional<Post> foundId = repository.findById(id);
//        if(foundId.equals(id)){
//            return ResponseEntity.status(HttpStatus.OK).body(
//
//                new ResponseObject("ok","Insert Post successfully",id)
//        );
//
//        }
////        Post addPost = new Post();
////        addPost.setId(addPost.getId());
////        addPost.setTitle(newPost.getTitle());
////        addPost.setDescription(newPost.getDescription());
////        addPost.setContent(newPost.getContent());
////        addPost.setDate(newPost.getDate());
////        addPost.setAuthor(newPost.getAuthor());
////        addPost.setFavorite(newPost.getFavorite());
////        addPost.setCategory(newPost.getCategory());
////        addPost.setImagB64_1(newPost.getImagB64_1());
////        addPost.setImagB64_2(newPost.getImagB64_2());
////        addPost.setImagB64_3(newPost.getImagB64_3());
//
////        {
////            addPost.setTitle(newPost.getTitle());
////            Post.setDescription(newPost.getDescription());
////            Post.setContent(newPost.getContent());
////            Post.setDate(newPost.getDate());
////            Post.setAuthor(newPost.getAuthor());
////            Post.setFavorite(newPost.getFavorite());
////            Post.setCategory(newPost.getCategory());
////            Post.setImagB64_1(newPost.getImagB64_1());
////            Post.setImagB64_2(newPost.getImagB64_2());
////            Post.setImagB64_3(newPost.getImagB64_3());
////            return repository.save(Post);
////        }
//
//
//        return ResponseEntity.status(HttpStatus.OK).body(
//
//                new ResponseObject("ok","Insert Post successfully","addPost")
//        );
//    }

    //Update, upsert = update if found
    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updatePost(@RequestBody Post newPost, @PathVariable Long id){
        Optional<Object> updatedPost = repository.findById(id).map(Post -> {
            Post.setTitle(newPost.getTitle());
            Post.setDescription(newPost.getDescription());
            Post.setContent(newPost.getContent());
            Post.setDate(newPost.getDate());
            Post.setAuthor(newPost.getAuthor());
            Post.setFavorite(newPost.getFavorite());
            Post.setCategory(newPost.getCategory());
            Post.setImagB64_1(newPost.getImagB64_1());
            Post.setImagB64_2(newPost.getImagB64_2());
            Post.setImagB64_3(newPost.getImagB64_3());
            return repository.save(Post);
        });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok","update Product successfully","")
        );
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deletePost(@PathVariable Long id)
    {
        boolean exists = repository.existsById(id);
        repository.deleteById(id);
        if(exists){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok","Delete Product successfully","")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find product to detete","")
        );

    }
}
