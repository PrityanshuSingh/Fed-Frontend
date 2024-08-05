import { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles/Preview.module.scss";
import { Button, Text } from "../../../../components";
import Section from "./SectionModal";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { getOutboundList } from "../../../../sections/Profile/Admin/Form/NewForm/NewForm";
import Complete from "../../../../assets/images/Complete.svg";
import { api } from "../../../../services";
import {
  Alert,
  MicroLoading,
  ComponentLoading,
} from "../../../../microInteraction";
// import AuthContext from "../../../../context/AuthContext";
import { RecoveryContext } from "../../../../context/RecoveryContext";

const operators = [
  { label: "match", value: "===" },
  { label: "match not", value: "!==" },
  { label: "less than", value: "<" },
  { label: "greater than", value: ">" },
  { label: "less than or equal to", value: "<=" },
  { label: "greater than or equal to", value: ">=" },
];
const hasOptions = ["select", "checkbox", "radio"];

const PreviewForm = ({
  eventData,
  sections = [],
  open,
  meta = [],
  handleClose,
  showCloseBtn,
}) => {
  const navigate = useNavigate();
  const [data, setdata] = useState(sections);
  const [activeSection, setactiveSection] = useState(
    data !== undefined ? data[0] : ""
  );
  const [isCompleted, setisCompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMicroLoading, setIsMicroLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = useState(null);
  const wrapperRef = useRef(null);
  const recoveryCtx = useContext(RecoveryContext);
  const{setTeamCode,setTeamName}=recoveryCtx;

  // console.log("data", eventData);
  // console.log("sections", sections);

  // if(!eventData && !sections.length()==0){
  //   return ;
  // }

  let currentSection =
    data !== undefined
      ? data.find((section) => section._id === activeSection._id)
      : null;

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
      setAlert(null); // Reset alert after displaying it
    }
  }, [alert]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [open]);

  useEffect(() => {
    constructSections();
  }, [sections]);

  const constructSections = () => {
    const newSections = data.map((section) => {
      return {
        ...section,
        isDisabled: section._id !== data[0]._id,
        fields: section.fields.map((field) => {
          return {
            ...field,
            onChangeValue: "",
          };
        }),
      };
    });
    setdata(newSections);
    setactiveSection(newSections[0]);
  };

  const handleChange = (field, value) => {
    const updatedSections = data.map((section) => {
      const updatedFields = section.fields.map((fld) => {
        if (field._id === fld._id) {
          if (fld.type === "checkbox") {
            const updatedOnChangeValue = fld.onChangeValue.includes(value)
              ? fld.onChangeValue.filter((val) => val !== value)
              : [...fld.onChangeValue, value];

            return {
              ...fld,
              onChangeValue: updatedOnChangeValue,
            };
          } else {
            return {
              ...fld,
              onChangeValue: value,
            };
          }
        }
        return fld;
      });

      return {
        ...section,
        fields: updatedFields,
      };
    });

    const newSections = updatedSections.map((section) => {
      const isHavingFieldValidations = section?.validations?.filter(
        (valid) => valid.field_id
      );

      let isMatched = false;
      if (isHavingFieldValidations.length > 0) {
        isMatched = isHavingFieldValidations.some((valid) => {
          return section.fields.some((fld) => {
            return fld.onChangeValue === valid.values;
          });
        });
      }

      const nextSection = getOutboundList(data, section._id)?.nextSection;

      return {
        ...section,
        isDisabled: !(isMatched && nextSection),
      };
    });

    setdata(newSections);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    data.forEach((section) => {
      if (isCompleted.includes(section._id)) {
        formData.append(`_id`, section._id);
        formData.append(`name`, section.name);
        section.fields.forEach((fld) => {
          formData.append("field_id", fld._id);
          formData.append("field_name", fld.name);
          formData.append("field_value", fld.onChangeValue);
        });
      }
    });
    setTeamCode('38902839');
    setTeamName("Dead Squad");
console.log("team code in recovery context:",recoveryCtx.teamCode)
    // Log the formData content for debugging
    // formData.forEach((value, key) => {
    //   console.log(key + " " + value);
    // });

    try {
      setIsLoading(true); // Set loading state
      setIsMicroLoading(true); // Set micro loading state
      const response = await api.post("/api/form/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        if(response.data.team){
          const {teamName,teamCode}=response.data.team;
           
           setTeamCode(teamCode);
           setTeamName(teamName);
        }
        setAlert({
          type: "success",
          message: "Form submitted successfully!",
          position: "bottom-right",
          duration: 3000,
        });
        handleClose();
        setIsSuccess(true);
      } else {
        setAlert({
          type: "error",
          message: "There was an error submitting the form. Please try again.",
          position: "bottom-right",
          duration: 3000,
        });
        setIsSuccess(false);
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setAlert({
        type: "error",
        message: "There was an error submitting the form. Please try again.",
        position: "bottom-right",
        duration: 3000,
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setIsMicroLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const handleAutoClose = () => {
        setTimeout(() => {
          navigate("/Events");
        }, 5000);
      };

      handleAutoClose();
    }
  }, [isSuccess, navigate]);

  const areRequiredFieldsFilled = () => {
    let isFilled = {
      status: true,
    };

    if (currentSection) {
      currentSection.fields.forEach((field) => {
        if (field.isRequired && !field.onChangeValue) {
          setAlert({
            type: "error",
            message: "Please fill all the details",
            position: "bottom-right",
            duration: 3000,
          });
          isFilled = {
            status: false,
          };
          return;
        }

        field.validations.forEach((valid) => {
          if (valid.type === "length") {
            if (!matchCondition(field, valid)) {
              const op = operators.find((op) => op.value === valid.operator);
              setAlert({
                type: "error",
                message: `${field.name} should ${op?.label} ${valid.type} ${valid.value}`,
                position: "bottom-right",
                duration: 3000,
              });
              isFilled = {
                status: false,
              };
            }
          }
        });
      });
    }

    if (!isFilled.status) {
      return false;
    }

    return true;
  };

  const matchCondition = (field, valid) => {
    const fieldLength = hasOptions.includes(field.type)
      ? field.type === "checkbox"
        ? field.onChangeValue.length
        : field.onChangeValue.split(",").length
      : field.onChangeValue.length;

    const operator = valid?.operator;
    const validLength =
      valid.type === "length" ? Number(valid?.value) : valid?.value;

    switch (operator) {
      case "===":
        return fieldLength === validLength;
      case "!==":
        return fieldLength !== validLength;
      case "includes":
        return field.onChangeValue?.includes(valid?.value);
      case "!includes":
        return !field.onChangeValue?.includes(valid.value);
      case "<":
        return fieldLength < validLength;
      case ">":
        return fieldLength > validLength;
      case "<=":
        return fieldLength <= validLength;
      case ">=":
        return fieldLength >= validLength;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  };

  const isMetaExist = () => {
    if (meta?.length === 0) return null;
    const paymentSection = meta.find((sec) => sec?.name === "Payment Details");
    if (paymentSection) {
      paymentSection.isDisabled = false;
      paymentSection.validations[0].onBack = currentSection._id;
      return paymentSection;
    }
  };

  const inboundList = () => {
    if (!currentSection) return null;
    let nextSection = currentSection?.validations[0]?.onNext;
    let backSection = currentSection.validations[0]?.onBack;
    const isHavingFieldValidations = currentSection?.validations?.filter(
      (valid) => valid.field_id
    );

    if (isHavingFieldValidations.length > 0) {
      const isMatched = isHavingFieldValidations.find((valid) => {
        return currentSection.fields?.find((fld) => {
          return fld.onChangeValue === valid.values;
        });
      });

      nextSection = isMatched ? isMatched?.onNext : nextSection;
      backSection = isMatched ? isMatched?.onBack : backSection;
    }

    if (isMetaExist() && currentSection?.name === "Payment Details") {
      const lastIsCompleted = isCompleted[isCompleted.length - 1];
      backSection = lastIsCompleted;
    }

    return {
      nextSection: data.find((sec) => sec._id === nextSection) || null,
      backSection: data.find((sec) => sec._id === backSection) || null,
    };
  };

  const onNext = () => {
    if (!currentSection) {
      return false;
    }

    if (!areRequiredFieldsFilled()) {
      return false;
    }

    const { nextSection } = inboundList();
    if (nextSection) {
      setisCompleted((prev) => [...prev, currentSection._id]);
      setactiveSection(nextSection);
    }

    if (!nextSection || nextSection === "submit") {
      setisCompleted((prev) => [...prev, currentSection._id, "Submitted"]);
      return handleSubmit();
    }
  };

  const onBack = () => {
    const { backSection } = inboundList();
    if (backSection) {
      setisCompleted((prev) => prev.filter((id) => id !== backSection._id));
      setactiveSection(backSection);
    }
  };

  const renderPaymentScreen = () => {
    const { eventType, receiverDetails, eventAmount } = eventData;
    console.log(receiverDetails.media)

    const getMediaUrl = (media) => {
      if (media instanceof File) {
        // If media is a File, create an object URL
        return URL.createObjectURL(media);
      } else {
        // Otherwise, assume media is a URL or handle it accordingly
        return media;
      }
    };
    if (eventType === "Paid" && currentSection.name === "Payment Details") {
      return (
        <div
          style={{
            margin: "8px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {receiverDetails.media && (
           
            <img
              src={getMediaUrl(receiverDetails.media)}
              alt={"QR-Code"}
              style={{
                width: 200,
                height: 200,
                objectFit: "contain",
              }}
            />
          )}
          <p
            style={{
              fontSize: 12,
              marginTop: 12,
              color: "lightgray",
            }}
          >
            Make the payment of{" "}
            <strong
              style={{
                color: "#fff",
              }}
            >
              &#8377;{eventAmount}
            </strong>{" "}
            using QR-Code or UPI Id{" "}
            <strong
              style={{
                color: "#fff",
              }}
            >
              {receiverDetails.upi}
            </strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      open && (
      <div className={styles.mainPreview}>
        <div ref={wrapperRef} className={styles.previewContainer}>
          {showCloseBtn && (
            <Link onClick={handleClose} to="/Events">
              <div className={styles.closeBtn}>
                <X />
              </div>
            </Link>
          )}
          <Text
            style={{
              marginBottom: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              fontSize: "25px",
            }}
          >
            {eventData?.eventTitle || "Preview Event"}
          </Text>
          {isLoading ? (
            <ComponentLoading
              customStyles={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "20rem",
                marginTop: "5rem",
              }}
            />
          ) : !isCompleted.includes("Submitted") ? (
            <div style={{ width: "100%" }}>
              <div>
                <Text style={{ alignSelf: "center" }} variant="secondary">
                  {currentSection.name}
                </Text>
                <Text
                  style={{
                    cursor: "pointer",
                    padding: "6px 0",
                    fontSize: "11px",
                    opacity: "0.4",
                    marginBottom: "8px",
                  }}
                >
                  {currentSection.description}
                </Text>
              </div>
              {renderPaymentScreen()}
              <Section section={currentSection} handleChange={handleChange} />
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {inboundList() && inboundList().backSection && (
                  <Button style={{ marginRight: "10px" }} onClick={onBack}>
                    Back
                  </Button>
                )}
                <Button onClick={onNext}>
                  {inboundList() && inboundList().nextSection ? (
                    "Next"
                  ) : isMicroLoading ? (
                    <MicroLoading />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          ) : isSuccess ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                src={Complete}
                alt="Complete"
                style={{ width: "400px", height: "400px", margin: "auto" }}
              />
              <Text
                variant="secondary"
                style={{
                  width: "60%",
                  fontSize: "14px",
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: "16px",
                  userSelect: "none",
                }}
              >
                Form Submitted Successfully! Thank you for your time.
              </Text>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text
                variant="secondary"
                style={{
                  width: "60%",
                  fontSize: "14px",
                  alignSelf: "center",
                  textAlign: "center",
                  marginTop: "16px",
                  userSelect: "none",
                }}
              >
                <h2 style={{ marginBottom: "3rem" }}>
                  Error Submitting your Form
                </h2>
                There is an error submitting the form. If you have made any
                payment, please fill up your payment details again. There is no
                need to pay again.
              </Text>
            </div>
          )}
        </div>
      </div>
      )
      <Alert />
    </>
  );
};
export default PreviewForm;
