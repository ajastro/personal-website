package com.example.backend.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final JavaMailSender mailSender;

    @Value("${contact.to}")
    private String contactTo;

    public ContactService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(ContactRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(contactTo);
        message.setReplyTo(request.getEmail());
        message.setSubject("New contact form message from " + request.getName());

        StringBuilder body = new StringBuilder();
        body.append("You received a new message from your website:\n\n");
        body.append("Name: ").append(request.getName()).append("\n");
        body.append("Email: ").append(request.getEmail()).append("\n\n");
        body.append("Message:\n").append(request.getMessage()).append("\n");

        message.setText(body.toString());

        mailSender.send(message);
    }
}
