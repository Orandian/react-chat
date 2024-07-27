import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterProps, useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import RegisterImage from "../../assets/images/register.png"

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth() as { register: ({ email, password, username, profileUrl }: RegisterProps) => Promise<any> };
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !username || !profileUrl) {
      console.log("Sign Up", "Please fill all the fields");
      return;
    }
    setLoading(true);
    const response = await register({ email, password, username, profileUrl });
    setLoading(false);
    if (!response.success) {
      console.log("Sign Up", response.msg);
    } 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg space-y-6">
        <div className="flex justify-center">
          <img
            src={RegisterImage}
            alt="Register"
            className="h-40 w-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800">Sign Up</h1>
        <div className="space-y-4">
          <div className="flex items-center bg-gray-100 p-3 rounded-xl">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="flex-1 bg-transparent border-none text-gray-700 focus:outline-none"
              placeholder="User Name"
            />
          </div>
          <div className="flex items-center bg-gray-100 p-3 rounded-xl">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="flex-1 bg-transparent border-none text-gray-700 focus:outline-none"
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center bg-gray-100 p-3 rounded-xl">
            <i className="feather feather-lock text-gray-500 mr-3 text-xl"></i>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="flex-1 bg-transparent border-none text-gray-700 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center bg-gray-100 p-3 rounded-xl">
            <i className="feather feather-image text-gray-500 mr-3 text-xl"></i>
            <input
              type="text"
              onChange={(e) => setProfileUrl(e.target.value)}
              value={profileUrl}
              className="flex-1 bg-transparent border-none text-gray-700 focus:outline-none"
              placeholder="Profile URL"
            />
          </div>
          <div>
            {loading ? (
              <div className="flex justify-center">
                <Loading size={64} />
              </div>
            ) : (
              <button
                onClick={handleRegister}
                className="w-full py-3 bg-indigo-500 text-white font-bold rounded-xl focus:outline-none"
              >
                Sign Up
              </button>
            )}
          </div>
          <div className="flex justify-center items-center mt-4">
            <span className="text-gray-500">Already have an account? </span>
            <button
              onClick={() => navigate("/signin")}
              className="ml-2 text-indigo-500 font-bold"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
