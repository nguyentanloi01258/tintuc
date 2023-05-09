package com.webtt.webtintuc.database;

import com.webtt.webtintuc.models.Post;
import com.webtt.webtintuc.repositories.PostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class Database {
    //logger thay cho print
    private static final Logger logger = LoggerFactory.getLogger(Database.class);
    //Tự tạo bảng trong database và add value vô database


    @Bean
    CommandLineRunner initDatabase(PostRepository postRepository){

        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
//                Products productA = new Products("Iphone",2022,2400.0,"");
//                Products productB = new Products("Ipad",2022,2400.0,"");
//                productRepository.save(productA);
//                productRepository.save(productB);
//                logger.info("insert data: "+productA);
//                logger.info("insert data: "+productB);

            }
        };
    }
}
