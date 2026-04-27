import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuMail, LuGraduationCap, LuPin, LuSparkles, LuCode } from 'react-icons/lu';
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { UserContext } from "../context/userContext";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl border border-slate-100 flex flex-col gap-6 flex-1 shadow-sm transition-all hover:shadow-md">
    <div className="bg-slate-50 p-4 rounded-lg inline-flex text-[#4F7C82] w-fit">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-[15px] text-slate-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () => {
        if (!user) {
            setOpenAuthModal(true);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-slate-100">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full h-16 px-6 lg:px-[10%] flex items-center justify-between z-50 bg-white border-b border-slate-100">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                  <div className="w-8 h-8 bg-[#4F7C82] rounded flex items-center justify-center">
                    <span className="text-white text-lg font-bold italic">S</span>
                  </div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">SkillUp</h1>
                </div>
                {user ? (
                    <ProfileInfoCard />
                ) : (
                    <button 
                        onClick={() => setOpenAuthModal(true)}
                        className="h-10 px-6 bg-[#4F7C82] hover:bg-[#0B2E33] text-white rounded-lg font-bold text-sm transition-all cursor-pointer"
                    >
                        Login / Sign Up
                    </button>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-20 px-6 lg:px-[10%] flex flex-col items-center w-full">
                {/* Hero Section */}
                <section className="w-full max-w-[1200px] flex flex-col lg:flex-row items-center gap-12 lg:gap-24 my-20">
                    {/* Left Column */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6">
                            Master Your Future interviews
                        </h1>
                        <p className="text-lg text-slate-600 mb-10 max-w-xl">
                            The ultimate AI-powered toolkit to help you prepare, practice, and succeed in your dream job interviews. Tailored questions and instant feedback.
                        </p>

                        <button 
                            onClick={handleCTA}
                            className="h-12 px-10 bg-[#4F7C82] hover:bg-[#0B2E33] text-white rounded-lg font-bold text-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Right Column / Image */}
                    <div className="w-full lg:w-1/2 flex justify-center relative mt-10 lg:mt-0">
                        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#4F7C82]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                            <img src="/hero_illustration.png" alt="Interview Preparation" className="w-[85%] h-[85%] object-cover rounded-[40px] relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-700" />
                            {/* Abstract subtle glassmorphic floating tech icons */}
                            <div className="absolute top-[15%] right-0 w-12 h-12 bg-white/60 backdrop-blur-md rounded-xl shadow-lg border border-white flex items-center justify-center animate-bounce z-20 text-[#4F7C82]" style={{ animationDuration: '3.5s' }}>
                                <LuSparkles size={22} className="opacity-90" />
                            </div>
                            <div className="absolute bottom-[20%] left-4 w-14 h-14 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white flex items-center justify-center animate-bounce z-20 text-[#0B2E33]" style={{ animationDuration: '4.5s', animationDelay: '1s' }}>
                                <LuCode size={26} className="opacity-90" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="w-full max-w-[1200px]">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Features That Make You Shine</h2>
                        <div className="w-16 h-1 bg-slate-200 rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        <FeatureCard 
                            icon={<LuMail size={22} />}
                            title="Tailored Just for You"
                            description="Get interview questions and model answers based on your role, experience, and focus areas."
                        />
                        <FeatureCard 
                            icon={<LuGraduationCap size={22} />}
                            title="Learn at Your Own Pace"
                            description="Expand answers only when you're ready. Dive deeper into any concept instantly with AI explanations."
                        />
                        <FeatureCard 
                            icon={<LuPin size={22} />}
                            title="Capture Your Insights"
                            description="Add personal notes to any question and pin important ones to the top for organized learning."
                        />
                    </div>
                </section>
            </main>

            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                <div className="p-2">
                    {currentPage === "login" && (
                        <Login setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === "signup" && (
                        <SignUp setCurrentPage={setCurrentPage} />
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default LandingPage;

