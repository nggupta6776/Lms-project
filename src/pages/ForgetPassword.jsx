import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conpassword, setConPassword] = useState(""); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const serverUrl = "http://localhost:7000"; // change if backend is hosted elsewhere

    // Step 1: Send OTP
    const sendOtp = async () => {
        setLoading(true);
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/sendotp`,
                { email },
                { withCredentials: true }
            );
            console.log(result.data);
            setStep(2);
            toast.success(result.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message );
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const VerifyOTP = async () => {
        setLoading(true);
        try {
            const result = await axios.post(
                `${serverUrl}/api/auth/verifyotp`,
                { email, otp },
                { withCredentials: true }
            );
            console.log(result.data);
            setStep(1);
            toast.success(result.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message );
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const resetpassword = async () => {
        setLoading(true);
        try {
            if (newPassword !== conpassword) {
                toast.error("Passwords do not match");
                setLoading(false);
                return;
            }
            const result = await axios.post(
                `${serverUrl}/api/auth/resetpassword`,
                { email, password: newPassword },
                { withCredentials: true }
            );
            console.log(result.data);
            toast.success(result.data.message);
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <ToastContainer />
            {/* STEP 1: Enter Email */}
            {step === 1 && (
                <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Forget Your Password
                    </h2>
                    <p className="text-sm text-gray-500 mb-4 text-center">
                        Enter your email address to receive an OTP.
                    </p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={sendOtp}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={24} color="white" /> : "Send OTP"}
                    </button>
                </div>
            )}

            {/* STEP 2: Enter OTP */}
            {step === 2 && (
                <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Verify OTP
                    </h2>
                    <p className="text-sm text-gray-500 mb-4 text-center">
                        Enter the OTP sent to your email.
                    </p>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        required
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                        onClick={VerifyOTP} 
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={24} color="white" /> : "Verify OTP"}
                    </button>
                </div>
            )}

            {/* STEP 3: Reset Password */}
            {step === 3 && (
                <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Reset Password
                    </h2>
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={conpassword}
                        onChange={(e) => setConPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                        onClick={resetpassword}
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={24} color="white" /> : "Reset Password"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default ForgetPassword;
