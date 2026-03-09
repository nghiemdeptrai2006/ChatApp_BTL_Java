package server.model;

public class Message {
    private String sender;
    private String content;

    public Message(String s, String c) {
        sender = s;
        content = c;
    }

    public String getSender() { return sender; }
    public String getContent() { return content; }
}