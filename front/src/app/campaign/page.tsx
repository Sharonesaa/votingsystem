import Campaign from "@/components/Campaign/campaign";

const CampaignPage=()=>{
    return(
        <div className="bg-cuartiaryColor h-full flex justify-center">
            <div className="bg-white w-11/12 mt-4 rounded-t-2xl p-8 drop-shadow-2xl border-2" >
                <Campaign/>
            </div>
        </div>
    )
};
export default CampaignPage