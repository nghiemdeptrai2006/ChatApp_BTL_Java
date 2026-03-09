package server.service;

import server.database.MessageDAO;

public class ChatService {

    private MessageDAO dao = new MessageDAO();

    public void sendMessage(String sender, String content) {
        dao.saveMessage(sender, content);
    }
}