import { SchemaField } from "@/components/forms/SchemaForm/Schema.type";

const personalDetailsFormSchema: SchemaField[] = [
  { type: "section", label: "Personal Details" },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: "Please provide first name",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: "Please provide last name",
  },
  { type: "section", label: "Contact Details" },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: "Please provide your street address",
  },
  {
    name: "pincode",
    label: "Pincode",
    type: "number",
    required: "Pincode is required",
  },
  {
    name: "state",
    label: "State/Province/Region",
    type: "text",
    required: "State/Province/Region is required",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: "City is required",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    required: "Country is required",
  },
  {
    name: "email",
    label: "Email (update primary email from account settings)",
    type: "email",
    required: "Primary email is required",
    disabled: true,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: "Phone number is required",
  },
];

export default personalDetailsFormSchema;
