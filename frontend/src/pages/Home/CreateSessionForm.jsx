import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { LuSparkles } from "react-icons/lu";

const CreateSessionForm = () => {
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [topicsToFocus, setTopicsToFocus] = useState("");
    const [numQuestions, setNumQuestions] = useState(10);
    const [description, setDescription] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Validate individual fields
    const validateForm = () => {
        // Validate Role
        if (!role || role.trim() === "") {
            setError("❌ Please enter a job role.");
            return false;
        }
        if (role.trim().length < 2) {
            setError("❌ Job role must be at least 2 characters long.");
            return false;
        }

        // Validate Experience
        if (!experience || String(experience).trim() === "") {
            setError("❌ Please enter your years of experience.");
            return false;
        }
        const expNumber = parseFloat(experience);
        if (isNaN(expNumber)) {
            setError("❌ Experience must be a valid number.");
            return false;
        }
        if (expNumber < 0) {
            setError("❌ Experience cannot be negative.");
            return false;
        }

        // Validate Topics
        if (!topicsToFocus || topicsToFocus.trim() === "") {
            setError("❌ Please enter at least one topic.");
            return false;
        }
        const topics = topicsToFocus.split(",").map((t) => t.trim()).filter(Boolean);
        if (topics.length === 0) {
            setError("❌ Please enter at least one valid topic.");
            return false;
        }

        // Validate Number of Questions
        const numQues = parseInt(numQuestions);
        if (!numQues || numQues < 1 || numQues > 20) {
            setError("❌ Number of questions must be between 1 and 20.");
            return false;
        }

        return true;
    };

    const handleCreateSession = async () => {
        if (!validateForm()) {
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const normalizedRole = role.trim();
            const normalizedExperience = String(experience).trim();
            const topicsArray = topicsToFocus
                .split(",")
                .map((topic) => topic.trim())
                .filter(Boolean);

            const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
                role: normalizedRole,
                experience: normalizedExperience,
                topicsToFocus: topicsArray,
                numberOfQuestions: numQuestions,
            });

            const generatedQuestions = aiResponse.data?.questions || aiResponse.data || [];

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                role: normalizedRole,
                experience: normalizedExperience,
                topicsToFocus: topicsArray,
                description: description.trim(),
                questions: generatedQuestions,
            });

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data.session._id}`);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Create New Session</h2>
        <p className="text-sm text-slate-500">Fill in the details below to start your interview preparation.</p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Job Role"
            placeholder="e.g. Frontend Developer"
            value={role}
            onChange={({ target }) => setRole(target.value)}
          />

          <Input
            label="Core Topics"
            placeholder="e.g. React, JavaScript"
            value={topicsToFocus}
            onChange={({ target }) => setTopicsToFocus(target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Years of Experience"
            placeholder="e.g. 2"
            value={experience}
            onChange={({ target }) => setExperience(target.value)}
          />

          <Input
            label="No. of Questions (Max 20)"
            placeholder="e.g. 10"
            type="number"
            value={numQuestions}
            onChange={({ target }) => setNumQuestions(target.value)}
          />
        </div>

        <Input
          label="Description (Optional)"
          placeholder="e.g. Focus on system design or behavioral questions"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

        <button
          className="w-full h-11 bg-[#4F7C82] hover:bg-[#0B2E33] text-white rounded-lg font-bold text-sm transition-all mt-4 flex items-center justify-center disabled:opacity-70 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          onClick={handleCreateSession}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerLoader /> : "Create Session"}
        </button>
      </div>
    </div>
    );
};

export default CreateSessionForm;