import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  LogIn, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { handleRegister } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

 const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // Form input states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // UI state controls
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [touched, setTouched] = useState({ username: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Password Alphanumeric Validation Helper:
  // Must contain both at least one letter and at least one number, and contain only alphanumeric characters.
  const validatePasswordPattern = (pwd) => {
    if (!pwd) return { isValid: false, message: 'Password is required' };
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const isAlphanumericOnly = /^[a-zA-Z0-9]+$/.test(pwd);

    if (!isAlphanumericOnly) {
      return { isValid: false, message: 'Password must contain only letters and numbers' };
    }
    if (!hasLetter || !hasNumber) {
      return { isValid: false, message: 'Password must include both letters and numbers' };
    }
    if (pwd.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    return { isValid: true, message: '' };
  };

  // Validate fields dynamically
  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'username') {
      if (!value.trim()) {
        errorMsg = 'Username cannot be empty';
      }
    } else if (name === 'password') {
      const validation = validatePasswordPattern(value);
      if (!validation.isValid) {
        errorMsg = validation.message;
      }
    }
    return errorMsg;
  };

  // Handle Input Changes
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    if (touched.username) {
      setErrors((prev) => ({ ...prev, username: validateField('username', val) }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validateField('password', val) }));
    }
  };

  // Handle Input Blur for touched state tracking
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'username') {
      setErrors((prev) => ({ ...prev, username: validateField('username', username) }));
    } else if (field === 'password') {
      setErrors((prev) => ({ ...prev, password: validateField('password', password) }));
    }
  };

  // Cancel Handler - Clears all form values & validation errors
  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setErrors({ username: '', password: '' });
    setTouched({ username: false, password: false });
    setShowPassword(false);
    setSuccessMessage('');
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Mark all fields as touched
    setTouched({ username: true, password: true });

    // Perform final full validation
    const usernameErr = validateField('username', username);
    const passwordErr = validateField('password', password);
    console.log('username:',username,'password:',password)
    setErrors({
      username: usernameErr,
      password: passwordErr
    });

    // Stop execution if there are errors
    if (usernameErr || passwordErr) {
      return;
    }
    
     dispatch(handleRegister({username,password,navigate}));
     setSuccessMessage(`Welcome back, ${username}! Registered successful.`);
     setPassword('');
     setTouched({ username: false, password: false });
    // Simulate login operation
    // setIsSubmitting(true);
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setSuccessMessage(`Welcome back, ${username}! Login successful.`);
    //   // Clear sensitive password state upon success
    //   setPassword('');
    //   setTouched({ username: false, password: false });
    // }, 1200);
  };

  return (
    <div className="min-h-screen bg-sky-100 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-slate-800/50 p-6 pb-4 border-b border-slate-700/50 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-3 border border-indigo-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-white">Sign Up</h5>
          <p className="text-sm text-slate-400 mt-1">Please enter your credentials to continue</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          
          {/* Success Notification Alert */}
          {successMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm animate-fade-in">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Username
            </label>
            <div className="relative">
              {/* <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div> */}
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => handleBlur('username')}
                placeholder="Enter username"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 text-white placeholder-slate-500 border transition-all duration-200 outline-none text-sm ${
                  touched.username && errors.username
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : touched.username && !errors.username && username
                    ? 'border-emerald-500/60 focus:border-emerald-500'
                    : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
              {touched.username && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {errors.username ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : username ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : null}
                </div>
              )}
            </div>
            {touched.username && errors.username && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium">
                <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <div className="relative">
              {/* <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div> */}
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                placeholder="Enter alphanumeric password"
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/80 text-white placeholder-slate-500 border transition-all duration-200 outline-none text-sm ${
                  touched.password && errors.password
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                    : touched.password && !errors.password && password
                    ? 'border-emerald-500/60 focus:border-emerald-500'
                    : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none focus:!bg-transparent active:!bg-transparent"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-medium">
                <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.password}
              </p>
            )}
            <p className="text-[11px] text-slate-400">
              * Must contain both letters and numbers (alphanumeric).
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Register
                </>
              )}
            </button>
          </div>
        </form>

        {/* Card Footer */}
        <div className="p-4 bg-slate-900/60 border-t border-slate-700/50 text-center text-xs text-slate-500">
          Secure Authentication Interface
        </div>
      </div>
    </div>
  );
}

export default RegisterForm