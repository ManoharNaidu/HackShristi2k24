import React from "react";

import styles from "./Organisation.module.scss";
import donateBtn from "../../assets/donate.svg";
// import img from "../../assets/org/"

const animalOrgList = [
    {orgName:"ASPCA", orgImg:"./org/logo_1.jpg", orgDesc:"American Society for the Prevention of Cruelty to Animals   headquartered in New York City", orgLink:"https://www.bluecross.org.uk/"},
    {orgName:"The Humane Society of the United States", orgImg:"./org/logo_2.jpg", orgDesc:"largest and most effective animal protection organization in the US", orgLink:"https://www.humaneamerica.org/"},
    {orgName:"Humane America Animal Foundation", orgImg:"./org/logo_3.jpg", orgDesc:" largest non-profit pet adoption website in North America", orgLink:"https://www.humanesociety.org/"},
    {orgName:"North Shore Animal League America", orgImg:"./org/logo_4.jpeg", orgDesc:"World’s largest no-kill animal rescue and adoption ", orgLink:""},
    {orgName:"Hearts United for Animals", orgImg:"./org/logo_5.jpeg", orgDesc:"no-kill shelter that rescues dogs from puppy mills provides low-cost spay", orgLink:"https://www.humanesociety.org/"},
    {orgName:"Blue Cross for Pets", orgImg:"./org/logo_6.jpeg", orgDesc:"hey will work with you to help you find the perfect animal for your family.", orgLink:""},
    {orgName:"SA Dog Rescue", orgImg:"./org/logo_7.jpeg", orgDesc:"Non-profit rescue organization  in South Australia. Their mission is to save pets from euthanasia", orgLink:"https://www.humanesociety.org/"},
    {orgName:"RSPCA", orgImg:"./org/logo_8.jpeg", orgLink:"https://www.humanesociety.org/", orgDesc:"group of foster care volunteers ls located in NSW, Australia. They do not have an office or staff"},
    {orgName:"Animal Welfare League", orgImg:"./org/logo_9.jpeg", orgDesc:"Grey Muzzle Organization helps to rescue", orgLink:"https://www.humanesociety.org/"},
    {orgName:"PAWS Australia", orgImg:"./org/logo_5.jpeg", orgDesc:"no-kill animal rescue and adoption ", orgLink:"https://www.theapsca.org/"},
]

type OrganisationCardData= {
    orgName: string;
    orgImg: string;
    orgDesc: string;
    orgLink: string;

}

interface IOrganisationCardProps {
    data: OrganisationCardData;
}
const OrganisationCard :React.FC <IOrganisationCardProps>= ({data}) => {
    return (
        <>
        <div className={styles["card"]}>
            <div className={styles["imgBox"]}>
                <img src={data.orgImg} alt="img" />
            </div>
            <div className={styles["content"]}>
                <h3>{data.orgName}</h3>
                <p>{data.orgDesc}</p>
            </div>
            <div className={styles["btn"]}>
            <img src={donateBtn} alt="donate" />
            <h4>Donate Now</h4> 
            </div>
        </div>
        </>
    )
}
const OrganisationGrid:React.FC = () => {
    return (
        <React.Fragment>
        <h3 className="paddng:40px">You may know these organisations</h3>
        <div className={styles["grid-box"]}>
            {
                animalOrgList.map((org, index) => {
                    return (
                        <OrganisationCard data={org}  key={index}/>
                    )
                })
            }
        </div>
        </React.Fragment>
    );
}
export default OrganisationGrid;