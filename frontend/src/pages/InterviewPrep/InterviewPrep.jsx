import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuCircleAlert } from "react-icons/lu";
import { toast } from "react-hot-toast";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import AIResponsePreview from "./components/AIResponsePreview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import RoleInfoHeader from "./components/RoleInfoHeader";

const InterviewPrep = () => {
  const { sessionId } = useParams();
   const navigate = useNavigate();
   const [sessionData, setSessionData] = useState(null);
   const [errorMsg, setErrorMsg] = useState("");
   const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
   const [explanation, setExplanation] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [isUpdateLoader, setIsUpdateLoader] = useState(false);

   const questions = useMemo(() => sessionData?.questions || [], [sessionData]);
   const isValidSessionId = useMemo(() => /^[a-fA-F0-9]{24}$/.test(String(sessionId || "")), [sessionId]);

   // Fetch session data by session id
   const fetchSessionDetailsById = useCallback(async () => {
      if (!isValidSessionId) {
         setErrorMsg("Invalid session id. Open a session from Dashboard.");
         setSessionData(null);
         return;
      }

      try {
         setIsLoading(true);
         const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
         setSessionData(response.data?.session || null);
         setErrorMsg("");
      } catch (error) {
         setErrorMsg(error?.response?.data?.message || "Failed to load session details");
      } finally {
         setIsLoading(false);
      }
   }, [isValidSessionId, sessionId]);

   // Generate Concept Explanation
   const generateConceptExplanation = async (question) => {
      try {
         setIsUpdateLoader(true);
         const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
         setExplanation(response.data);
         setOpenLearnMoreDrawer(true);
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to generate concept explanation");
      } finally {
         setIsUpdateLoader(false);
      }
   };

   // Pin Question
   const toggleQuestionPinStatus = async (questionId) => {
      try {
         await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
         await fetchSessionDetailsById();
         toast.success("Pin status updated");
      } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to update pin status");
      }
   };

   useEffect(() => {
      if (sessionId) {
         fetchSessionDetailsById();
      }

      return () => {};
   }, [sessionId, isValidSessionId, fetchSessionDetailsById]);

  return (
      <DashboardLayout>
       <div className="container mx-auto pt-4 pb-8 px-4 md:px-0">
            {isLoading ? (
               <div className="py-20 flex items-center justify-center">
                  <SpinnerLoader />
               </div>
            ) : errorMsg ? (
               <div className="rounded-xl border border-red-100 bg-white p-4 max-w-xl">
                  <p className="text-sm text-red-600">{errorMsg}</p>
                  <button
                     className="mt-3 h-9 px-3 rounded-md bg-black text-white text-sm"
                     onClick={() => navigate("/dashboard")}
                  >
                     Go to Dashboard
                  </button>
               </div>
            ) : (
               <>
                  <div className="mb-12">
                     <RoleInfoHeader
                        role={sessionData?.role || ""}
                        topicsToFocus={sessionData?.topicsToFocus || ""}
                        experience={sessionData?.experience || "-"}
                        questions={sessionData?.questions?.length || 0}
                        description={sessionData?.description || ""}
                        lastUpdated={
                           sessionData?.updatedAt
                              ? new Date(sessionData.updatedAt).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                 })
                              : ""
                        }
                     />
                  </div>

                  {/* Interview Q & A Section */}
                  <div className="space-y-8 pb-32">
                     <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-8">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Question Bank</h2>
                        <div className="flex gap-2">
                           <div className="w-2 h-2 rounded-full bg-[#4F7C82]"></div>
                           <div className="w-2 h-2 rounded-full bg-[#9bccfb]"></div>
                           <div className="w-2 h-2 rounded-full bg-[#cae5ff]"></div>
                        </div>
                     </div>

                     <div className="grid gap-6">
                        {questions.map((data, index) => (
                           <QuestionCard
                              key={data?._id || index}
                              question={data?.question}
                              answer={data?.answer}
                              onLearnMore={() => generateConceptExplanation(data?.question)}
                              isPinned={data?.isPinned}
                              onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                           />
                        ))}
                     </div>
                  </div>

                  <Drawer
                     isOpen={openLearnMoreDrawer}
                     onClose={() => setOpenLearnMoreDrawer(false)}
                     title={!isUpdateLoader && explanation?.title ? explanation.title : "Concept Explanation"}
                  >
                     {errorMsg && (
                        <p className="flex gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
                           <LuCircleAlert className="mt-1 shrink-0" />
                           {errorMsg}
                        </p>
                     )}

                     {!isUpdateLoader && explanation && (
                        <AIResponsePreview content={explanation?.explanation || explanation} />
                     )}

                     {isUpdateLoader && <SkeletonLoader />}
                  </Drawer>
               </>
            )}
         </div>
      </DashboardLayout>
  );
};

export default InterviewPrep;
