import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

const DevbotAuth = ({ onAuthSuccess }) => {
  // Remove unused Google handler, use GoogleLogin component below
  // All your existing state logic
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Inline styles object
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    bgElement1: {
      position: 'absolute',
      top: '-160px',
      right: '-160px',
      width: '320px',
      height: '320px',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      pointerEvents: 'none'
    },
    bgElement2: {
      position: 'absolute',
      bottom: '-160px',
      left: '-160px',
      width: '320px',
      height: '320px',
      background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      pointerEvents: 'none'
    },
    wrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: '448px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '32px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    logo: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '64px',
      background: 'white',
      borderRadius: '16px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '14px',
      margin: '0'
    },
    modeToggle: {
      display: 'flex',
      background: '#f3f4f6',
      borderRadius: '16px',
      padding: '4px',
      marginBottom: '32px'
    },
    modeBtn: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      border: 'none',
      background: 'transparent',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    modeBtnActive: {
      background: 'white',
      color: '#2563eb',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    inputLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    inputWrapper: {
      position: 'relative'
    },
    inputField: {
      width: '100%',
      padding: '16px 16px 16px 48px',
      border: '1px solid #d1d5db',
      borderRadius: '16px',
      fontSize: '16px',
      background: 'rgba(249, 250, 251, 0.5)',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      outline: 'none'
    },
    inputFieldFocus: {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)'
    },
    inputFieldWithBtn: {
      paddingRight: '48px'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    forgotPassword: {
      textAlign: 'right'
    },
    forgotBtn: {
      background: 'none',
      border: 'none',
      color: '#2563eb',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    submitBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '16px',
      borderRadius: '16px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.3s ease'
    },
    submitBtnDisabled: {
      opacity: '0.5',
      cursor: 'not-allowed'
    },
    spinner: {
      width: '24px',
      height: '24px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    termsGroup: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    termsCheckbox: {
      marginTop: '4px',
      width: '20px',
      height: '20px',
      accentColor: '#2563eb'
    },
    termsLabel: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.5'
    },
    termsLink: {
      background: 'none',
      border: 'none',
      color: '#2563eb',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },
    divider: {
      margin: '32px 0',
      display: 'flex',
      alignItems: 'center'
    },
    dividerLine: {
      flex: 1,
      borderTop: '1px solid #d1d5db'
    },
    dividerText: {
      padding: '0 16px',
      fontSize: '14px',
      color: '#6b7280'
    },
    googleBtn: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '16px',
      border: '1px solid #d1d5db',
      borderRadius: '16px',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px'
    },
    googleIcon: {
      width: '24px',
      height: '24px',
      background: 'linear-gradient(135deg, #ef4444 0%, #fbbf24 25%, #10b981 75%, #3b82f6 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    googleG: {
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    googleText: {
      color: '#374151',
      fontWeight: '500'
    },
    footer: {
      marginTop: '32px',
      textAlign: 'center'
    },
    footerText: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0'
    },
    footerLink: {
      background: 'none',
      border: 'none',
      color: '#2563eb',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    },

  };

  // All your existing functions remain the same
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const userData = {
        id: 1,
        name: loginData.email.split('@')[0],
        email: loginData.email,
        avatar: `https://ui-avatars.com/api/?name=${loginData.email}&background=4F46E5&color=fff`
      };
      onAuthSuccess(userData);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
  // Add this function for Google login
  const handleGoogleLogin = async () => {
    // TODO: Integrate Google OAuth here
    alert('Google login coming soon!');
    // Example: onAuthSuccess(userDataFromGoogle);
  };
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const userData = {
        id: Date.now(),
        name: registerData.name,
        email: registerData.email,
        avatar: `https://ui-avatars.com/api/?name=${registerData.name}&background=4F46E5&color=fff`
      };
      onAuthSuccess(userData);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginData({ email: '', password: '' });
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.bgElement1}></div>
        <div style={styles.bgElement2}></div>

        <div style={{...styles.wrapper, minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{...styles.card, width: '100%', maxWidth: '448px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} className="auth-center-card">
            <div style={styles.header}>
              <div style={styles.logo}>
                <img src={require('../../assets/gemini_icon.png')} alt="DevBot" style={{ width: 40, height: 40, borderRadius: 12 }} />
              </div>
              <h1 style={styles.title}>DevBot AI</h1>
              <p style={styles.subtitle}>
                {isLogin ? 'Welcome back to your AI assistant' : 'Create your DevBot account'}
              </p>
            </div>

            <div style={styles.modeToggle}>
              <button
                onClick={() => setIsLogin(true)}
                style={{
                  ...styles.modeBtn,
                  ...(isLogin ? styles.modeBtnActive : {})
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                style={{
                  ...styles.modeBtn,
                  ...(!isLogin ? styles.modeBtnActive : {})
                }}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? (
              <div style={styles.formContainer}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Email</label>
                  <div style={styles.inputWrapper}>
                    <Mail style={styles.inputIcon} size={20} />
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      style={styles.inputField}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Password</label>
                  <div style={styles.inputWrapper}>
                    <Lock style={styles.inputIcon} size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      style={{...styles.inputField, ...styles.inputFieldWithBtn}}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={styles.passwordToggle}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div style={styles.forgotPassword}>
                  <button type="button" style={styles.forgotBtn}>
                    Forgot password?
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                  style={{
                    ...styles.submitBtn,
                    ...(isLoading ? styles.submitBtnDisabled : {})
                  }}
                >
                  {isLoading ? (
                    <div style={styles.spinner}></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div style={styles.formContainer}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Full Name</label>
                  <div style={styles.inputWrapper}>
                    <User style={styles.inputIcon} size={20} />
                    <input
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      style={styles.inputField}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Email</label>
                  <div style={styles.inputWrapper}>
                    <Mail style={styles.inputIcon} size={20} />
                    <input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      style={styles.inputField}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Password</label>
                  <div style={styles.inputWrapper}>
                    <Lock style={styles.inputIcon} size={20} />
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      style={{...styles.inputField, ...styles.inputFieldWithBtn}}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      style={styles.passwordToggle}
                    >
                      {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Confirm Password</label>
                  <div style={styles.inputWrapper}>
                    <Lock style={styles.inputIcon} size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      style={{...styles.inputField, ...styles.inputFieldWithBtn}}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.passwordToggle}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div style={styles.termsGroup}>
                  <input
                    type="checkbox"
                    id="terms"
                    style={styles.termsCheckbox}
                    required
                  />
                  <label htmlFor="terms" style={styles.termsLabel}>
                    I agree to the{' '}
                    <button type="button" style={styles.termsLink}>
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" style={styles.termsLink}>
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isLoading}
                  style={{
                    ...styles.submitBtn,
                    ...(isLoading ? styles.submitBtnDisabled : {})
                  }}
                >
                  {isLoading ? (
                    <div style={styles.spinner}></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            )}

            <div style={styles.divider}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>or continue with</span>
              <div style={styles.dividerLine}></div>
            </div>


            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
              <GoogleLogin
                width="100%"
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  // You can shape userData as needed for your app
                  const userData = {
                    id: decoded.sub,
                    name: decoded.name,
                    email: decoded.email,
                    avatar: decoded.picture
                  };
                  onAuthSuccess(userData);
                }}
                onError={() => {
                  alert('Google login failed');
                }}
              />
            </div>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleMode}
                  style={styles.footerLink}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevbotAuth;