"use client";

import { useState } from "react";

export default function VotingForm() {
  const [form, setForm] = useState({
    voterId: "",
    studentIdFile: null, // Holds the file object
    president: "",
    generalSecretary: "",
    organizationalSecretary: "",
    officeSecretary: "",
    financeSecretary: "",
    publicitySecretary: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");

  // Standard handleChange for text/select inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Special handler for the file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, studentIdFile: file });
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    // Client-side required field check
    if (!form.studentIdFile) {
      setMessage("❌ Please upload your Student ID Card image.");
      setIsSubmitting(false);
      return;
    }

    // --- Prepare FormData for file and form fields ---
    // FormData is required when submitting a file to the server.
    const formData = new FormData();
    formData.append("voterId", form.voterId);
    formData.append("studentIdFile", form.studentIdFile);
    formData.append("president", form.president);
    formData.append("generalSecretary", form.generalSecretary);
    formData.append("organizationalSecretary", form.organizationalSecretary);
    formData.append("officeSecretary", form.officeSecretary);
    formData.append("financeSecretary", form.financeSecretary);
    formData.append("publicitySecretary", form.publicitySecretary);
    // ------------------------------------------------

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        // IMPORTANT: Do NOT set 'Content-Type' header here.
        // The browser sets it automatically with the correct boundary for FormData.
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        // Checking the new structure: data.success
        alert("✅ Vote submitted successfully!");
        // Clear form upon success
        setForm({
          voterId: "",
          studentIdFile: null,
          president: "",
          generalSecretary: "",
          organizationalSecretary: "",
          officeSecretary: "",
          financeSecretary: "",
          publicitySecretary: "",
        });
        setFileName("");
      } else {
        // Checking the new structure: data.error
        alert("❌ " + data.error);
        setMessage(`❌ Error: ${data.error || "Submission failed."}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ An unexpected error occurred. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Election 2025</h1>

        {message && (
          <div
            className={`p-3 mb-4 rounded font-medium ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Voter ID */}
          <div>
            <label className="block font-semibold mb-2">Voter ID *</label>
            <input
              type="text"
              name="voterId"
              value={form.voterId}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Student ID Card (File Input) */}
          <div>
            <label className="block font-semibold mb-2">
              Student ID Card (Upload Image) *
            </label>
            <input
              type="file"
              accept="image/*"
              name="studentIdFile"
              onChange={handleFileChange}
              required
              disabled={isSubmitting}
              className="w-full border p-3 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* PRESIDENT */}
          <div>
            <label className="block font-semibold mb-2">President *</label>
            <select
              name="president"
              value={form.president}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full border p-3 rounded"
            >
              <option value="">Select</option>
              <option>MD Sajib Hossen</option>
              <option>MD Hasanuzzaman</option>
            </select>
          </div>

          {/* GENERAL SECRETARY */}
          <div>
            <label className="block font-semibold mb-2">
              General Secretary *
            </label>
            <select
              name="generalSecretary"
              value={form.generalSecretary}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            >
              <option value="">Select</option>
              <option>MD Torikul Islam</option>
              <option>SP Prodip</option>
              <option>MD Ariful Islam</option>
            </select>
          </div>

          {/* ORGANIZATIONAL SECRETARY */}
          <div>
            <label className="block font-semibold mb-2">
              Organizational Secretary *
            </label>
            <select
              name="organizationalSecretary"
              value={form.organizationalSecretary}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            >
              <option value="">Select</option>
              <option>MD Reduan Islam</option>
              <option>Kamran Siddiky Imrose</option>
            </select>
          </div>

          {/* OFFICE SECRETARY */}
          <div>
            <label className="block font-semibold mb-2">
              Office Secretary *
            </label>
            <select
              name="officeSecretary"
              value={form.officeSecretary}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            >
              <option value="">Select</option>
              <option>Sadika Islam Disha</option>
              <option>Ismail Hossain</option>
            </select>
          </div>

          {/* FINANCE SECRETARY */}
          <div>
            <label className="block font-semibold mb-2">
              Finance Secretary *
            </label>
            <select
              name="financeSecretary"
              value={form.financeSecretary}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            >
              <option value="">Select</option>
              <option>Shabbir Ahmed Sweet</option>
              <option>Antor Haldar</option>
            </select>
          </div>

          {/* PUBLICITY SECRETARY */}
          <div>
            <label className="block font-semibold mb-2">
              Publicity Secretary *
            </label>
            <select
              name="publicitySecretary"
              value={form.publicitySecretary}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            >
              <option value="">Select</option>
              <option>Tashrif Ahmed</option>
              <option>Monayem Kabir Shihab</option>
              <option>Esrafil Hossen Shanto</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !form.studentIdFile}
            className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Vote"}
          </button>
        </form>
      </div>
    </section>
  );
}
