package server.manager;

import java.util.Vector;
import server.handler.ClientHandler;

public class ClientManager {

    private static Vector<ClientHandler> clients = new Vector<>();

    public static void add(ClientHandler c) {
        clients.add(c);
    }

    public static void remove(ClientHandler c) {
        clients.remove(c);
    }

    public static Vector<ClientHandler> getAll() {
        return clients;
    }
}