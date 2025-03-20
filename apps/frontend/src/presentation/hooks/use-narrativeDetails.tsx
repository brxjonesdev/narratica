import { FETCH_NARRATIVE_DETAILS } from "@/infrastructure/graphql/narratives";
import React from "react";

type NarrativeDetails = {
    name: string;
    tagline: string;
    blurb: string;
}
export default function useNarrativeDetails(narrativeID: string | string[] | undefined) {
    const [info, setInfo] = React.useState<NarrativeDetails | null>(null);
     const [isModalOpen, setIsModalOpen] = React.useState(false);

     React.useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: FETCH_NARRATIVE_DETAILS,
          variables: { where: { narrativeID: narrativeID },}
        }),
      });
      const data = await response.json();
      setInfo(data.data.narratives[0]);
    }
    fetchData();
  }, [narrativeID, isModalOpen]);

    return { info, setInfo, isModalOpen, setIsModalOpen };

}