import { Input, Button, Form } from "@heroui/react";
import { useContext, useState } from "react";
import { ConfigContext } from "@/config";
import DefaultLayout from "@/layouts/default";
import { SearchIcon } from "../icons";

const Settings = () => {
  const context = useContext(ConfigContext);
  const { setApiKeys, resetToEnvApiKeys} = context;
  const [newKeys, setNewKeys] = useState({
    ipInfoKey: "",
    deepSeekApi: "",
    adzunaApiId: "",
    adzunaApiKey:"",
    airtableKey: "",
    airtableBase: ""
  });
  const handleInputChange = (event)=>{
    setNewKeys((prev)=>({...prev,[event.target.name]:event.target.value}));

}
const handleSubmit = (event)=>{
    event.preventDefault();
    setApiKeys(newKeys);
}
  return (
    <DefaultLayout>
      <Form onSubmit={handleSubmit}>
        <Input name="ipInfoKey" value={newKeys.ipInfoKey} placeholder="IPInfo API Key" aria-label="IPInfo API Key" onChange={handleInputChange}/>

        <Input name="deepSeekApi" value={newKeys.deepSeekApi} placeholder="OpenRouter API Key:" aria-label="OpenRouter API Key:" onChange={handleInputChange}/>

        <Input name="adzunaApiId" value={newKeys.adzunaApiId} placeholder="Adzuna API ID:" aria-label="Adzuna API ID:" onChange={handleInputChange}/>

        <Input name="adzunaApiKey" value={newKeys.adzunaApiKey} placeholder="Adzuna API Key:" aria-label="Adzuna API Key:" onChange={handleInputChange}/>

        <Input name="airtableKey" value={newKeys.airtableKey} placeholder="Airtable API Key" aria-label="Airtable API Key:" onChange={handleInputChange}/>

        <Input name="airtableBase"value={newKeys.airtableBase} placeholder="Airtable Base URL ID:" aria-label="Airtable Base URL ID:" onChange={handleInputChange}/>

        <Button type="button" color="primary" onPress={resetToEnvApiKeys} isIconOnly><SearchIcon/></Button>
        <Button type="submit" color="success">Submit New Keys</Button>
      </Form>
    </DefaultLayout>
  );
};
export default Settings;