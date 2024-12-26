import { useCallback, useState } from "react";

export default function useCredentialPassword() {
  const [isSupport] = useState(() => "credentials" in navigator);

  const saveCredential = useCallback(
    async (username, password) => {
      if (!isSupport) return;
      try {
        const credentials = new PasswordCredential({
          id: username,
          password,
        });
        await navigator.credentials.store(credentials);
      } catch (error) {
        console.error("Failed to save credentials:", error);
      }
    },
    [isSupport]
  );

  const getCredential = useCallback(async () => {
    if (!isSupport) return null;
    try {
      const credentials = await navigator.credentials.get({ password: true });
      if (credentials) {
        return {
          username: credentials.id,
          password: credentials.password,
        };
      }
    } catch (error) {
      console.error("Failed to get credentials:", error);
      return null;
    }
  }, [isSupport]);

  return {
    isSupport,
    saveCredential,
    getCredential,
  };
}
