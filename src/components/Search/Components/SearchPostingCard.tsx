import { Card, CardBody, CardFooter } from "@heroui/react";

const SearchPostingCard = ({ posting, onClick }) => {
  return (
    <Card
              className="border-2 bg-background-100/50 dark:bg-default-100/50 max-w-[610px] h-[180px] p-3"
              key={posting.id}
              isPressable
              shadow="sm"
              onPress={() => {
                onClick(posting);
              }}
            >
              <CardBody className="overflow-visible text-center p-0 justify-center">
                <b>{posting.title}</b>
                <p className="text-700">{posting.label}</p>
                <p className="text-default-500">
                 <b> {posting.company.display_name}</b> 
                </p>
                <p>{posting.salary_min && posting.salary_max ? `$${posting.salary_min}-$${posting.salary_max}` : ""}</p>
                <p>{`${posting.category.label}`}</p>
              </CardBody>
              <CardFooter className="text-small justify-center">
                <b>{posting.created}</b>
              </CardFooter>
            </Card>
   
  );
};

export default SearchPostingCard;
