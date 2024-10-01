import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Celebrity } from "@/types";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dayjs from "dayjs";
import {
  CheckCircledIcon,
  Cross1Icon,
  CrossCircledIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  CelebrityEditableField,
  CelebrityFieldTypes,
} from "./celebrities-editable-field";
import { Button } from "../../button";

const PICTURE_IMG_SRC_DIMS = 56;

export interface CelebrityAccordionItemProps {
  celebrity: Celebrity;
  onEdit: (celebrity: Celebrity) => void;
  onDelete: (celebrity: Celebrity) => void;
}

export const CelebrityAccordionItem = ({
  celebrity: propCelebrity,
  onEdit,
  onDelete,
}: CelebrityAccordionItemProps) => {
  const [celebrity, setCelebrity] = useState<Celebrity>(propCelebrity);

  useEffect(() => {
    setCelebrity(propCelebrity);
  }, [propCelebrity]);

  const { id, first, last, picture, dob, gender, country, description } =
    celebrity;
  const [isEditing, setIsEditing] = useState(false);

  // Computed values
  const fullName = `${first} ${last}`;
  const age = dayjs().diff(new Date(dob), "years");

  // Declare props to toggle editing mode

  const handleCelebrityUpdate = (propagateUpdate?: boolean) => {
    if (propagateUpdate) {
      onEdit(celebrity);
    } else {
      setCelebrity(propCelebrity);
    }
    setIsEditing(false);
  };

  const updateCelebrityAttribute = (key: keyof Celebrity, value: string) =>
    setCelebrity({ ...celebrity, [key]: value });

  return (
    <>
      <AccordionItem
        value={String(id)}
        className=" flex flex-col space-y-6 border border-solid border-zinc-300 rounded-lg p-4"
      >
        <AccordionTrigger className="m-0 p-0">
          <div className="flex flex-row space-x-4 justify-start items-center">
            <Image
              src={picture}
              alt={fullName}
              width={PICTURE_IMG_SRC_DIMS}
              height={PICTURE_IMG_SRC_DIMS}
              className="rounded-full border-2 border-solid border-zinc-300"
            />
            <div>{fullName}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="py-0">
          <div className="grid grid-cols-3 gap-6 p-1">
            <div>
              <Label htmlFor="age">Age</Label>
              <CelebrityEditableField
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                value={`${age} year${age > 0 ? "s" : ""}`}
                fieldType={CelebrityFieldTypes.input}
                readOnly
                disabled
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <CelebrityEditableField
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                value={gender}
                onValueChange={(value) =>
                  updateCelebrityAttribute("gender", value)
                }
                fieldType={CelebrityFieldTypes.select}
                options={["male", "female", "rather not say"]}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <CelebrityEditableField
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                value={country}
                onChange={(e) =>
                  updateCelebrityAttribute("country", e.currentTarget.value)
                }
                fieldType={CelebrityFieldTypes.input}
              />
            </div>
            <div className="col-span-3">
              <Label htmlFor="description">Description</Label>
              <CelebrityEditableField
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                value={description}
                onChange={(e) =>
                  updateCelebrityAttribute("description", e.currentTarget.value)
                }
                fieldType={CelebrityFieldTypes.textarea}
              />
            </div>
          </div>
          <div className="p-2 flex flex-row space-x-3 justify-end">
            {isEditing ? (
              <>
                <Button
                  className="border-none shadow-none"
                  variant={"outline"}
                  size={"icon"}
                >
                  <CrossCircledIcon
                    height={24}
                    width={24}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleCelebrityUpdate()}
                  />
                </Button>
                <Button
                  className="border-none shadow-none"
                  variant={"outline"}
                  size={"icon"}
                >
                  <CheckCircledIcon
                    height={24}
                    width={24}
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleCelebrityUpdate(true)}
                  />
                </Button>
              </>
            ) : (
              <>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      className="border-none shadow-none"
                      variant={"outline"}
                      size={"icon"}
                    >
                      <TrashIcon
                        height={24}
                        width={24}
                        className="text-red-500 fill-red-300 cursor-pointer"
                        onClick={() => {}}
                      />
                    </Button>
                    <Button
                      className="border-none shadow-none"
                      variant={"outline"}
                      size={"icon"}
                    >
                      <Pencil1Icon
                        height={24}
                        width={24}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsEditing(true)}
                      />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogCancel className="px-2 py-1 m-0 border-none shadow-none hover:bg-none absolute top-2 right-2">
                      <Cross1Icon height={12} width={12} />
                    </AlertDialogCancel>
                    <AlertDialogHeader className="mb-6">
                      <AlertDialogTitle className="font-medium text-base">
                        Are you sure you want to delete {fullName}?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500"
                        onClick={() => onDelete(celebrity)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};
