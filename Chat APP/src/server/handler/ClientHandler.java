package server.handler;

import java.io.*;
import java.net.*;

import server.manager.ClientManager;
import server.service.ChatService;
import server.util.MessageProtocol;

public class ClientHandler extends Thread {

    private Socket socket;
    private BufferedReader in;
    private PrintWriter out;
    private String username;

    private ChatService service = new ChatService();

    public ClientHandler(Socket s) {
        socket = s;
    }

    public void run() {
        try {
            in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            out = new PrintWriter(socket.getOutputStream(), true);

            username = in.readLine();
            ClientManager.add(this);

            String msg;

            while ((msg = in.readLine()) != null) {

                String full = MessageProtocol.build(username, msg);

                broadcast(full);
                service.sendMessage(username, msg);
            }

        } catch(Exception e) {}
    }

    private void broadcast(String msg) {
        for(ClientHandler c : ClientManager.getAll()) {
            c.out.println(msg);
        }
    }
}