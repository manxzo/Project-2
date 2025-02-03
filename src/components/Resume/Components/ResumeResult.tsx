import { Snippet } from "@heroui/react";

const ResumeResult = ({ response, error }) => {
  const errorMsg = JSON.stringify(error, null, 2);
  const result = response? response.toString():"No Response";

  return (
    <Snippet color={result ? "default" : "danger"} className="w-full h-auto  border overflow-auto   rounded-md ">
      <pre className="whitespace-pre-wrap break-words">{result ? result : errorMsg}</pre>
    </Snippet>
  );
};

export default ResumeResult;
