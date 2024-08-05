import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./styles/ViewMember.module.scss";
import { Button, TeamCard } from "../../../../../components";
import AddMemberForm from "../../Form/MemberForm/AddMemberForm";
import localTeamMembers from "../../../../../data/Team.json";
import AccessTypes from "../../../../../data/Access.json";
import AuthContext from "../../../../../context/AuthContext";
import { api } from "../../../../../services"
import { Alert } from "../../../../../microInteraction";

function ViewMember() {
  const [memberActivePage, setMemberActivePage] = useState("Alumni");
  const [members, setMembers] = useState([]);
  const [access, setAccess] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const authCtx = useContext(AuthContext);
  const [enablingUpdate, setenbale] = useState(false);
  const [alert, setAlert] = useState(null);
  // const [fetchData,setfet]
  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
    }
  }, [alert]);


  useEffect(() => {
    // Fetch member data using axios
    const fetchMemberData = async () => {
      try {
        const response = await api.get("/api/user/fetchTeam");

        const fetchedMembers = response.data.data;

        console.log(fetchedMembers)
        setMembers(fetchedMembers);
        // const testMembers = localTeamMembers;
        // setMembers(testMembers);
      } catch (error) {
        console.error("Error fetching member data:", error);
        setMembers(localTeamMembers); // Fallback to test data
      }
    };

    const fetchAccessTypes = async () => {
      try {
        const response = await api.get("/api/user/fetchAccessTypes");
        console.log(response);
        const fetchedAccess = response.data.data;
        setAccess(fetchedAccess);
        console.log('fetched access', fetchedAccess);
        // const testAccess = AccessTypes.data;
        const filteredAccess = fetchedAccess.filter(accessType => (
          !["ADMIN", "USER", "PRESIDENT", "VICEPRESIDENT"].includes(accessType) &&
          !accessType.startsWith("DIRECTOR_")
        ));

        // Adding "Directors" and "Add Member" to the filteredAccess array
        filteredAccess.push("Directors", "Add Member");

        setAccess(filteredAccess);
      } catch (error) {
        console.error("Error fetching Access Types:", error);
        setAccess(AccessTypes.data); // Fallback to test data
      }
    };

    fetchAccessTypes();
    fetchMemberData();
  },[]);

  const handleButtonClick = (menu) => {
    if (menu === "add member" && enablingUpdate) {
      authCtx.memberData = null;
      authCtx.croppedImageFile=null;
      setenbale(false);
      setMemberActivePage(""); // Temporarily set to an empty string to trigger re-render
      setTimeout(() => {
        setMemberActivePage("add member");
      }, 0);
    } else {
      setMemberActivePage(menu);
    }
  };


  const headerMenu = access.map(accessType => accessType.toLowerCase());

  const renderButtons = () =>
    headerMenu.map((menu) => (
      <Button
        key={menu}
        className={styles.buttonMember}
        variant={menu === memberActivePage.toLowerCase() ? "primary" : "secondary"}
        onClick={() => {handleButtonClick(menu)}}
        style={{
          borderRadius: menu !== "add member" ? "20px" : "10px",
          marginLeft: menu === "add member" ? "0px" : "0px",
        }}
      >
        {menu}
      </Button>
    ));

  const getMembersByPage = () => {
    if (memberActivePage.toLowerCase() === "add member" && !enablingUpdate) {
      authCtx.memberData = null;
    };

    if (memberActivePage.toLowerCase() === "directors") {
      // Include members with access starting with "DIRECTOR_" and PRESIDENT, VICEPRESIDENT
      return members.filter(member => (
        member.access.startsWith("DIRECTOR_") ||
        member.access === "PRESIDENT" ||
        member.access === "VICEPRESIDENT"
      ));
    }

    return members.filter(member => {
      const accessCategory = member.access.startsWith("DIRECTOR_")
        ? member.access.split('_')[1].toLowerCase() + 's'
        : member.access.toLowerCase();

      return accessCategory === memberActivePage.toLowerCase();
    });
  };

  const customStyles = {
    teamMember: styles.teamMemberCustom,
    teamMemberBackh5: styles.teamMemberBackh5Custom,
    socialLinksa: styles.socialLinksaCustom,
    button: styles.buttonCustom,
    knowPara: styles.knowParaCustom,
    updatebtn: styles.updatebtnCustom,
    teamMemberBack: styles.teamMemberBackCustom,
  };

  // const handleUpdate = (name, role, title) => {
  //   console.log(Update member: ${name}, ${role}, ${title});
  // };

  const handleUpdate = member => {
    setMemberActivePage("Add Member");
    setenbale(true);
  };

  const handleRemove = async () => {
    try {
      // console.log("deleting member",member);
      const id = authCtx.memberData.id;
      console.log("deleting member id ", id);
      console.log(members);
      const response = await api.delete(`/api/user/deleteMember/${id}`);
      console.log(response.status);
      if (response.status === 200 || response.status === 201) {

        setAlert({
          type: "success",
          message: "Member deleted successfully.",
          position: "bottom-right",
          duration: 3000,
        });
        // fetchMemberData();
        setMembers(members => members.filter(m => m.id !== response.data.user.id));
        fetchMemberData();

      }
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  // const handleRemove = (name, role, title) => {
  //   console.log(Remove member: ${name}, ${role}, ${title});
  // };

  const membersToDisplay = getMembersByPage();

  return (
    <div className={styles.mainMember}>
      <div className={styles.eventmember}>
        <div className={styles.right}>
          <div className={styles.buttonContainer}>
            <h3 className={styles.headInnerText}>
              <span>View</span> Member
            </h3>
          </div>
          <div className={styles.buttons}>{renderButtons()}</div>
          {memberActivePage.toLowerCase() === "add member" ? (
            <AddMemberForm />
          ) : (
            <div className={styles.teamGrid}>
              {membersToDisplay.map((member, idx) => (
                <TeamCard
                  key={idx}
                  data={member}
                  name={member.name}
                  image={member.img}
                  social={member.extra}
                  title={member.extra.title}
                  role={member.access}
                  know={member.extra.know}
                  customStyles={customStyles}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Alert />
    </div>
  );
}

export default ViewMember;