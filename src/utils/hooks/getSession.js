import { useState, useEffect } from "react";
import { getSession } from "utils/sessionmanagers";

const useGetSession = (keyOrKeys) => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      if (Array.isArray(keyOrKeys)) {
        const sessions = {};

        for (const key of keyOrKeys) {
          const data = await getSession(key);
          sessions[key] = data;
        }

        setSessionData(sessions);
      } else {
        const data = await getSession(keyOrKeys);
        setSessionData(data);
      }
    };

    fetchSessions();
  }, []);

  return {
    sessionData,
  };
};

export default useGetSession;
