import express from "express";
import cors from "cors";
import { db } from "./Services/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import jwt from "jsonwebtoken";
// import { getIdToken, verifyIdToken } from "firebase-admin/auth";

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.use(cors());
app.use(express.json());

// CRUD Endpoints for Tickets
const ticketsCollection = collection(db, "tickets");

app.post("/api/tickets", async (req, res) => {
  try {
    const docRef = await addDoc(ticketsCollection, req.body);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to create ticket", details: error });
  }
});

app.get("/api/tickets", async (req, res) => {
  try {
    const snapshot = await getDocs(ticketsCollection);
    const tickets = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tickets", details: error });
  }
});

// Read Single Ticket
app.get("/api/tickets/:id", async (req, res) => {
  try {
    const ticketDoc = doc(db, "tickets", req.params.id);
    const ticketSnap = await getDoc(ticketDoc);
    if (!ticketSnap.exists()) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json({ id: ticketSnap.id, ...ticketSnap.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ticket", details: error });
  }
});

// Update Ticket
app.put("/api/tickets/:id", async (req, res) => {
  try {
    const ticketDoc = doc(db, "tickets", req.params.id);
    await updateDoc(ticketDoc, req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: "Failed to update ticket", details: error });
  }
});

// Delete Ticket
app.delete("/api/tickets/:id", async (req, res) => {
  try {
    const ticketDoc = doc(db, "tickets", req.params.id);
    await deleteDoc(ticketDoc);
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete ticket", details: error });
  }
});

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  const { email, password, username } = req.body;
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Create JWT token
    const token = jwt.sign(
      {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        username: username || null,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      username: username || null,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Signin endpoint
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Create JWT token
    const token = jwt.sign(
      {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        // username is not available here unless you fetch it from Firestore
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
});

// Signout endpoint
app.post("/api/signout", async (req, res) => {
  const auth = getAuth();
  try {
    await signOut(auth);
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function authenticateAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
}

// User profile endpoint (using custom access token)
app.get("/api/profile", authenticateAccessToken, async (req, res) => {
  try {
    const { uid, email, username, displayName, photoURL } = req.user;
    res.json({ uid, email, username, displayName, photoURL });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch profile", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
