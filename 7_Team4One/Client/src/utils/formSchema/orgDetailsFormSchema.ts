import { SchemaField } from "@/components/forms/SchemaForm/Schema.type";

const orgDetailsFormSchema: SchemaField[] = [
  { type: "section", label: "Organization Details" },
  {
    name: "first_name",
    label: "Organization name",
    type: "text",
    required: "Please provide organization name",
  },
  { type: "section", label: "Contact Details" },
  {
    name: "address",
    label: "Organization Address",
    type: "text",
    required: "Please provide the organization's street address",
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

export default orgDetailsFormSchema;
