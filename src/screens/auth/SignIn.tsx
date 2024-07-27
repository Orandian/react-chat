import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginProps, useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading"; 
import LoginImage from "../../assets/images/login.png"

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth() as { login: ({ email, password }: LoginProps) => Promise<any> };
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      console.log("Sign In", "Please fill all the fields");
      return;
    }
    setLoading(true);
    const response = await login({ email, password });
    setLoading(false);
    navigate("/home");
    if (!response.success) {
      console.log("Sign In", response.msg);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center">
          <img src={LoginImage} alt="Login" className="h-48" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-center text-gray-800">Sign In</h1>
          <div className="space-y-4 mt-8">
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-xl">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="flex-1 text-gray-700 bg-transparent border-none focus:outline-none"
                placeholder="Email Address"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center px-4 py-3 bg-gray-100 rounded-xl">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="flex-1 text-gray-700 bg-transparent border-none focus:outline-none"
                  placeholder="Password"
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm font-semibold text-gray-500">Forgot password?</a>
              </div>
            </div>

            <div>
              {loading ? (
                <div className="flex justify-center">
                  <Loading size="h-16 w-16" />
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full py-3 text-2xl font-bold text-white bg-indigo-500 rounded-xl focus:outline-none"
                >
                  Sign In
                </button>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <span className="text-sm font-semibold text-gray-500">Don't have an account? </span>
              <button onClick={() => navigate("/signup")} className="text-sm font-bold text-indigo-500 ml-2">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
