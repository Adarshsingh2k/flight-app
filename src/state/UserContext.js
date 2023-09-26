import { createContext, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const data = await signInWithPopup(auth, provider);

      console.log(data);
      setUser(data.user);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Sign-out successful.
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
