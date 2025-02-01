import React, { createContext, useState, ReactNode } from "react";

interface Config {
  apiKeys: {
    ipInfoKey: string;
    deepSeekApi: string;
    adzunaApiId: string;
    adzunaApiKey: string;
  };
  country: string;
}

interface ConfigContextType {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
}

export const ConfigContext = createContext<ConfigContextType | undefined>(
  undefined,
);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>({
    apiKeys: {
      ipInfoKey: import.meta.env.VITE_APP_IPINFO_TOKEN,
      deepSeekApi: import.meta.env.VITE_APP_DEEPSEEK_KEY,
      adzunaApiId: import.meta.env.VITE_APP_ADZUNA_ID,
      adzunaApiKey: import.meta.env.VITE_APP_ADZUNA_KEY,
    },
    country: "sg",
  });

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
