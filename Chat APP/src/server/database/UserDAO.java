package server.database;

import java.sql.*;

public class UserDAO {

    public boolean login(String user, String pass) {
        try {
            Connection c = DBConnection.getConnection();

            String sql = "SELECT * FROM users WHERE username=? AND password=?";
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setString(1, user);
            ps.setString(2, pass);

            ResultSet rs = ps.executeQuery();
            return rs.next();

        } catch(Exception e) {
            return false;
        }
    }

    public boolean register(String user, String pass) {
        try {
            Connection c = DBConnection.getConnection();

            String sql = "INSERT INTO users(username,password) VALUES(?,?)";
            PreparedStatement ps = c.prepareStatement(sql);

            ps.setString(1, user);
            ps.setString(2, pass);

            return ps.executeUpdate() > 0;

        } catch(Exception e) {
            return false;
        }
    }
}