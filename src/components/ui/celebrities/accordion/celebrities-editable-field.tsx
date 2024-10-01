import { Input, InputProps } from "../../input";
import { Textarea, TextareaProps } from "../../textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { SelectProps } from "@radix-ui/react-select";
import { capitalize } from "lodash";

export enum CelebrityFieldTypes {
  input = "Input",
  textarea = "Textarea",
  select = "Select",
}

interface CelebrityEditableFieldBaseProps {
  value: string;
  isEditing: boolean;
  fieldType: CelebrityFieldTypes;
}

// Typings for Inputs
interface CelebrityEditableInputBaseProps
  extends CelebrityEditableFieldBaseProps {
  fieldType: CelebrityFieldTypes.input;
}
type CelebrityEditableInputProps = CelebrityEditableInputBaseProps & InputProps;

// Typings for Textareas
interface CelebrityEditableTextareaBaseProps
  extends CelebrityEditableFieldBaseProps {
  fieldType: CelebrityFieldTypes.textarea;
}
type CelebrityEditableTextareaProps = CelebrityEditableTextareaBaseProps &
  TextareaProps;

// Typings for Selects
interface CelebrityEditableSelectBaseProps
  extends CelebrityEditableFieldBaseProps {
  options: string[];
  placeholder?: string;
  fieldType: CelebrityFieldTypes.select;
}
type CelebrityEditableSelectProps = CelebrityEditableSelectBaseProps &
  SelectProps;

type CelebrityEditableFieldProps =
  | CelebrityEditableInputProps
  | CelebrityEditableTextareaProps
  | CelebrityEditableSelectProps;

export const CelebrityEditableField = (props: CelebrityEditableFieldProps) => {
  const { value, isEditing, fieldType, placeholder, ...componentProps } = props;

  const editableProps = !isEditing
    ? {
        className: "p-0 border-none focus-visible:ring-0 h-auto",
        readOnly: true,
      }
    : {};

  switch (fieldType) {
    case CelebrityFieldTypes.input:
      return (
        <Input
          value={value}
          {...(componentProps as InputProps)}
          {...editableProps}
        />
      );

    case CelebrityFieldTypes.textarea:
      return (
        <Textarea
          rows={5}
          value={value}
          {...(componentProps as TextareaProps)}
          {...editableProps}
        />
      );

    case CelebrityFieldTypes.select:
      const { options, ...remainingProps } =
        componentProps as CelebrityEditableSelectProps;
      if (!isEditing)
        return (
          <div className="h-auto flex items-center">{capitalize(value)}</div>
        );
      return (
        <Select {...remainingProps} value={value}>
          <SelectTrigger>
            <SelectValue {...(placeholder && { placeholder })} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.toString()}>
                {capitalize(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
  }
};
