// ResetPassword.jsx
import { useState, useEffect } from "react";
import {
  getAuth,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

export default function ResetPassword() {
  const auth = getAuth();
  const [oobCode, setOobCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  // get oobCode from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
      // verify code
      verifyPasswordResetCode(auth, code)
        .then(() => setIsValid(true))
        .catch(() => setMessage("❌ Invalid or expired reset link"));
    }
  }, [auth]);

  // handle submit
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("✅ Password has been reset. You can now log in.");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white dark:bg-card p-6 rounded shadow-md w-80 transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {isValid ? (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </>
        ) : (
          <p className="text-red-500">{message}</p>
        )}

        {message && (
          <p className="text-sm mt-3 text-center text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
