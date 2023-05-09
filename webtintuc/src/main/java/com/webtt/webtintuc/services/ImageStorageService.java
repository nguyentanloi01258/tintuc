package com.webtt.webtintuc.services;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class ImageStorageService implements IStorageService{
    private final Path storageFolder = Paths.get("uploads");
    //constructor

    public  ImageStorageService(){
        try {
            Files.createDirectories(storageFolder);

        }catch (IOException ex){
            throw new RuntimeException("Cannot initialize storage", ex);
        }
    }
    private boolean isImageFile(MultipartFile file){
        //install filenameutils
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        return Arrays.asList(new String[]{"png","jpg","jpeg","bmp"}).contains((fileExtension.trim().toLowerCase()));

    }
    @Override
    public String storeFile(MultipartFile file) {
        try {
            System.out.println("hh");
            if(file.isEmpty()){
                throw new RuntimeException("failed to store empty file");
            }
            //check fils is image
            if(!isImageFile(file)){
                throw new RuntimeException("you can only upload image file");
            }
            //file must be <= 5Mb
            float fileSizeInMegabytes = file.getSize() / 1_000_000.0f;
            if(fileSizeInMegabytes > 5.0f){
                throw new RuntimeException("File must be <= 5Mb");
            }
            //File must be rename
            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
            String generatedFileName = UUID.randomUUID().toString().replace("-","");
            generatedFileName = generatedFileName+"."+fileExtension;
            Path destinationFilePath = this.storageFolder.resolve(
                    Paths.get(generatedFileName)).normalize().toAbsolutePath();
            if(!destinationFilePath.getParent().equals(this.storageFolder.toAbsolutePath())){
                throw new RuntimeException(
                        "Cannot store file outside current directory."
                );

            }
            try(InputStream inputStream = file.getInputStream()){
                Files.copy(inputStream, destinationFilePath, StandardCopyOption.REPLACE_EXISTING);
            }
            return generatedFileName;

        }catch (IOException ex){
            throw new RuntimeException("Failed to store file", ex);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        return null;
    }

    @Override
    public byte[] readFileContent(String fileName) {
        return new byte[0];
    }

    @Override
    public void deleteAllFile() {

    }
}
