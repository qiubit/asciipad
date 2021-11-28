import { useUser } from '@auth0/nextjs-auth0';

const PasswordChecker = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div style={{ color: 'blue' }}>
        { /* eslint-disable */ }
        <a href="/api/auth/login?returnTo=/playground/textvid">Login</a>
        { /* eslint-enable */ }
      </div>
    )
  }

  return (
    user && (
      <div>
        <h2>Hello, {user.name}!</h2>
        <p>{user.email}</p>
        <div style={{ color: 'blue' }}>
          { /* eslint-disable */ }
          <a href="/api/auth/logout?returnTo=http://localhost:3000/playground/textvid">Logout</a>
          { /* eslint-enable */ }
        </div>
      </div>
    )
  );
}

export default PasswordChecker