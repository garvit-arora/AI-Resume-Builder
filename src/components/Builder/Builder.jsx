import React, { useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
import { jsPDF } from "jspdf";
import axios from "axios";
import { div, form, summary } from "framer-motion/client";
function Builder() {
  const [loading,setLoading] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [{ degree: "", college: "", year: "" }],
    skills: [""],
    experience: [{ role: "", company: "", duration: "", description: "",current :false }],
    projects: [{ name: "", description: "" }],
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateResume = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Generate a professional ATS-friendly resume in plain text format using the following data: ${JSON.stringify(
                    formData
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
  const handleSkillChange = (index, value) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({
      ...formData,
      skills: updated,
    });
  };
  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({
      ...formData,
      [section]: updated,
    });
  };
  const handleExperienceChange = (index, field, value) => {
  const updated = [...formData.experience];
  updated[index][field] = value;
  setFormData({
    ...formData,
    experience: updated,
  });
};
  return (
    <>
      <div className="p-6 m-40 text-white text-center h-auto flex justify-center ">
        <div className="flex flex-col border shadow-2xl p-8 gap-6  items-center justify-center w-1/2 rounded-4xl">
        <h1 className="text-3xl font-bold">General</h1>
        <input
          type="text"
          name="name"
          className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter Your Name"
          value={formData.name}
          onChange={handleChange}
        /> <br />
        <h1 className="text-3xl font-bold">Contact Details</h1>

        <input
          type="text"
          className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          name="email"
          placeholder="Enter Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone"
          className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="summary"
          className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter Summary"
          value={formData.summary}
          onChange={handleChange}
        /> <br />
        <h1 className="text-3xl font-bold">Education</h1>
        {formData.education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange("education", index, "degree", e.target.value)
              }
              placeholder="Degree"
            /> <br />
            <input
              type="text"
              className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={edu.college}
              onChange={(e) =>
                handleArrayChange("education", index, "college", e.target.value)
              }
              placeholder="College"
            /> <br />
            <input
              type="text"
              value={edu.year}
              className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) =>
                handleArrayChange("education", index, "year", e.target.value)
              }
              placeholder="Year"
            />
          </div>
        ))}
        <h1 className="text-3xl font-bold">Experience</h1>
{formData.experience.map((exp, index) => (
  <div key={index} className="mb-4 w-full">
    <input
      type="text"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
      placeholder="Role"
      value={exp.role}
      onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
    />
    <input
      type="text"
      className="w-full px-4 py-2 border rounded-lg mt-2"
      placeholder="Company"
      value={exp.company}
      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
    />
    <input
      type="text"
      className="w-full px-4 py-2 border rounded-lg mt-2"
      placeholder="Duration"
      value={exp.duration}
      onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
    />
    <textarea
      className="w-full px-4 py-2 border rounded-lg mt-2"
      placeholder="Description"
      value={exp.description}
      onChange={(e) =>
        handleExperienceChange(index, "description", e.target.value)
      }
    />

    {/* ✅ Checkbox for "currently working here" */}
    <label className="flex items-center mt-2">
      <input
        type="checkbox"
        checked={exp.current}
        onChange={(e) =>
          handleExperienceChange(index, "current", e.target.checked)
        }
        className="mr-2"
      />
      Currently Working Here
    </label>
  </div>
))}


        <h1 className="text-3xl font-bold">Skills</h1>
        {formData.skills.map((skill, index) => (
          <>
          <input
            key={index}
            type="text"
            className="border-b-2 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            placeholder="Skill"
          /> <br /><br />  </>
        ))}
        <br /><br /><br />
        <button
          onClick={generateResume}
          disabled={loading}
          className="bg-blue-600 text-white  px-6 py-2 rounded-xl shadow-md hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
        </div>
      </div>
    </>
  );
}

export default Builder;
