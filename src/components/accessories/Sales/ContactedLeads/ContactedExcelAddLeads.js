import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { RiFileExcel2Fill } from "react-icons/ri";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { useContactedExcelLeadsMutation } from "../../../../store";
import { toast } from "react-toastify";

const ContactedExcelAddLeads = ({ csvLeadsRefetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [importLeads] = useContactedExcelLeadsMutation();
  const account_info = JSON.parse(localStorage.getItem("account_detail"));

  const onClose = () => {
    setIsOpen(false);
  };

  // submit function to api
  const onSubmit = async (data) => {
    const importedLeads = {
      bulk_lead: data.validData,
      session: account_info.full_name,
      lead_owner: account_info.employee_id,
    };

    console.log(importedLeads);
    const csvLeds = await importLeads(importedLeads).unwrap();
    if (csvLeds.success === true) {
      toast.success(csvLeds.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    } else {
      toast.error(csvLeds.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    csvLeadsRefetch();
    onClose();
  };

  // fields of modal seen from excel
  const fields = [
    {
      label: "First Name",
      key: "first_name",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Last Name",
      key: "last_name",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Phone Number",
      key: "phone_num",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Telephone Number",
      key: "tel_num",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Email",
      key: "email",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Job Title",
      key: "job_title",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Company",
      key: "company",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Department",
      key: "department",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Industry",
      key: "industry",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Address",
      key: "address",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Remarks",
      key: "remarks",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Company Size",
      key: "company_size",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Lead Owner",
      key: "lead_owner",
      fieldType: {
        type: "input",
      },
    },
    {
      label: "Type",
      key: "type",
      fieldType: {
        type: "select",
        options: [
          { label: "B2B", value: 1 },
          { label: "B2C", value: 2 },
        ],
      },
    },
    {
      label: "Lead Source",
      key: "lead_source",
      fieldType: {
        type: "input",
      },
    },
  ];

  return (
    <div>
      <Button
        className="flex justify-center items-center bg-green-700"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Import Leads
        <span>
          <RiFileExcel2Fill className="ml-2 w-4 h-4" />
        </span>
      </Button>

      <ReactSpreadsheetImport
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fields={fields}
        customTheme={{
          components: {
            UploadStep: {
              baseStyle: {
                dropzoneButton: {
                  bg: "green",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};
export default ContactedExcelAddLeads;
