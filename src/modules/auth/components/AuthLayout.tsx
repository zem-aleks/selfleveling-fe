export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-screen w-full max-w-md flex-col justify-center gap-4 pb-20">
        {children}
      </div>
    </div>
  );
};
