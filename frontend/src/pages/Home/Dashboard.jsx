import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProfileInfoCard from '../../components/Cards/ProfileInfoCard';
import SummaryCard from '../../components/Cards/SummaryCard';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import { CARD_BG } from '../../utils/data';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [deletingId, setDeletingId] = useState("");

  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data?.sessions || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load sessions');
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDeleteSession = async (sessionId) => {
    if (!sessionId || deletingId) return;

    try {
      setDeletingId(sessionId);
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionId));
      setSessions((prev) => prev.filter((session) => session._id !== sessionId));
      toast.success("Session deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete session");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-lg font-bold text-slate-900 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold italic">S</span>
              </div>
              <span>SkillUp</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ProfileInfoCard />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Recent Sessions</h2>
            <button className="text-sm font-bold text-[#4F7C82] hover:underline cursor-pointer">View All</button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {sessions.map((session, index) => (
              <SummaryCard
                key={session._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={session.role}
                topicsToFocus={session.topicsToFocus || "React, JavaScript, HTML, CSS"}
                experience={session.experience}
                questions={session?.questions?.length || 0}
                lastUpdated={session?.updatedAt ? new Date(session.updatedAt).toLocaleDateString('en-GB') : '-'}
                description={session.description || `Preparing for ${session.role.toLowerCase()} roles`}
                onSelect={() => navigate(`/interview-prep/${session._id}`)}
                onDelete={() => handleDeleteSession(session._id)}
              />
            ))}
            
            {sessions.length === 0 && (
                <div className="col-span-full py-14 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
                  <p className="text-xl font-bold text-slate-900 mb-3">No Sessions Yet</p>
                  <p className="text-sm text-slate-600 mb-8">Create your first interview prep session to get started</p>
                  
                  {/* Quick Steps */}
                  <div className="flex gap-4 mb-10">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-[#4F7C82] text-white text-lg font-bold rounded-full mb-2">1</div>
                      <p className="text-xs font-semibold text-slate-700">Pick Role</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-[#4F7C82] text-white text-lg font-bold rounded-full mb-2">2</div>
                      <p className="text-xs font-semibold text-slate-700">Add Topics</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-[#4F7C82] text-white text-lg font-bold rounded-full mb-2">3</div>
                      <p className="text-xs font-semibold text-slate-700">Experience</p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-[#4F7C82] text-white text-lg font-bold rounded-full mb-2">4</div>
                      <p className="text-xs font-semibold text-slate-700">Get Q&As</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setOpenCreateModal(true)}
                    className="h-11 px-7 bg-[#4F7C82] hover:bg-[#0B2E33] text-white rounded-lg font-semibold text-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Create Session
                  </button>
                </div>
            )}
          </div>
        </div>
      </main>

      <button
        className="fixed right-8 bottom-8 h-12 px-6 bg-[#4F7C82] hover:bg-[#0B2E33] text-white rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all z-50 shadow-slate-200 cursor-pointer hover:scale-[1.05] active:scale-[0.95]"
        onClick={() => setOpenCreateModal(true)}
      >
        <span className="text-xl">+</span>
        <span className="text-sm">New Session</span>
      </button>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>
    </div>
  );
};

export default Dashboard;
