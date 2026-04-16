export const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center ">
        {user.username?.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="font-medium">{user.username}</p>
       
      </div>
    </div>
  );
};
