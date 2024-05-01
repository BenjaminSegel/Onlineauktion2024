import React, { useEffect, useState, useContext } from "react";
import StyleCard from "../components/StyleCard";
import ListCard from "../components/ListItem";
import { GlobalContext } from "../GlobalContext";
import BackButton from "../components/BackButton";

export default function AccountPage() {
    const { loggedIn } = useContext(GlobalContext)
    const [ongoingAuctions, setOngoingAuctions] = useState(null);
    const currentDate = Date.now();

    // Fetches auctions that logged in user has started
    useEffect(() => {
        const getAuctionData = async () => {
            const response = await fetch(`/api/auctions/`);
            const result = await response.json();

            const userOngoingAuctions = [];

            for (let i = 0; i < result.length; i++) {
                let currentAuction = result[i]

                if (currentAuction.sellerId === loggedIn) {
                    const auctionEndDate = currentAuction.endDate;

                    // Checks if the end date of the auctions has passed
                    if (auctionEndDate > currentDate) {
                        userOngoingAuctions.push(currentAuction);
                    }
                }
            }

            //Sorting the auctions by end date
            userOngoingAuctions.sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
            setOngoingAuctions(userOngoingAuctions);
        };

        getAuctionData();
    }, []);

    return (
        <>
            <BackButton to="/AccountPage" />

            <div style={{ backgroundColor: "#41B3A3", minHeight: '100vh' }}>
                <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                    <div className="w-25">
                        <StyleCard><h4 className="fst-italic fw-bold">Your ongoing auctions.</h4></StyleCard>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5 pb-5">
                    <div className="d-flex justify-content-center flex-row mx-3 px-3" style={{ maxWidth: '100', flexWrap: 'wrap' }}>
                        {ongoingAuctions ? ongoingAuctions.map((ongoingAuction, index) => (
                            <div key={index} className="mx-3 mt-3">
                                <StyleCard>
                                    <div className="d-flex flex-column">
                                        <ListCard item={ongoingAuction}></ListCard>
                                    </div>
                                </StyleCard>
                            </div>
                        )) : <p>Ain't no auction here, Mr. Auctioneer.</p>}
                    </div>
                </div>
            </div>
        </>);
}