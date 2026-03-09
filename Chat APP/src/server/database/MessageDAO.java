package server.database;

import java.sql.*;

public class MessageDAO {

    public void saveMessage(String sender, String content) {
        try {
            Connection c = DBConnection.getConnection();

            String sql = "INSERT INTO messages(sender,content) VALUES(?,?)";
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setString(1, sender);
            ps.setString(2, content);

            ps.executeUpdate();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}