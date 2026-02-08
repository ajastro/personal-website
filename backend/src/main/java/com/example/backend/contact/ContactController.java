package com.example.backend.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000") // allow your React dev app
public class ContactController {

    @PostMapping
    public ResponseEntity<Void> handleContact(@RequestBody ContactRequest request) {
        return ResponseEntity.status(410).build();
    }
}
