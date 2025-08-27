import React, { useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
import { jsPDF } from "jspdf";
import axios from "axios";
function Builder() {
  const [loading, setLoading] = useState(false);
  const resumeData = {
    name: "Garvit Arora",
    email: "garvit.university@gmail.com",
    phone: "+91-9560849244",
    summary:
      "Aspiring software engineer passionate about AI, ML, and Web Development.",
    education: [{ degree: "B.Tech in CSE", college: "BPIT", year: "2028" }],
    skills: ["C++", "Python", "React", "ML", "BlockChain"],
    experience: [
      {
        role: "INTERN",
        company: "XYZ Startup",
        duration: "3 Months",
        description: "Worked as a Frontend Developer",
      },
    ],
    projects: [
      {
        name: "AI Chatbot",
        description: "Built an AI Chatbot Using Gemini API.",
      },
    ],
  };
  const generateResume = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: "user", // 👈 this was missing
              parts: [
                {
                  text: `Generate a professional ATS-friendly resume in plain text format using the following data: ${JSON.stringify(
                    resumeData
                  )}`,
                },
              ],
            },
          ],
        }
      );
      const resumeText = res.data.candidates[0].content.parts[0].text;
      console.log(resumeText);

      const doc = new jsPDF();
      const lines = doc.splitTextToSize(resumeText, 180);
      doc.text(lines, 10, 10);
      doc.save("resume.pdf");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-6 m-40 text-center h-screen">
        <button
          onClick={generateResume}
          disabled={loading}
          className="bg-blue-600 text-white  px-6 py-2 rounded-xl shadow-md hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>
    </>
  );
}

export default Builder;
