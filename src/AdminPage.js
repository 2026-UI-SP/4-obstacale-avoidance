import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function AdminPage() {
    const [participants, setParticipants] = useState({});
    const [loading, setLoading] = useState(true);
    const [authed, setAuthed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("adminAuthed") !== "true") {
            navigate("/admin-login");
        } else {
            setAuthed(true);
        }
    }, [navigate]);

    useEffect(() => {
        if (!authed) return;
        const fetchTrials = async () => {
            try {
                const q = query(collection(db, "trials"), orderBy("timestamp"));
                const snapshot = await getDocs(q);
                const grouped = {};
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const code = data.participantCode;
                    if (!grouped[code]) grouped[code] = [];
                    grouped[code].push(data);
                });
                setParticipants(grouped);
            } catch (e) {
                console.error("Error fetching trials:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchTrials();
    }, [authed]);

    const handleLogout = () => {
        sessionStorage.removeItem("adminAuthed");
        navigate("/admin-login");
    };

    const downloadCSV = (participantCode, trials) => {
        const headers = ["trialNum", "condition", "obstacle", "collision", "completion_time", "timestamp"];
        const rows = trials.map((t) => [
            t.trialNum,
            t.condition,
            t.obstacle,
            t.collision,
            t.completion_time,
            t.timestamp?.toDate().toISOString() ?? ""
        ]);
        const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${participantCode}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (!authed) return null;

    return (
        <div className="App">
            <div className="welcome-container">
                <h1 className="game-title">Participant Data</h1>
                {loading ? (
                    <p>Loading participants...</p>
                ) : Object.keys(participants).length === 0 ? (
                    <p>No data found.</p>
                ) : (
                    <div className="description-box">
                        <p style={{ marginBottom: "16px" }}>
                            {Object.keys(participants).length} participant{Object.keys(participants).length !== 1 ? "s" : ""} found.
                        </p>
                        {Object.entries(participants).map(([code, trials]) => (
                            <div
                                key={code}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "12px",
                                    padding: "10px",
                                    backgroundColor: "#f0ede4",
                                    borderRadius: "8px"
                                }}
                            >
                                <span>
                                    <strong>{code}</strong>
                                    <span style={{ color: "#888", fontSize: "14px" }}> — {trials.length} trial{trials.length !== 1 ? "s" : ""}</span>
                                </span>
                                <button
                                    className="start-button"
                                    style={{ marginTop: 0 }}
                                    onClick={() => downloadCSV(code, trials)}
                                >
                                    ⬇ CSV
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    className="start-button"
                    style={{ marginTop: "20px" }}
                    onClick={handleLogout}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default AdminPage;