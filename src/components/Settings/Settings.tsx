import { Input, Button, Form } from "@heroui/react";
import { useContext, useState } from "react";
import { ConfigContext } from "@/config";
import DefaultLayout from "@/layouts/default";
import { SearchIcon } from "../icons";
import { toast } from "react-toastify";

const Settings = () => {
  const context = useContext(ConfigContext);
  const { setApiKeys, resetToEnvApiKeys } = context;
  const [newKeys, setNewKeys] = useState({
    ipInfoKey: "",
    deepSeekApi: "",
    adzunaApiId: "",
    adzunaApiKey: "",
    airtableKey: "",
    airtableBase: "",
  });

  const handleDefault = ()=>{
    const keys = resetToEnvApiKeys;

    setNewKeys(keys);

  }
  const handleInputChange = (event) => {
    setNewKeys((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setApiKeys(newKeys);
    setNewKeys({
      ipInfoKey: "",
      deepSeekApi: "",
      adzunaApiId: "",
      adzunaApiKey: "",
      airtableKey: "",
      airtableBase: "",
    })
    toast.success("Set New Keys!")
  };
  return (
    <DefaultLayout>
      <div className="flex-col w-1/2 justify-self-center text-center">
      <pre style={{fontSize:"50px"}}>API KEYS</pre>
      <Form onSubmit={handleSubmit}>
        <Input
          name="ipInfoKey"
          value={newKeys.ipInfoKey}
          label="IPInfo API Key:"
          onChange={handleInputChange}
          type="password"
        />

        <Input
          name="deepSeekApi"
          value={newKeys.deepSeekApi}
          label="OpenRouter API Key:"
          onChange={handleInputChange}
          type="password"
        />

        <Input
          name="adzunaApiId"
          value={newKeys.adzunaApiId}
          label="Adzuna API ID:"
          onChange={handleInputChange}
          type="password"
        />

        <Input
          name="adzunaApiKey"
          value={newKeys.adzunaApiKey}
          label="Adzuna API Key:"
          onChange={handleInputChange}
          type="password"
        />

        <Input
          name="airtableKey"
          value={newKeys.airtableKey}
          label="Airtable API Key:"
          onChange={handleInputChange}
          type="password"
        />

        <Input
          name="airtableBase"
          value={newKeys.airtableBase}
          label="Airtable Base URL ID:"
          onChange={handleInputChange}
          type="password"
        />
        <div className="flex self-center gap-12 pt-5">
          <Button type="button" color="primary" onPress={handleDefault} size="lg" endContent={ <SearchIcon/>}>
           Search For Default Keys
          </Button>
          <Button type="submit" color="success" size="lg">
            Set New Keys
          </Button>
        </div>
      </Form>
      </div>
      
    </DefaultLayout>
  );
};
export default Settings;
