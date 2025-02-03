import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { EditIcon, DeleteIcon, EyeIcon } from "../icons";
import DefaultLayout from "@/layouts/default";
import { ConfigContext } from "@/config";
import { useContext } from "react";
import { useCallback } from "react";
import useDeleteAirtableData from "@/hooks/deleteAirtableRecord";
import useGetAirtableData from "@/hooks/fetchAirtableData";
import SavedResume from "./Components/SavedResume";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
export const columns = [
  { name: "Title", uid: "title" },
  { name: "Company", uid: "company" },
  { name: "Actions", uid: "actions" },
];
export default function Saved({ setJob }) {
  const context = useContext(ConfigContext);
  const {
    config: { saved },
    findJobRecordId,
  } = context;
  const { loading, fetchAndSyncData } = useGetAirtableData();
  const { loading: loadingDel, deleteData } = useDeleteAirtableData("Jobs");
  const { resumes, jobs } = saved;
  const navigate = useNavigate();
  const renderCell = useCallback(
    (job, uid) => {
      switch (uid) {
        case "title":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{job.title}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {job.id}
              </p>
            </div>
          );
        case "company":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{job.company}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {job.location}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center justify-evenly space-x-2">
              <Popover size="lg" color="primary">
                <PopoverTrigger>
                  <Button color="primary" isIconOnly>
                    <EyeIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-[400px]">
                  <p className="whitespace-pre-wrap break-words">
                    {job.description}
                  </p>
                </PopoverContent>
              </Popover>

              <Button
                isIconOnly
                onPress={() => {
                  setJob(job);
                  const db = debounce(()=>navigate("/resume"), 500);
                  db();
                }}
              >
                <EditIcon />
              </Button>

              <Button
                color="danger"
                onPress={() => {
                  const recordId = findJobRecordId(job);
                  const df = debounce(() => deleteData(recordId), 500);
                  df();
                }}
                isLoading={loadingDel}
                isIconOnly
              >
                <DeleteIcon />
              </Button>
            </div>
          );
        default:
          return uid;
      }
    },
    [jobs, resumes]
  );

  return (
    <DefaultLayout>
      <div className="w-full">
        <Button color="warning" onPress={fetchAndSyncData} isLoading={loading}>
          Sync Data With Cloud
        </Button>
        <Divider className="m-2" />
        <Table aria-label="Saved Jobs">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={jobs}>
            {(job) => (
              <TableRow key={job.id}>
                {(uid) => <TableCell>{renderCell(job, uid)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <SavedResume jobs={jobs} resumes={resumes} />
      </div>
    </DefaultLayout>
  );
}
