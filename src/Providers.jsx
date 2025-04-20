import React from "react";
import {
  AuthProvider,
  ClientProvider,
  ProjectProvider,
  StatusProvider,
  UserProvider,
} from "./contexts";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <StatusProvider>
        <ClientProvider>
          <ProjectProvider>
            <StatusProvider>
              <UserProvider>{children}</UserProvider>
            </StatusProvider>
          </ProjectProvider>
        </ClientProvider>
      </StatusProvider>
    </AuthProvider>
  );
};

export default Providers;
