import React from "react";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";
import  { EditIcon, HeartFilledIcon, JobIcon, SearchIcon } from "../icons";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const navigate = useNavigate();
  return (
    <DefaultLayout>
      <div className="flex-col w-full  justify-items-center  self-center text-center ">
        <div className="flex-col justify-items-center">
        <JobIcon className="w-1/2"/>
          <pre style={{ fontSize: "80px" }}>AI Resume Tool</pre>
          <pre style={{ fontSize: "20px" }}>Find your dream job and create the perfect resume too!</pre>
        </div>
        <div className="p-4">
             <Card>
                <CardHeader className="text-center">
                    <pre>Begin Your Journey Here...</pre>
                </CardHeader>
          <CardBody>
             <div className="flex justify-evenly w-full">
              <Button color="success" isIconOnly onPress={()=>navigate("/search")} ><SearchIcon/></Button>

              <Button color="primary" isIconOnly onPress={()=>navigate("/resume")}><EditIcon/></Button>

              <Button color="danger" isIconOnly onPress={()=>navigate("/saved")}><HeartFilledIcon/></Button>
            </div>
          </CardBody>
        </Card>
        </div>
       
      </div>
    </DefaultLayout>
  );
}
