package server.main;

import java.net.*;

import server.handler.ClientHandler;
import server.util.Constant;

public class Server {

    public static void main(String[] args) {

        try {
            ServerSocket server = new ServerSocket(Constant.PORT);
            System.out.println("Server dang chay...");

            while(true) {
                Socket socket = server.accept();
                new ClientHandler(socket).start();
            }

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}