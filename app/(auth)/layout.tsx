import React, { FC, Fragment, ReactNode } from "react";
type AuthLayoutProps = {
  children: ReactNode;
};
const AuthLayout: FC<AuthLayoutProps> = ({ children }): JSX.Element => {
  return <div className="h-full bg-red-500">{children}</div>;
};

export default AuthLayout;
