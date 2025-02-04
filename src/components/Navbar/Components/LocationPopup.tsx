import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Form,
  Alert,
} from "@heroui/react";
import { useEffect, useState, useContext } from "react";

import { ConfigContext } from "@/config";
import { toast } from "react-toastify";


export default function LocationPopup() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("SomeComponent must be used within a ConfigProvider");
  }
  const { config, setConfig } = context;
  const token = config.apiKeys.ipInfoKey;
  const country = config.country;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const countries = [
    { code: "gb", name: "United Kingdom" },
    { code: "us", name: "United States" },
    { code: "at", name: "Austria" },
    { code: "au", name: "Australia" },
    { code: "be", name: "Belgium" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "ch", name: "Switzerland" },
    { code: "de", name: "Germany" },
    { code: "es", name: "Spain" },
    { code: "fr", name: "France" },
    { code: "in", name: "India" },
    { code: "lt", name: "Lithuania" },
    { code: "mx", name: "Mexico" },
    { code: "nl", name: "Netherlands" },
    { code: "nz", name: "New Zealand" },
    { code: "pl", name: "Poland" },
    { code: "sg", name: "Singapore" },
    { code: "za", name: "South Africa" },
  ];
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState("");
  const countryCodes = countries.map((country) => country.code);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(`https://ipinfo.io/json?token=${token}`);

        if (!response.ok)
          throw new Error(`Location detection failed (${response.status})`);

        const data = await response.json();
        const countryCode = data.country.toLowerCase();

        if (countryCodes.includes(countryCode)) {
          setConfig({ ...config, country: countryCode });
          setMessage(`Auto-Detected Country:${countryCode.toUpperCase()}`);
        } else {
          setSelection("sg");
          setMessage(
            `Country not supported:${countryCode.toUpperCase()} - Default set to: SG`
          );
          toast.error(`Country not supported:${countryCode.toUpperCase()} - Default set to: SG`);
        }
      } catch (error) {
        toast.error(error);
        setMessage("Could not detect your location. Please select manually.");
        setConfig({ ...config, country: "sg" });
      }
    };

    getCountry();
  },[]);
  const handleChange = (event) => {
    setSelection(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    selection
      ? setConfig({ ...config, country: selection })
      : setConfig({ ...config, country: "sg" });
    setMessage(`Country Set to:${config.country}`);
  };
  return (
    <div>
      <Button onPress={onOpen} variant="faded">Country:{country.toUpperCase()}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Country:
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <Select aria-label="country" onChange={handleChange}>
                    {countries.map((country) => {
                      return (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      );
                    })}
                  </Select>
                  <Button color="primary" type="submit" onPress={onClose}>
                    Submit
                  </Button>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Alert color="warning" title={message} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
