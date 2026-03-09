package server.util;

public class MessageProtocol {

    public static String build(String user, String msg) {
        return user + ": " + msg;
    }
}