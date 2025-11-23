package com.example.backend.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000") // allow your React dev app
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Void> handleContact(@RequestBody ContactRequest request) {
        contactService.sendContactEmail(request);
        return ResponseEntity.ok().build();
    }
}
