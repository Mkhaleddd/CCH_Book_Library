import React, { useState } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, UserCredential } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure you have configured Firebase
import { useNavigate } from 'react-router';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate=useNavigate();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      setError('Both fields are required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Get the current user
      const user = auth.currentUser;
      if (!user) {
        setError('No user is currently logged in.');
        return;
      }

      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email || '', currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, newPassword);
      setSuccess('Password updated successfully.');
      navigate("/login")
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-3/5 mx-auto p-6 mt-14 ">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleChangePassword} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
